// A deliberately small, readable master data management (MDM) engine for the
// playground at /lab/mdm. It illustrates the concepts — probabilistic
// matching, survivorship and householding — not any employer's algorithm.

export type SourceSystem = "Policy" | "Claims" | "Web";

export type SourceRecord = {
  id: string;
  source: SourceSystem;
  name: string;
  dob: string; // as captured — formats vary by source on purpose
  address: string;
  email: string; // "" when the source doesn't capture it
  updated: string; // YYYY-MM-DD, when the source last changed this record
};

export type Field = "name" | "dob" | "address" | "email";
export type Weights = Record<Field, number>;
export type Thresholds = { review: number; auto: number }; // 0–100
export type Survivorship = {
  name: "most-complete" | "most-trusted";
  address: "most-recent" | "most-trusted";
};

/** Source trust order, most trusted first. */
export const trustOrder: SourceSystem[] = ["Policy", "Claims", "Web"];

// ---------------------------------------------------------------- normalising

const ABBREVIATIONS: Record<string, string> = { ln: "lane", st: "street", rd: "road", ave: "avenue" };
const POSTCODE = /\b([a-z]{1,2}\d[a-z\d]?)\s*(\d[a-z]{2})\b/i;

export function normaliseName(name: string) {
  const parts = name.toLowerCase().replace(/[^a-z\s]/g, " ").split(/\s+/).filter(Boolean);
  return { first: parts[0] ?? "", last: parts[parts.length - 1] ?? "" };
}

/** Accepts YYYY-MM-DD, DD/MM/YYYY and DD-MM-YYYY. */
export function parseDob(dob: string): [number, number, number] | null {
  const iso = dob.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  const uk = dob.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
  if (uk) return [Number(uk[3]), Number(uk[2]), Number(uk[1])];
  return null;
}

export function normaliseAddress(address: string) {
  const lower = address.toLowerCase();
  const pc = lower.match(POSTCODE);
  const postcode = pc ? `${pc[1]}${pc[2]}`.toUpperCase() : "";
  const withoutPostcode = pc ? lower.replace(pc[0], " ") : lower;
  const tokens = withoutPostcode
    .replace(/[^a-z\d\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => ABBREVIATIONS[t] ?? t);
  const house = tokens.find((t) => /^\d+[a-z]?$/.test(t)) ?? "";
  return { postcode, house, tokens };
}

/** Household key: house number + postcode. */
export function householdKey(address: string) {
  const a = normaliseAddress(address);
  return a.postcode ? `${a.house} ${a.postcode}` : a.tokens.join(" ");
}

// ---------------------------------------------------------------- similarity

/** Jaro–Winkler similarity, 0–1. Good at typos and short name variants. */
export function jaroWinkler(a: string, b: string) {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const range = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
  const aMatch = new Array(a.length).fill(false);
  const bMatch = new Array(b.length).fill(false);
  let matches = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = Math.max(0, i - range); j < Math.min(b.length, i + range + 1); j++) {
      if (bMatch[j] || a[i] !== b[j]) continue;
      aMatch[i] = bMatch[j] = true;
      matches++;
      break;
    }
  }
  if (matches === 0) return 0;
  let transpositions = 0;
  for (let i = 0, k = 0; i < a.length; i++) {
    if (!aMatch[i]) continue;
    while (!bMatch[k]) k++;
    if (a[i] !== b[k++]) transpositions++;
  }
  const m = matches;
  const jaro = (m / a.length + m / b.length + (m - transpositions / 2) / m) / 3;
  let prefix = 0;
  while (prefix < 4 && a[prefix] === b[prefix]) prefix++;
  return jaro + prefix * 0.1 * (1 - jaro);
}

/** Per-field similarity, 0–1, or null when a field is missing on either side. */
export function fieldScores(a: SourceRecord, b: SourceRecord): Record<Field, number | null> {
  // Name: an initial ("J.") is a strong-but-not-certain match for a full first name.
  const na = normaliseName(a.name);
  const nb = normaliseName(b.name);
  const isInitial = (s: string) => s.length === 1;
  const first =
    isInitial(na.first) || isInitial(nb.first)
      ? na.first[0] === nb.first[0] ? 0.85 : 0
      : jaroWinkler(na.first, nb.first);
  const name = 0.4 * first + 0.6 * jaroWinkler(na.last, nb.last);

  // Date of birth: exact, or partial credit when only one part differs (a common keying error).
  const da = parseDob(a.dob);
  const db = parseDob(b.dob);
  let dob: number | null = null;
  if (da && db) {
    const same = da.filter((v, i) => v === db[i]).length;
    dob = same === 3 ? 1 : same === 2 ? 0.5 : 0;
  }

  // Address: same house number and postcode is a match; otherwise compare the words.
  const aa = normaliseAddress(a.address);
  const ab = normaliseAddress(b.address);
  let address: number;
  if (aa.postcode && aa.postcode === ab.postcode && aa.house === ab.house) address = 1;
  else {
    const sa = new Set(aa.tokens);
    const sb = new Set(ab.tokens);
    const shared = [...sa].filter((t) => sb.has(t)).length;
    address = shared / new Set([...sa, ...sb]).size;
  }

  // Email: exact or nothing; missing emails don't count against a match.
  const email =
    a.email && b.email ? (a.email.toLowerCase() === b.email.toLowerCase() ? 1 : 0) : null;

  return { name, dob, address, email };
}

