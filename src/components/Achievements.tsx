"use client";

import { useState } from "react";
import Link from "next/link";
import {
  achievements,
  lensLabels,
  lensStats,
  lensSummaries,
  type Lens,
} from "@/data/achievements";

type Filter = "all" | Lens;

const lenses = Object.keys(lensLabels) as Lens[];

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  ...lenses.map((k) => ({ key: k, label: lensLabels[k] })),
];

// One lens: its name, what it covers, and its headline numbers.
function LensBand({ lens }: { lens: Lens }) {
  return (
    <div>
      <div className="border-l-4 border-accent pl-4">
        <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{lensLabels[lens]}</h3>
        <p className="mt-1 text-muted">{lensSummaries[lens]}</p>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-3">
        {lensStats[lens].map((m) => (
          <li key={m.label} className="bg-background">
            <Link
              href={m.href}
              className="group flex h-full flex-col justify-between gap-3 p-5 transition-colors hover:bg-surface sm:p-6"
            >
              <span className="text-gradient type-heading">{m.value}</span>
              <span className="flex items-end justify-between gap-2 text-sm leading-snug text-muted group-hover:text-foreground">
                {m.label}
                <span className="shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" aria-hidden>
                  →
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Achievements() {
  const [filter, setFilter] = useState<Filter>("all");
  const shownLenses = filter === "all" ? lenses : [filter];
  // Cards follow the lens order (by each card's first lens), keeping data order within a lens.
  const visible = achievements
    .filter((a) => filter === "all" || a.lenses.includes(filter))
    .map((a, i) => ({ a, i }))
    .sort((x, y) => lenses.indexOf(x.a.lenses[0]) - lenses.indexOf(y.a.lenses[0]) || x.i - y.i)
    .map(({ a }) => a);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter achievements by lens">
        {filters.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "border-accent bg-accent text-background"
                  : "border-border text-muted hover:border-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-10" aria-live="polite">
        {shownLenses.map((l) => (
          <LensBand key={l} lens={l} />
        ))}
      </div>

      <h3 className="mt-14 mb-6 font-display text-2xl font-bold tracking-tight">
        {filter === "all" ? "The stories behind the numbers" : `${lensLabels[filter]}: the stories`}
      </h3>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <li key={a.title}>
            <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 sm:p-7">
              <ul className="flex flex-wrap gap-1.5" aria-label="Lenses">
                {a.lenses.map((l) => (
                  <li
                    key={l}
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      l === filter ? "border-accent text-accent" : "border-border text-muted"
                    }`}
                  >
                    {lensLabels[l]}
                  </li>
                ))}
              </ul>
              <h4 className="mt-4 font-display text-xl font-bold leading-snug tracking-tight">
                {a.title}
              </h4>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{a.outcome}</p>
              <Link
                href={a.href}
                className="group mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-accent"
              >
                {a.linkLabel}
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
