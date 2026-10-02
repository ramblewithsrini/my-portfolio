"use client";

import { useState } from "react";
import {
  relationshipLabels,
  type Relationship,
  type Testimonial,
} from "@/data/testimonials";

const filters: { key: Relationship | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "managed", label: "Managed Srini" },
  { key: "reported", label: "Reported to Srini" },
  { key: "worked", label: "Worked with Srini" },
];

const badgeStyles: Record<Relationship, string> = {
  managed: "border-accent-2/50 text-[#b3a3ff]",
  reported: "border-accent/50 text-accent",
  worked: "border-[#5fe3c0]/50 text-[#5fe3c0]",
};

// Long recommendations start collapsed so the wall stays scannable.
const isLong = (t: Testimonial) => t.paragraphs.join(" ").length > 650;

export default function TestimonialWall({ items }: { items: Testimonial[] }) {
  const [filter, setFilter] = useState<Relationship | "all">("all");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const visible = items
    .map((t, i) => ({ t, i }))
    .filter(({ t }) => filter === "all" || t.relationship === filter);

  const toggle = (i: number) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter by relationship">
        {filters.map((f) => {
          const count =
            f.key === "all"
              ? items.length
              : items.filter((t) => t.relationship === f.key).length;
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
              {f.label} <span className="opacity-80">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
        {visible.map(({ t, i }) => {
          const long = isLong(t);
          const open = expanded.has(i);
          return (
            <figure
              key={i}
              className="mb-6 break-inside-avoid rounded-3xl border border-border bg-surface p-7"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeStyles[t.relationship]}`}
                >
                  {relationshipLabels[t.relationship]}
                </span>
                <span className="text-xs text-muted">{t.date.slice(0, 4)}</span>
              </div>

              <blockquote
                className={`relative mt-5 space-y-3 leading-relaxed text-foreground/85 ${
                  long && !open ? "max-h-72 overflow-hidden" : ""
                }`}
              >
                {t.paragraphs.map((p, j) => (
                  <p key={j}>
                    {j === 0 && <span className="text-accent">“</span>}
                    {p}
                    {j === t.paragraphs.length - 1 && <span className="text-accent">”</span>}
                  </p>
                ))}
                {long && !open && (
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface to-transparent"
                    aria-hidden
                  />
                )}
              </blockquote>
              {long && (
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={open}
                  className="mt-3 text-sm font-semibold text-accent hover:underline"
                >
                  {open ? "Show less" : "Read more"}
                </button>
              )}

              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-medium">{t.title}</p>
                <p className="text-sm text-muted">{t.company}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </>
  );
}