// ---------------------------------------------------------------- matching

export type Decision = "match" | "review" | "no-match";
export type Pair = {
  a: SourceRecord;
  b: SourceRecord;
  scores: Record<Field, number | null>;
  score: number; // 0–100
  decision: Decision;
};

/** Weighted score over the fields both records have, scaled to 0–100. */
export function scorePair(a: SourceRecord, b: SourceRecord, weights: Weights, t: Thresholds): Pair {
  const scores = fieldScores(a, b);
  let total = 0;
  let weight = 0;
  for (const f of Object.keys(scores) as Field[]) {
    const s = scores[f];
    if (s === null) continue;
    total += weights[f] * s;
    weight += weights[f];
  }
  const score = weight ? Math.round((total / weight) * 100) : 0;
  const decision: Decision = score >= t.auto ? "match" : score >= t.review ? "review" : "no-match";
  return { a, b, scores, score, decision };
}

export function scoreAll(records: SourceRecord[], weights: Weights, t: Thresholds) {
  const pairs: Pair[] = [];
  for (let i = 0; i < records.length; i++)
    for (let j = i + 1; j < records.length; j++) pairs.push(scorePair(records[i], records[j], weights, t));
  return pairs.sort((x, y) => y.score - x.score);
}

/** Group records into customers by following automatic matches (union–find). */
export function cluster(records: SourceRecord[], pairs: Pair[]) {
  const parent = new Map(records.map((r) => [r.id, r.id]));
  const find = (id: string): string => (parent.get(id) === id ? id : find(parent.get(id)!));
  for (const p of pairs) if (p.decision === "match") parent.set(find(p.a.id), find(p.b.id));
  const groups = new Map<string, SourceRecord[]>();
  for (const r of records) groups.set(find(r.id), [...(groups.get(find(r.id)) ?? []), r]);
  return [...groups.values()];
}

// ---------------------------------------------------------------- survivorship

export type GoldenRecord = {
  id: string;
  members: SourceRecord[];
  values: Record<Field, { value: string; from: SourceSystem | null }>;
};

const byTrust = (a: SourceRecord, b: SourceRecord) => trustOrder.indexOf(a.source) - trustOrder.indexOf(b.source);
const byRecency = (a: SourceRecord, b: SourceRecord) => b.updated.localeCompare(a.updated);
// "Most complete" prefers a full first name over an initial — not simply the longest
// string, which would reward typos like "Patell".
const completeness = (r: SourceRecord) => (normaliseName(r.name).first.length > 1 ? 1 : 0);

/** Standardise an address for display: expanded words, title case, formatted postcode. */
export function standardiseAddress(address: string) {
  const a = normaliseAddress(address);
  const words = a.tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1));
  const street = words.join(" ");
  const pc = a.postcode ? `${a.postcode.slice(0, -3)} ${a.postcode.slice(-3)}` : "";
  return [street, pc].filter(Boolean).join(", ");
}

export function survive(group: SourceRecord[], rules: Survivorship): GoldenRecord {
  const pick = (field: Field, order: (a: SourceRecord, b: SourceRecord) => number) => {
    const winner = [...group].filter((r) => r[field]).sort(order)[0];
    return { value: winner?.[field] ?? "", from: winner?.source ?? null };
  };
  return {
    id: group.map((r) => r.id).join("+"),
    members: group,
    values: {
      name:
        rules.name === "most-complete"
          ? pick("name", (a, b) => completeness(b) - completeness(a) || byTrust(a, b))
          : pick("name", byTrust),
      dob: pick("dob", byTrust), // date of birth: always the most trusted source
      address: rules.address === "most-recent" ? pick("address", byRecency) : pick("address", byTrust),
      email: pick("email", byRecency), // email: the most recently captured
    },
  };
}

/** Group golden records that share an address into households. */
export function households(golden: GoldenRecord[]) {
  const map = new Map<string, GoldenRecord[]>();
  for (const g of golden) {
    const key = householdKey(g.values.address.value);
    map.set(key, [...(map.get(key) ?? []), g]);
  }
  return [...map.entries()].map(([key, members]) => ({ key, members }));
}
