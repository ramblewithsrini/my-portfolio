"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  connection,
  defaultThresholds,
  defaultWeights,
  growingTopics,
  institutionCollaborations,
  run,
  topResearchers,
  type Answer,
  type Dataset,
  type Decision,
  type Factor,
  type Graph,
  type Person,
  type Thresholds,
  type Weights,
} from "@/lib/research";

const factorLabels: Record<Factor, string> = {
  name: "Name",
  affiliation: "Institution",
  coauthors: "Shared co-authors",
  topic: "Same topic",
};

const decisionStyles: Record<Decision, { label: string; className: string }> = {
  match: { label: "Same person", className: "bg-accent text-background" },
  review: { label: "Steward review", className: "bg-amber-300 text-background" },
  "no-match": { label: "Different people", className: "border border-border text-muted" },
};

// One colour per institution, for the graph and the chips.
const PALETTE = ["#c6ff3d", "#7c5cff", "#5fe3c0", "#ff8a65", "#4fc3f7", "#f06292", "#ffd54f", "#a1887f"];

function Slider(props: { id: string; label: string; value: number; min: number; max: number; suffix?: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <label htmlFor={props.id} className="text-foreground/85">
          {props.label}
        </label>
        <span className="font-display font-bold text-accent">
          {props.value}
          {props.suffix}
        </span>
      </div>
      <input
        id={props.id}
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[#c6ff3d]"
      />
    </div>
  );
}

function StepHeading({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="mb-6 mt-16">
      <p className="font-display text-sm text-accent-2">Step {n}</p>
      <h2 className="mt-1 type-heading">{title}</h2>
      <p className="mt-2 max-w-3xl text-muted">{body}</p>
    </div>
  );
}

// ---------------------------------------------------------------- graph layout

type Pos = { x: number; y: number };

/** A small, deterministic force-directed layout: linked people pull together,
 *  everyone pushes apart, and the whole picture is kept inside the frame. */
function layout(g: Graph, w: number, h: number): Map<string, Pos> {
  const ids = g.people.map((p) => p.id).sort();
  const pos = new Map<string, Pos>(
    ids.map((id, i) => {
      const a = (2 * Math.PI * i) / ids.length;
      return [id, { x: w / 2 + (w / 3) * Math.cos(a), y: h / 2 + (h / 3) * Math.sin(a) }];
    }),
  );
  const links = coauthorLinks(g);
  const k = Math.sqrt((w * h) / Math.max(1, ids.length)) * 1.05;
  for (let step = 0; step < 300; step++) {
    const disp = new Map(ids.map((id) => [id, { x: 0, y: 0 }]));
    for (let i = 0; i < ids.length; i++)
      for (let j = i + 1; j < ids.length; j++) {
        const a = pos.get(ids[i])!;
        const b = pos.get(ids[j])!;
        const dx = a.x - b.x || 0.01;
        const dy = a.y - b.y || 0.01;
        const d = Math.max(1, Math.hypot(dx, dy));
        const f = (k * k) / d;
        disp.get(ids[i])!.x += (dx / d) * f;
        disp.get(ids[i])!.y += (dy / d) * f;
        disp.get(ids[j])!.x -= (dx / d) * f;
        disp.get(ids[j])!.y -= (dy / d) * f;
      }
    for (const l of links) {
      const a = pos.get(l.a)!;
      const b = pos.get(l.b)!;
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.max(1, Math.hypot(dx, dy));
      const f = ((d * d) / k) * Math.min(0.8, 0.25 + 0.15 * l.papers);
      disp.get(l.a)!.x -= (dx / d) * f;
      disp.get(l.a)!.y -= (dy / d) * f;
      disp.get(l.b)!.x += (dx / d) * f;
      disp.get(l.b)!.y += (dy / d) * f;
    }
    const temp = 40 * (1 - step / 300) + 1;
    for (const id of ids) {
      const p = pos.get(id)!;
      const d = disp.get(id)!;
      const len = Math.max(1, Math.hypot(d.x, d.y));
      p.x = Math.min(w - 40, Math.max(40, p.x + (d.x / len) * Math.min(len, temp)));
      p.y = Math.min(h - 30, Math.max(30, p.y + (d.y / len) * Math.min(len, temp)));
    }
  }
  return pos;
}

function coauthorLinks(g: Graph) {
  const counts = new Map<string, number>();
  for (const authors of g.authorsOf.values()) {
    const unique = [...new Set(authors)].sort();
    for (let i = 0; i < unique.length; i++)
      for (let j = i + 1; j < unique.length; j++) {
        const key = `${unique[i]}|${unique[j]}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
  }
  return [...counts.entries()].map(([key, papers]) => {
    const [a, b] = key.split("|");
    return { a, b, papers };
  });
}

// ---------------------------------------------------------------- questions

type Question = "top" | "collab" | "growing" | "path";

export default function ResearchGraphLab({ data }: { data: Dataset }) {
  const [weights, setWeights] = useState<Weights>(defaultWeights);
  const [thresholds, setThresholds] = useState<Thresholds>(defaultThresholds);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question>("top");
  const [topic, setTopic] = useState(data.topics[0].id);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const result = useMemo(() => run(data, weights, thresholds), [data, weights, thresholds]);
  const g = result.graph;
  const W = 900;
  const H = 520;
  // The layout runs only in the browser: 300 rounds of floating-point maths can land
  // a few pixels differently on the server, which React reports as a mismatch.
  const inBrowser = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const pos = useMemo(() => (inBrowser ? layout(g, W, H) : new Map<string, Pos>()), [g, inBrowser]);
  const links = useMemo(() => coauthorLinks(g), [g]);

  const instIndex = new Map(data.institutions.map((i, n) => [i.id, n]));
  const instName = (id: string) => data.institutions.find((i) => i.id === id)?.name ?? "Unknown";
  const colourOf = (p: Person) => PALETTE[(instIndex.get(p.institutions.at(-1)?.id ?? "") ?? 0) % PALETTE.length];
  const sortedPeople = [...g.people].sort((a, b) => a.name.localeCompare(b.name));
  const personById = new Map(g.people.map((p) => [p.id, p]));
  const fromId = personById.has(from) ? from : sortedPeople.find((p) => p.name.includes("Raman"))?.id ?? sortedPeople[0].id;
  const toId = personById.has(to) ? to : sortedPeople.find((p) => p.name.includes("Nilsson"))?.id ?? sortedPeople.at(-1)!.id;

  // Cheap to compute, so no memo: the answer always reflects the current graph.
  const answer: Answer =
    question === "top"
      ? topResearchers(data, g, topic)
      : question === "collab"
        ? institutionCollaborations(data, g)
        : question === "growing"
          ? growingTopics(data)
          : connection(g, fromId, toId);
  const lit = new Set(answer.highlight);

  const mixed = result.groups.filter((grp) => new Set(grp.map((m) => m.truth)).size > 1);
  const reviewPairs = result.pairs.filter((p) => p.decision === "review").slice(0, 6);
  const shownMentions = result.mentions
    .filter((m) => !filter || `${m.name} ${m.affiliation}`.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, showAll ? undefined : 12);
  const focus = selected ? personById.get(selected) : undefined;

  const setWeight = (f: Factor) => (v: number) => setWeights((w) => ({ ...w, [f]: v }));
  const reset = () => {
    setWeights(defaultWeights);
    setThresholds(defaultThresholds);
  };

  return (
    <div>
      {/* Live summary */}
      <div aria-live="polite" className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4">
        {[
          { value: result.mentions.length, label: "Author mentions" },
          { value: g.people.length, label: "People found (24 real)" },
          { value: `${Math.round(result.accuracy.precision * 100)}%`, label: "Precision: no wrong merges" },
          { value: `${Math.round(result.accuracy.recall * 100)}%`, label: "Recall: no missed matches" },
        ].map((s) => (
          <div key={s.label} className="bg-background p-5 sm:p-6">
            <p className="text-gradient font-display text-4xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-6 grid gap-8 rounded-3xl border border-accent/40 bg-surface p-7 sm:p-9 lg:grid-cols-3">
        <div className="space-y-4">
          <p className="type-eyebrow text-accent">How much each signal counts</p>
          {(Object.keys(factorLabels) as Factor[]).map((f) => (
            <Slider key={f} id={`rw-${f}`} label={factorLabels[f]} value={weights[f]} min={0} max={50} onChange={setWeight(f)} />
          ))}
        </div>
        <div className="space-y-4">
          <p className="type-eyebrow text-accent">Decision thresholds</p>
          <Slider
            id="rt-auto"
            label="Treat as the same person at"
            value={thresholds.auto}
            min={50}
            max={100}
            suffix="%"
            onChange={(v) => setThresholds((t) => ({ auto: v, review: Math.min(t.review, v) }))}
          />
          <Slider
            id="rt-review"
            label="Send to data stewards from"
            value={thresholds.review}
            min={40}
            max={100}
            suffix="%"
            onChange={(v) => setThresholds((t) => ({ review: v, auto: Math.max(t.auto, v) }))}
          />
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-muted">
          <p className="type-eyebrow text-accent">Try this</p>
          <p>Lower “same person” to 65% — two different J. Chens, at different institutions, become one.</p>
          <p>Set Institution to 0 — the same mistake, because nothing else tells them apart.</p>
          <p>Raise it to 95% — real people split into duplicates.</p>
          <p>An ORCID on both mentions always decides, either way.</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-border px-4 py-2 font-semibold text-foreground transition-colors hover:border-foreground"
          >
            Reset to defaults
          </button>
        </div>
      </div>

      {mixed.length > 0 && (
        <p role="status" className="mt-6 rounded-2xl border border-red-400/50 bg-red-400/[0.07] px-5 py-4 text-sm text-red-200">
          Wrong merge: {mixed.map((grp) => [...new Set(grp.map((m) => m.name))].slice(0, 4).join(" / ")).join("; ")} — different real people
          treated as one. Every question below now inherits that mistake.
        </p>
      )}

      {/* Step 1 */}
      <StepHeading n="01" title="Messy records" body="Every author mention, as printed on the paper. Search for a surname to see its variants." />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <label htmlFor="mention-filter" className="sr-only">
          Search mentions
        </label>
        <input
          id="mention-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Try “Chen”, “Okafor” or “Brandt”"
          className="w-full max-w-sm rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button type="button" onClick={() => setShowAll((s) => !s)} className="text-sm font-semibold text-accent hover:underline">
          {showAll ? "Show fewer" : `Show all ${result.mentions.length}`}
        </button>
      </div>
      <div className="overflow-x-auto rounded-3xl border border-border bg-surface">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="type-eyebrow text-muted">
            <tr className="border-b border-border">
              {["Paper", "Name as printed", "Affiliation as printed", "Resolved institution", "ORCID"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shownMentions.map((m) => (
              <tr key={m.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-2.5 font-mono text-muted">
                  {m.paper} · {m.year}
                </td>
                <td className="px-4 py-2.5 font-medium">{m.name}</td>
                <td className="px-4 py-2.5 text-foreground/80">{m.affiliation}</td>
                <td className="px-4 py-2.5 text-foreground/80">{m.institution ? instName(m.institution) : <span className="text-red-300">Unresolved</span>}</td>
                <td className="px-4 py-2.5 font-mono text-xs text-muted">{m.orcid || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Step 2 */}
      <StepHeading
        n="02"
        title="Who's who"
        body="Mentions are compared when their family names look alike. Names, institutions, shared co-authors and topic add up to a score; your thresholds decide. Below: the closest calls, then everyone found."
      />
      {reviewPairs.length > 0 && (
        <ul className="mb-8 space-y-3">
          {reviewPairs.map((p) => {
            const d = decisionStyles[p.decision];
            return (
              <li key={p.a.id + p.b.id} className="rounded-2xl border border-border bg-surface p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-medium">
                    {p.a.name} <span className="text-muted">({instName(p.a.institution ?? "")}, {p.a.year})</span>
                    <span className="mx-2 text-muted" aria-hidden>
                      ↔
                    </span>
                    {p.b.name} <span className="text-muted">({instName(p.b.institution ?? "")}, {p.b.year})</span>
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl font-bold">{p.score}%</span>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${d.className}`}>{d.label}</span>
                  </div>
                </div>
                <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                  {(Object.keys(factorLabels) as Factor[]).map((f) => (
                    <div key={f} className="flex gap-1">
                      <dt>{factorLabels[f]}</dt>
                      <dd className="font-semibold text-foreground/85">{p.factors[f] === null ? "—" : `${Math.round(p.factors[f]! * 100)}%`}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            );
          })}
        </ul>
      )}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPeople.map((p) => {
          const variants = [...new Set(p.mentions.map((m) => m.name))];
          const wrong = new Set(p.mentions.map((m) => m.truth)).size > 1;
          return (
            <li key={p.id} className={`rounded-2xl border p-5 ${wrong ? "border-red-400/60 bg-red-400/[0.06]" : "border-border bg-surface"}`}>
              <p className="font-display text-lg font-bold">{p.name}</p>
              <p className="mt-1 text-sm text-muted">
                {p.institutions.map((i, n) => `${n ? "→ " : ""}${instName(i.id)} (${i.from})`).join(" ")}
              </p>
              <p className="mt-2 text-xs text-muted">
                {p.mentions.length} mentions · {p.papers.length} papers{p.orcid ? ` · ORCID ${p.orcid}` : ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {variants.map((v) => (
                  <span key={v} className="rounded-full border border-border px-2 py-0.5 text-xs text-foreground/80">
                    {v}
                  </span>
                ))}
              </div>
              {wrong && <p className="mt-3 text-xs font-semibold text-red-300">Two or more real people merged here</p>}
            </li>
          );
        })}
      </ul>

      {/* Step 3 */}
      <StepHeading
        n="03"
        title="The graph"
        body="Each circle is a person, coloured by institution and sized by papers; each line is co-authorship, thicker for more joint papers. Click a person to explore their work."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="overflow-hidden rounded-3xl border border-border bg-surface">
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Co-authorship graph of the researchers found">
            {links.map((l) => {
              const a = pos.get(l.a);
              const b = pos.get(l.b);
              if (!a || !b) return null;
              const on = lit.has(l.a) && lit.has(l.b);
              return (
                <line
                  key={l.a + l.b}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={on ? "#c6ff3d" : "currentColor"}
                  className={on ? "" : "text-foreground/15"}
                  strokeWidth={Math.min(6, 0.8 + l.papers)}
                />
              );
            })}
            {g.people.map((p) => {
              const at = pos.get(p.id);
              if (!at) return null;
              const r = 6 + 2.4 * Math.sqrt(p.papers.length);
              const on = lit.has(p.id) || p.papers.some((id) => lit.has(id));
              const dim = lit.size > 0 && !on && question !== "growing" && question !== "collab";
              return (
                <g
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  className="cursor-pointer"
                  opacity={dim ? 0.35 : 1}
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelected(p.id)}
                  role="button"
                  aria-label={`${p.name}, ${instName(p.institutions.at(-1)?.id ?? "")}`}
                >
                  <circle cx={at.x} cy={at.y} r={r} fill={colourOf(p)} stroke={selected === p.id || on ? "#ffffff" : "none"} strokeWidth={2.5} />
                  <text x={at.x} y={at.y + r + 13} textAnchor="middle" className="fill-foreground text-[12px]">
                    {p.name}
                  </text>
                </g>
              );
            })}
          </svg>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-border px-5 py-3 text-xs text-muted">
            {data.institutions.map((i, n) => (
              <li key={i.id} className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: PALETTE[n % PALETTE.length] }} aria-hidden />
                {i.name}
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-3xl border border-border bg-surface p-5 text-sm">
          {focus ? (
            <>
              <p className="font-display text-lg font-bold">{focus.name}</p>
              <p className="mt-1 text-muted">{focus.institutions.map((i) => instName(i.id)).join(" → ")}</p>
              <p className="type-eyebrow mt-4 text-accent">Papers</p>
              <ul className="mt-2 space-y-2">
                {focus.papers
                  .map((id) => g.papers.get(id)!)
                  .sort((a, b) => b.year - a.year)
                  .map((pp) => (
                    <li key={pp.id}>
                      <span className="text-foreground/90">{pp.title}</span>
                      <span className="text-muted">
                        {" "}
                        · {pp.year} · cited {g.citedBy.get(pp.id)?.length ?? 0}×
                      </span>
                    </li>
                  ))}
              </ul>
              <p className="type-eyebrow mt-4 text-accent">Co-authors</p>
              <p className="mt-2 text-foreground/85">
                {[...new Set(focus.papers.flatMap((id) => g.authorsOf.get(id) ?? []))]
                  .filter((id) => id !== focus.id)
                  .map((id) => personById.get(id)?.name)
                  .join(", ") || "—"}
              </p>
            </>
          ) : (
            <p className="text-muted">Click a person in the graph to see their papers, citations and co-authors.</p>
          )}
        </aside>
      </div>

      {/* Step 4 */}
      <StepHeading
        n="04"
        title="Ask the graph"
        body="Each answer is computed live from the graph you just built — so a wrong merge upstream changes the answer here. The Cypher shows how a graph database such as Neo4j would ask the same question."
      />
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Questions">
        {(
          [
            ["top", "Who is most cited on a topic?"],
            ["collab", "Which institutions work together most?"],
            ["growing", "Which topics are growing fastest?"],
            ["path", "How are two people connected?"],
          ] as [Question, string][]
        ).map(([q, label]) => (
          <button
            key={q}
            type="button"
            role="tab"
            aria-selected={question === q}
            onClick={() => setQuestion(q)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              question === q ? "border-accent bg-accent text-background" : "border-border text-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {question === "top" && (
          <label className="flex items-center gap-2">
            Topic
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className="rounded-full border border-border bg-surface px-3 py-1.5">
              {data.topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        )}
        {question === "path" && (
          <>
            <label className="flex items-center gap-2">
              From
              <select value={fromId} onChange={(e) => setFrom(e.target.value)} className="rounded-full border border-border bg-surface px-3 py-1.5">
                {sortedPeople.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2">
              To
              <select value={toId} onChange={(e) => setTo(e.target.value)} className="rounded-full border border-border bg-surface px-3 py-1.5">
                {sortedPeople.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
      </div>
      <div className="mt-4 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-surface p-6">
          <p className="type-eyebrow text-accent">Answer</p>
          {answer.rows.length ? (
            <ol className="mt-3 space-y-2">
              {answer.rows.map((row, i) => (
                <li key={row.label + i} className="flex items-baseline justify-between gap-4">
                  <span>
                    <span className="font-medium">{row.label}</span>
                    <span className="block text-xs text-muted">{row.detail}</span>
                  </span>
                  {question !== "path" && (
                    <span className="font-display text-xl font-bold">
                      {row.value}
                      {question === "growing" ? "%" : ""}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-3 text-muted">No connection found between these two people.</p>
          )}
        </div>
        <div className="rounded-3xl border border-border bg-background p-6">
          <p className="type-eyebrow text-accent">The Cypher behind it</p>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed text-foreground/85">
            <code>{answer.cypher}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
