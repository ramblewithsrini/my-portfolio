// A small, readable entity-resolution and knowledge-graph engine for the lab at
// /lab/research-graph. It works on a fictional dataset (AI in payments and fraud
// detection): resolve who's who, build a graph, then answer questions from it.
// Each question also carries the Cypher a graph database such as Neo4j would run.

import { jaroWinkler } from "./mdm";

// ---------------------------------------------------------------- data types

export type Mention = {
  id: string;
  paper: string;
  name: string; // as printed on the paper
  affiliation: string; // as printed on the paper
  orcid: string; // "" when the paper didn't include it
  truth: string; // the real author — used only to score matching, never to match
  truthInstitution: string;
};
export type Paper = { id: string; title: string; year: number; topic: string; cites: string[] };
export type Institution = { id: string; name: string; country: string; aliases: string[] };
export type Topic = { id: string; label: string };
export type Dataset = {
  topics: Topic[];
  institutions: Institution[];
  papers: Paper[];
  mentions: Mention[];
};

// ---------------------------------------------------------------- names

const stripAccents = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

/** "Raman, Priya", "P. Raman" and "Priya Raman" all become { first, last }. */
export function parseName(raw: string) {
  const clean = stripAccents(raw).toLowerCase().replace(/['’]/g, "");
  let first: string;
  let last: string;
  if (clean.includes(",")) {
    const [l, f] = clean.split(",");
    last = l;
    first = f ?? "";
  } else {
    const parts = clean.split(/\s+/).filter(Boolean);
    first = parts[0] ?? "";
    last = parts.slice(1).join(" ");
  }
  const tidy = (s: string) => s.replace(/[^a-z\s]/g, " ").trim().replace(/\s+/g, " ");
  return { first: tidy(first).split(" ")[0] ?? "", last: tidy(last).replace(/\s/g, "") };
}

// ---------------------------------------------------------------- institutions

const EXPANSIONS: Record<string, string> = {
  univ: "university", inst: "institute", sch: "school", ctr: "centre", tech: "technology",
  lab: "laboratory", labs: "laboratory", rd: "research",
};
const STOP = new Set(["of", "for", "the", "and", "plc", "london", "dublin"]);

function words(s: string) {
  return stripAccents(s)
    .toLowerCase()
    .replace(/r&d/g, "rd")
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => EXPANSIONS[w] ?? w);
}

const acronym = (name: string) => words(name).filter((w) => !STOP.has(w)).map((w) => w[0]).join("");

export type InstitutionMatch = { id: string | null; method: "exact" | "reference" | "acronym" | "fuzzy" | "none"; score: number };

/** Resolve a printed affiliation to a known institution: exact name after normalising,
 *  then the reference-data aliases ("NBU"), then acronyms, then word similarity. */
export function resolveInstitution(raw: string, institutions: Institution[]): InstitutionMatch {
  const rw = words(raw).filter((w) => !STOP.has(w));
  const key = rw.join(" ");
  const keyOf = (s: string) => words(s).filter((w) => !STOP.has(w)).join(" ");
  for (const i of institutions) if (keyOf(i.name) === key) return { id: i.id, method: "exact", score: 1 };
  for (const i of institutions) if (i.aliases.some((a) => keyOf(a) === key)) return { id: i.id, method: "reference", score: 1 };
  if (rw.length === 1)
    for (const i of institutions) if (rw[0] === acronym(i.name)) return { id: i.id, method: "acronym", score: 0.9 };
  let best: InstitutionMatch = { id: null, method: "none", score: 0 };
  for (const i of institutions) {
    const iw = words(i.name).filter((w) => !STOP.has(w));
    // Match each printed word to its closest canonical word, then balance
    // "is everything printed accounted for?" with "is the name covered?".
    const sum = rw.reduce((n, w) => n + Math.max(...iw.map((x) => jaroWinkler(w, x))), 0);
    const p = sum / rw.length;
    const r = sum / iw.length;
    const s = p + r ? (2 * p * r) / (p + r) : 0;
    if (s > best.score) best = { id: i.id, method: "fuzzy", score: s };
  }
  return best.score >= 0.8 ? best : { id: null, method: "none", score: best.score };
}

// ---------------------------------------------------------------- matching authors

export type Factor = "name" | "affiliation" | "coauthors" | "topic";
export type Weights = Record<Factor, number>;
export type Thresholds = { review: number; auto: number }; // 0–100
export type Decision = "match" | "review" | "no-match";

export const defaultWeights: Weights = { name: 45, affiliation: 25, coauthors: 20, topic: 10 };
export const defaultThresholds: Thresholds = { review: 60, auto: 75 };

export type Enriched = Mention & {
  first: string;
  last: string;
  institution: string | null;
  year: number;
  topic: string;
  coauthors: Set<string>; // co-authors' family names on the same paper
};

export function enrich(data: Dataset): Enriched[] {
  const papers = new Map(data.papers.map((p) => [p.id, p]));
  const byPaper = new Map<string, Mention[]>();
  for (const m of data.mentions) byPaper.set(m.paper, [...(byPaper.get(m.paper) ?? []), m]);
  return data.mentions.map((m) => {
    const { first, last } = parseName(m.name);
    const paper = papers.get(m.paper)!;
    const coauthors = new Set(byPaper.get(m.paper)!.filter((o) => o.id !== m.id).map((o) => parseName(o.name).last));
    return { ...m, first, last, institution: resolveInstitution(m.affiliation, data.institutions).id, year: paper.year, topic: paper.topic, coauthors };
  });
}

export type Pair = { a: Enriched; b: Enriched; factors: Record<Factor, number | null>; orcid: "same" | "different" | null; score: number; decision: Decision };

export function scorePair(a: Enriched, b: Enriched, w: Weights, t: Thresholds): Pair {
  const initial = (s: string) => s.length === 1;
  const first = initial(a.first) || initial(b.first) ? (a.first[0] === b.first[0] ? 0.85 : 0) : jaroWinkler(a.first, b.first);
  const factors: Record<Factor, number | null> = {
    name: 0.4 * first + 0.6 * jaroWinkler(a.last, b.last),
    affiliation: a.institution && b.institution ? (a.institution === b.institution ? 1 : 0) : null,
    // Shared co-authors and a shared topic are evidence for a match; their absence
    // isn't evidence against one (different papers have different teams).
    coauthors: (() => {
      const shared = [...a.coauthors].filter((c) => b.coauthors.has(c)).length;
      return shared ? Math.min(1, 0.6 + 0.2 * shared) : null;
    })(),
    topic: a.topic === b.topic ? 1 : null,
  };
  // An ORCID on both sides settles it either way.
  const orcid = a.orcid && b.orcid ? (a.orcid === b.orcid ? "same" : "different") : null;
  let score: number;
  if (orcid === "same") score = 100;
  else if (orcid === "different") score = 0;
  else {
    let total = 0;
    let weight = 0;
    for (const f of Object.keys(factors) as Factor[]) {
      const v = factors[f];
      if (v === null) continue;
      total += w[f] * v;
      weight += w[f];
    }
    score = weight ? Math.round((total / weight) * 100) : 0;
    // Different first names (not just initials) can't be the same person.
    if (first < 0.75) score = Math.min(score, t.review - 1);
  }
  const decision: Decision = score >= t.auto ? "match" : score >= t.review ? "review" : "no-match";
  return { a, b, factors, orcid, score, decision };
}

/** Compare mentions whose family names look alike (blocking keeps this fast). */
export function scoreAll(mentions: Enriched[], w: Weights, t: Thresholds) {
  const pairs: Pair[] = [];
  for (let i = 0; i < mentions.length; i++)
    for (let j = i + 1; j < mentions.length; j++) {
      const a = mentions[i];
      const b = mentions[j];
      if (a.paper === b.paper) continue; // one person isn't listed twice on a paper
      if (a.last !== b.last && jaroWinkler(a.last, b.last) < 0.92) continue;
      pairs.push(scorePair(a, b, w, t));
    }
  return pairs.sort((x, y) => y.score - x.score);
}

/** Group mentions into people by following automatic matches (union–find). */
export function cluster(mentions: Enriched[], pairs: Pair[]) {
  const parent = new Map(mentions.map((m) => [m.id, m.id]));
  const find = (id: string): string => (parent.get(id) === id ? id : find(parent.get(id)!));
  for (const p of pairs) if (p.decision === "match") parent.set(find(p.a.id), find(p.b.id));
  const groups = new Map<string, Enriched[]>();
  for (const m of mentions) groups.set(find(m.id), [...(groups.get(find(m.id)) ?? []), m]);
  return [...groups.values()];
}

/** Pairwise precision and recall against the hidden ground truth. */
export function accuracy(groups: Enriched[][]) {
  const all = groups.flat();
  const cluster = new Map<string, number>();
  groups.forEach((g, i) => g.forEach((m) => cluster.set(m.id, i)));
  let tp = 0, fp = 0, fn = 0;
  for (let i = 0; i < all.length; i++)
    for (let j = i + 1; j < all.length; j++) {
      const same = all[i].truth === all[j].truth;
      const together = cluster.get(all[i].id) === cluster.get(all[j].id);
      if (same && together) tp++;
      else if (together) fp++;
      else if (same) fn++;
    }
  const precision = tp + fp ? tp / (tp + fp) : 1;
  const recall = tp + fn ? tp / (tp + fn) : 1;
  return { precision, recall, wrongMerges: fp, missedMerges: fn, people: groups.length };
}

// ---------------------------------------------------------------- the graph

export type Person = { id: string; name: string; orcid: string; mentions: Enriched[]; papers: string[]; institutions: { id: string; from: number }[] };

/** Golden record for each person: the fullest form of the name, any ORCID, and where they worked when. */
export function people(groups: Enriched[][]): Person[] {
  return groups.map((g) => {
    const full = g.filter((m) => m.first.length > 1 && !m.name.includes(","));
    const counts = new Map<string, number>();
    for (const m of full.length ? full : g) counts.set(m.name, (counts.get(m.name) ?? 0) + 1);
    const name = [...counts.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)[0][0];
    const institutions: { id: string; from: number }[] = [];
    for (const m of [...g].sort((a, b) => a.year - b.year))
      if (m.institution && institutions.at(-1)?.id !== m.institution) institutions.push({ id: m.institution, from: m.year });
    return {
      id: g.map((m) => m.id).sort()[0],
      name,
      orcid: g.find((m) => m.orcid)?.orcid ?? "",
      mentions: g,
      papers: [...new Set(g.map((m) => m.paper))],
      institutions,
    };
  });
}

export type Graph = {
  people: Person[];
  papers: Map<string, Paper>;
  personOf: Map<string, string>; // mention id -> person id
  authorsOf: Map<string, string[]>; // paper id -> person ids
  citedBy: Map<string, string[]>; // paper id -> citing paper ids
};

export function buildGraph(data: Dataset, groups: Enriched[][]): Graph {
  const ppl = people(groups);
  const personOf = new Map<string, string>();
  for (const p of ppl) for (const m of p.mentions) personOf.set(m.id, p.id);
  const authorsOf = new Map<string, string[]>();
  for (const m of data.mentions) authorsOf.set(m.paper, [...(authorsOf.get(m.paper) ?? []), personOf.get(m.id)!]);
  const citedBy = new Map<string, string[]>();
  for (const p of data.papers) for (const c of p.cites) citedBy.set(c, [...(citedBy.get(c) ?? []), p.id]);
  return { people: ppl, papers: new Map(data.papers.map((p) => [p.id, p])), personOf, authorsOf, citedBy };
}

// ---------------------------------------------------------------- questions

export type Answer = {
  rows: { label: string; detail: string; value: number }[];
  highlight: string[]; // person, paper or institution ids to light up in the graph
  cypher: string;
};

const institutionName = (data: Dataset, id: string) => data.institutions.find((i) => i.id === id)?.name ?? id;
const currentInstitution = (p: Person) => p.institutions.at(-1)?.id ?? "";

/** Who is most cited on a topic? Citations received by their papers on that topic. */
export function topResearchers(data: Dataset, g: Graph, topic: string, limit = 5): Answer {
  const rows = g.people
    .map((p) => {
      const onTopic = p.papers.filter((id) => g.papers.get(id)!.topic === topic);
      const citations = onTopic.reduce((n, id) => n + (g.citedBy.get(id)?.length ?? 0), 0);
      return { p, onTopic, citations };
    })
    .filter((r) => r.onTopic.length)
    .sort((a, b) => b.citations - a.citations || b.onTopic.length - a.onTopic.length)
    .slice(0, limit);
  return {
    rows: rows.map((r) => ({ label: r.p.name, detail: `${institutionName(data, currentInstitution(r.p))} · ${r.onTopic.length} papers`, value: r.citations })),
    highlight: rows.flatMap((r) => [r.p.id, ...r.onTopic]),
    cypher: `MATCH (a:Author)-[:WROTE]->(p:Paper)-[:ABOUT]->(:Topic {id: '${topic}'})
OPTIONAL MATCH (p)<-[:CITES]-(c:Paper)
RETURN a.name, count(DISTINCT p) AS papers, count(c) AS citations
ORDER BY citations DESC, papers DESC LIMIT ${limit}`,
  };
}

/** Which institutions write papers together most often? */
export function institutionCollaborations(data: Dataset, g: Graph, limit = 5): Answer {
  const instOf = new Map<string, string>(); // mention id -> resolved institution
  for (const p of g.people) for (const m of p.mentions) if (m.institution) instOf.set(m.id, m.institution);
  const counts = new Map<string, number>();
  for (const paper of data.papers) {
    const insts = [...new Set(data.mentions.filter((m) => m.paper === paper.id).map((m) => instOf.get(m.id)).filter(Boolean) as string[])].sort();
    for (let i = 0; i < insts.length; i++)
      for (let j = i + 1; j < insts.length; j++) {
        const key = `${insts[i]}|${insts[j]}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
  }
  const rows = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit);
  return {
    rows: rows.map(([k, n]) => {
      const [a, b] = k.split("|");
      return { label: `${institutionName(data, a)} + ${institutionName(data, b)}`, detail: "joint papers", value: n };
    }),
    highlight: [...new Set(rows.flatMap(([k]) => k.split("|")))],
    cypher: `MATCH (i1:Institution)<-[:AFFILIATED_WITH]-(:Author)-[:WROTE]->(p:Paper)
      <-[:WROTE]-(:Author)-[:AFFILIATED_WITH]->(i2:Institution)
WHERE i1.id < i2.id
RETURN i1.name, i2.name, count(DISTINCT p) AS jointPapers
ORDER BY jointPapers DESC LIMIT ${limit}`,
  };
}

/** Which topics are growing fastest? Papers in 2025–26 against 2023–24. */
export function growingTopics(data: Dataset): Answer {
  const rows = data.topics
    .map((t) => {
      const recent = data.papers.filter((p) => p.topic === t.id && p.year >= 2025).length;
      const before = data.papers.filter((p) => p.topic === t.id && p.year >= 2023 && p.year <= 2024).length;
      return { t, recent, before, growth: before ? Math.round(((recent - before) / before) * 100) : recent * 100 };
    })
    .sort((a, b) => b.growth - a.growth);
  return {
    rows: rows.map((r) => ({ label: r.t.label, detail: `${r.before} → ${r.recent} papers`, value: r.growth })),
    highlight: rows.slice(0, 3).map((r) => r.t.id),
    cypher: `MATCH (p:Paper)-[:ABOUT]->(t:Topic)
WITH t, sum(CASE WHEN p.year >= 2025 THEN 1 ELSE 0 END) AS recent,
        sum(CASE WHEN p.year IN [2023, 2024] THEN 1 ELSE 0 END) AS before
RETURN t.label, before, recent,
       CASE WHEN before = 0 THEN recent * 100 ELSE round(100.0 * (recent - before) / before) END AS growth
ORDER BY growth DESC`,
  };
}

/** How are two people connected through co-authorship? Shortest path. */
export function connection(g: Graph, fromId: string, toId: string): Answer & { path: string[] } {
  const neighbours = new Map<string, Set<string>>();
  for (const authors of g.authorsOf.values())
    for (const a of authors) for (const b of authors) if (a !== b) neighbours.set(a, (neighbours.get(a) ?? new Set()).add(b));
  const prev = new Map<string, string | null>([[fromId, null]]);
  const queue = [fromId];
  while (queue.length) {
    const cur = queue.shift()!;
    if (cur === toId) break;
    for (const n of neighbours.get(cur) ?? []) if (!prev.has(n)) { prev.set(n, cur); queue.push(n); }
  }
  const path: string[] = [];
  if (prev.has(toId)) for (let c: string | null = toId; c; c = prev.get(c) ?? null) path.unshift(c);
  const name = (id: string) => g.people.find((p) => p.id === id)?.name ?? id;
  return {
    path,
    rows: path.map((id, i) => ({ label: name(id), detail: i === 0 ? "start" : "co-authored with the previous person", value: i })),
    highlight: path,
    cypher: `MATCH (a:Author {name: '${name(fromId)}'}), (b:Author {name: '${name(toId)}'})
MATCH path = shortestPath((a)-[:CO_AUTHORED*..6]-(b))
RETURN [n IN nodes(path) | n.name] AS chain`,
  };
}

/** The whole pipeline, as one call: resolve, group, score and build the graph. */
export function run(data: Dataset, w: Weights = defaultWeights, t: Thresholds = defaultThresholds) {
  const mentions = enrich(data);
  const pairs = scoreAll(mentions, w, t);
  const groups = cluster(mentions, pairs);
  return { mentions, pairs, groups, accuracy: accuracy(groups), graph: buildGraph(data, groups) };
}
