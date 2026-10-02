import Link from "next/link";
import { experience } from "@/data/portfolio";
import { formatDuration, formatDurationShort, toMonths } from "@/lib/career";

// Axis runs from the start of the first role's year to the end of the last.
const firstYear = Math.min(...experience.map((j) => Number(j.startDate.slice(0, 4))));
const lastYear = Math.max(...experience.map((j) => Number(j.endDate.slice(0, 4))));
const axisStart = firstYear * 12;
const axisSpan = (lastYear + 1) * 12 - axisStart;
const pct = (date: string) => ((toMonths(date) - axisStart) / axisSpan) * 100;
const ticks = Array.from({ length: lastYear - firstYear + 2 }, (_, i) => firstYear + i).filter(
  (y) => y % 5 === 0 || y === firstYear,
);

const typeStyles = {
  "in-house": "border-accent/60 bg-accent/15 hover:bg-accent/30 text-accent",
  consulting: "border-accent-2/60 bg-accent-2/20 hover:bg-accent-2/35 text-[#c5b8ff]",
};

export default function CareerTimeline() {
  const chronological = [...experience].reverse();

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-5 text-sm text-muted">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm border border-accent/60 bg-accent/15" /> In-house
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm border border-accent-2/60 bg-accent-2/20" /> Consulting
        </span>
      </div>

      {/* Desktop: proportional horizontal timeline */}
      <div className="hidden md:block">
        <ol className="relative h-24">
          {chronological.map((j) => {
            const left = pct(j.startDate);
            const width = pct(j.endDate) - left + 100 / axisSpan;
            return (
              <li
                key={j.slug}
                className="absolute inset-y-0"
                style={{ left: `${left}%`, width: `calc(${width}% - 4px)` }}
              >
                <Link
                  href={`/experience/${j.slug}`}
                  title={`${j.role} · ${j.company} · ${j.start} – ${j.end}`}
                  className={`group flex h-full flex-col justify-between overflow-hidden rounded-xl border p-2.5 transition-colors ${typeStyles[j.type]}`}
                >
                  <span className="font-display text-sm leading-tight font-bold">{j.short}</span>
                  <span className="text-xs text-foreground/70">{formatDurationShort(j)}</span>
                </Link>
              </li>
            );
          })}
        </ol>
        <div className="relative mt-3 h-5 border-t border-border">
          {ticks.map((y) => (
            <span
              key={y}
              className="absolute top-1 -translate-x-1/2 text-xs text-muted first:translate-x-0"
              style={{ left: `${pct(`${y}-01`)}%` }}
            >
              {y}
            </span>
          ))}
        </div>
      </div>

      {/* Mobile: compact list, newest first */}
      <ol className="space-y-2 md:hidden">
        {experience.map((j) => (
          <li key={j.slug}>
            <Link
              href={`/experience/${j.slug}`}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 ${typeStyles[j.type]}`}
            >
              <span className="font-display font-bold">{j.short}</span>
              <span className="text-xs text-foreground/70">
                {j.start.slice(-4)}–{j.end.slice(-4)} · {formatDuration(j)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
