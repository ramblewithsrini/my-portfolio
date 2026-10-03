import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  decisions,
  hoodIntro,
  hoodStats,
  sourceUrl,
  stack,
  workingMethod,
} from "@/data/underTheHood";

export const metadata: Metadata = {
  title: "Under the hood",
  description:
    "The engineering decisions behind this site — built with Claude Code, documented like a production system.",
};

export default function UnderTheHoodPage() {
  return (
    <main id="top" className="overflow-x-clip">
      {/* Intro */}
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
          <Reveal intro>
            <p className="mb-6 font-display text-sm font-medium uppercase tracking-widest text-accent">
              {hoodIntro.eyebrow}
            </p>
          </Reveal>
          <Reveal intro delay={100}>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-tighter">
              {hoodIntro.title}
              <br />
              <span className="text-gradient">{hoodIntro.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal intro delay={200}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              {hoodIntro.lead}
            </p>
          </Reveal>
          <Reveal intro delay={300} className="mt-10 flex flex-wrap gap-4">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-accent px-7 py-3.5 font-semibold text-background transition-transform hover:scale-105"
            >
              Read the source on GitHub ↗
            </a>
            <a
              href="#decisions"
              className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-foreground"
            >
              See the decisions
            </a>
          </Reveal>
          <Reveal intro delay={400}>
            <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-8 lg:grid-cols-4">
              {hoodStats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-gradient font-display text-4xl font-bold">{s.value}</dd>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Working method */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal>
          <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.07] via-surface to-accent-2/[0.07] p-8 sm:p-10">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {workingMethod.title}
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-2">
              {workingMethod.points.map((p) => (
                <li key={p} className="flex gap-3 text-lg leading-snug">
                  <span className="mt-2.5 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Decisions */}
      <section id="decisions" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
        <SectionHeading title="The decisions" />
        <ol className="space-y-6">
          {decisions.map((d, i) => (
            <li key={d.title}>
              <Reveal>
                <article className="rounded-3xl border border-border bg-surface p-7 sm:p-9">
                  <p className="font-display text-sm text-accent-2">
                    Decision {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {d.title}
                  </h3>
                  <dl className="mt-6 grid gap-6 md:grid-cols-3">
                    {(
                      [
                        ["Context", d.context],
                        ["Decision", d.decision],
                        ["Consequence", d.consequence],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-xs font-medium uppercase tracking-widest text-accent">{k}</dt>
                        <dd className="mt-2 leading-relaxed text-foreground/85">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {d.code && (
                    <figure className="mt-7 overflow-hidden rounded-2xl border border-border bg-background">
                      <figcaption className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 font-mono text-xs text-muted">
                        <span>{d.code.file}</span>
                        <a
                          href={`${sourceUrl}/blob/master/${d.code.file}`}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 text-accent hover:underline"
                        >
                          View on GitHub ↗
                        </a>
                      </figcaption>
                      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                        <code className="font-mono text-foreground/90">{d.code.snippet}</code>
                      </pre>
                    </figure>
                  )}
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Stack */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <Reveal className="flex flex-col gap-6 rounded-3xl border border-border p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight">The stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
          >
            Read the source ↗
          </a>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
