"use client";

import { useMemo, useState } from "react";
import {
  cluster,
  households,
  parseDob,
  scoreAll,
  standardiseAddress,
  survive,
  type Decision,
  type Field,
  type SourceRecord,
  type SourceSystem,
  type Survivorship,
  type Thresholds,
  type Weights,
} from "@/lib/mdm";

const fieldLabels: Record<Field, string> = {
  name: "Name",
  dob: "Date of birth",
  address: "Address",
  email: "Email",
};

const sourceStyles: Record<SourceSystem, string> = {
  Policy: "border-accent-2/60 text-[#c5b8ff]",
  Claims: "border-[#5fe3c0]/60 text-[#5fe3c0]",
  Marketing: "border-accent/60 text-accent",
};

const decisionStyles: Record<Decision, { label: string; className: string }> = {
  match: { label: "Match", className: "bg-accent text-background" },
  review: { label: "Steward review", className: "bg-amber-300 text-background" },
  "no-match": { label: "No match", className: "border border-border text-muted" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatDob = (dob: string) => {
  const d = parseDob(dob);
  return d ? `${d[2]} ${MONTHS[d[1] - 1]} ${d[0]}` : dob;
};

function SourceChip({ source }: { source: SourceSystem | null }) {
  if (!source) return null;
  return (
    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-medium ${sourceStyles[source]}`}>
      {source}
    </span>
  );
}

function Slider(props: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
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

function Choice<T extends string>(props: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm text-foreground/85">{props.legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {props.options.map((o) => (
          <label
            key={o.value}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors ${
              props.value === o.value
                ? "border-accent bg-accent text-background"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            <input
              type="radio"
              name={props.name}
              value={o.value}
              checked={props.value === o.value}
              onChange={() => props.onChange(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function StepHeading({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="mb-6 mt-16">
      <p className="font-display text-sm text-accent-2">Step {n}</p>
      <h2 className="mt-1 font-display text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-2 max-w-3xl text-muted">{body}</p>
    </div>
  );
}

export default function MdmPlayground(props: {
  records: SourceRecord[];
  defaults: { weights: Weights; thresholds: Thresholds; survivorship: Survivorship };
}) {
  const [weights, setWeights] = useState(props.defaults.weights);
  const [thresholds, setThresholds] = useState(props.defaults.thresholds);
  const [rules, setRules] = useState(props.defaults.survivorship);

  const result = useMemo(() => {
    const pairs = scoreAll(props.records, weights, thresholds);
    const golden = cluster(props.records, pairs).map((g) => survive(g, rules));
    return {
      pairs: pairs.filter((p) => p.score >= 40),
      review: pairs.filter((p) => p.decision === "review").length,
      golden,
      households: households(golden),
    };
  }, [props.records, weights, thresholds, rules]);

  const setWeight = (f: Field) => (v: number) => setWeights((w) => ({ ...w, [f]: v }));
  const reset = () => {
    setWeights(props.defaults.weights);
    setThresholds(props.defaults.thresholds);
    setRules(props.defaults.survivorship);
  };

  return (
    <div>
      {/* Live summary */}
      <div
        aria-live="polite"
        className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-4"
      >
        {[
          { value: props.records.length, label: "Source records" },
          { value: result.golden.length, label: "Customers" },
          { value: result.households.length, label: "Households" },
          { value: result.review, label: "Pairs for steward review" },
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
          <p className="text-xs font-medium uppercase tracking-widest text-accent">How much each field counts</p>
          {(Object.keys(fieldLabels) as Field[]).map((f) => (
            <Slider
              key={f}
              id={`w-${f}`}
              label={fieldLabels[f]}
              value={weights[f]}
              min={0}
              max={50}
              onChange={setWeight(f)}
            />
          ))}
        </div>
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Decision thresholds</p>
          <Slider
            id="t-auto"
            label="Merge automatically at"
            value={thresholds.auto}
            min={50}
            max={100}
            suffix="%"
            onChange={(v) => setThresholds((t) => ({ auto: v, review: Math.min(t.review, v) }))}
          />
          <Slider
            id="t-review"
            label="Send to data stewards from"
            value={thresholds.review}
            min={40}
            max={100}
            suffix="%"
            onChange={(v) => setThresholds((t) => ({ review: v, auto: Math.max(t.auto, v) }))}
          />
          <p className="text-sm leading-relaxed text-muted">
            Try lowering the merge threshold to 80% — and watch two different people become one.
          </p>
        </div>
        <div className="space-y-5">
          <p className="text-xs font-medium uppercase tracking-widest text-accent">Survivorship rules</p>
          <Choice
            legend="Name comes from"
            name="rule-name"
            value={rules.name}
            options={[
              { value: "most-complete", label: "Most complete" },
              { value: "most-trusted", label: "Most trusted source" },
            ]}
            onChange={(v) => setRules((r) => ({ ...r, name: v }))}
          />
          <Choice
            legend="Address comes from"
            name="rule-address"
            value={rules.address}
            options={[
              { value: "most-recent", label: "Most recent" },
              { value: "most-trusted", label: "Most trusted source" },
            ]}
            onChange={(v) => setRules((r) => ({ ...r, address: v }))}
          />
          <p className="text-sm text-muted">Trust order: Policy, then Claims, then Marketing. Date of birth and email always come from the most trusted source.</p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:border-foreground"
          >
            Reset to defaults
          </button>
        </div>
      </div>

      {/* Step 1: source records */}
      <StepHeading n="01" title="Messy source data" body="Ten records from three systems. Spot the spelling variants, date formats and abbreviations." />
      <div className="overflow-x-auto rounded-3xl border border-border bg-surface">
        <table className="w-full min-w-[46rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-muted">
            <tr className="border-b border-border">
              {["Record", "Name", "Date of birth", "Address", "Email", "Updated"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.records.map((r) => (
              <tr key={r.id} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3">
                  <span className="mr-2 font-mono text-muted">{r.id}</span>
                  <SourceChip source={r.source} />
                </td>
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 font-mono text-foreground/80">{r.dob}</td>
                <td className="px-4 py-3 text-foreground/80">{r.address}</td>
                <td className="px-4 py-3 text-foreground/80">{r.email || <span className="text-muted">—</span>}</td>
                <td className="px-4 py-3 font-mono text-muted">{r.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Step 2: matching */}
      <StepHeading
        n="02"
        title="Matching"
        body="Every pair of records is compared field by field. Fields missing on either side don't count. Shown: pairs scoring 40% or more."
      />
      <ul className="space-y-3">
        {result.pairs.map((p) => {
          const d = decisionStyles[p.decision];
          return (
            <li key={p.a.id + p.b.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-medium">
                  <span className="font-mono text-muted">{p.a.id}</span> {p.a.name}
                  <span className="mx-2 text-muted" aria-hidden>
                    ↔
                  </span>
                  <span className="font-mono text-muted">{p.b.id}</span> {p.b.name}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold">{p.score}%</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${d.className}`}>{d.label}</span>
                </div>
              </div>
              <div className="relative mt-3 h-2 rounded-full bg-border" aria-hidden>
                <div className="h-2 rounded-full bg-gradient-to-r from-accent-2 to-accent" style={{ width: `${p.score}%` }} />
                <span className="absolute -top-1 h-4 w-0.5 bg-amber-300" style={{ left: `${thresholds.review}%` }} />
                <span className="absolute -top-1 h-4 w-0.5 bg-accent" style={{ left: `${thresholds.auto}%` }} />
              </div>
              <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
                {(Object.keys(fieldLabels) as Field[]).map((f) => (
                  <div key={f} className="flex gap-1">
                    <dt>{fieldLabels[f]}</dt>
                    <dd className="font-semibold text-foreground/85">
                      {p.scores[f] === null ? "—" : `${Math.round(p.scores[f]! * 100)}%`}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>

      {/* Step 3: golden records */}
      <StepHeading
        n="03"
        title="Golden records"
        body="Automatically matched records merge into one trusted customer. Each field shows the source that won under your survivorship rules; addresses are standardised."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.golden.map((g) => (
          <li key={g.id} className="rounded-2xl border border-border bg-surface p-5">
            <p className="font-display text-xl font-bold">{g.values.name.value}</p>
            <p className="mt-1 font-mono text-xs text-muted">from {g.members.map((m) => m.id).join(" + ")}</p>
            <dl className="mt-4 space-y-2 text-sm">
              {(
                [
                  ["Name", g.values.name.value, g.values.name.from],
                  ["Born", formatDob(g.values.dob.value), g.values.dob.from],
                  ["Address", standardiseAddress(g.values.address.value), g.values.address.from],
                  ["Email", g.values.email.value || "—", g.values.email.from],
                ] as const
              ).map(([k, v, from]) => (
                <div key={k} className="flex items-start gap-3">
                  <dt className="w-16 shrink-0 text-muted">{k}</dt>
                  {/* The source chip lives inside the <dd>: a <dl> row may only hold <dt> and <dd>. */}
                  <dd className="flex min-w-0 flex-1 items-start justify-between gap-3 text-foreground/90">
                    <span className="min-w-0 [overflow-wrap:anywhere]">{v}</span>
                    <SourceChip source={from} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* Step 4: households */}
      <StepHeading
        n="04"
        title="Households"
        body="Customers sharing an address — same house number and postcode — are grouped into a household."
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {result.households.map((h) => (
          <li key={h.key} className="rounded-2xl border border-accent-2/40 bg-accent-2/[0.07] p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-[#c5b8ff]">
              {h.members.length > 1 ? `Household of ${h.members.length}` : "Single household"}
            </p>
            <p className="mt-2 text-sm text-muted">{standardiseAddress(h.members[0].values.address.value)}</p>
            <ul className="mt-3 space-y-1">
              {h.members.map((m) => (
                <li key={m.id} className="font-medium">
                  {m.values.name.value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
