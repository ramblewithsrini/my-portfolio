import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { formatDate, readingTime, visibleArticles } from "@/data/insights";
import { labIntro, mdmLabPublished } from "@/data/mdmLab";

export const metadata: Metadata = {
  title: "Insights",
  description: "Lessons from 25 years in architecture, engineering, data and AI leadership.",
};

export default function InsightsPage() {
  return (
    <main id="top" className="overflow-x-clip">
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-accent-2/30 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
          <Reveal intro>
            <p className="type-eyebrow mb-6 text-accent">
              Insights
            </p>
          </Reveal>
          <Reveal intro delay={100}>
            <h1 className="type-display">
              Lessons from
              <br />
              <span className="text-gradient">the work itself.</span>
            </h1>
          </Reveal>
          <Reveal intro delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Short, practical pieces on architecture, data, AI and leadership — drawn from
              real programmes, with the numbers left in.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        {visibleArticles.length === 0 ? (
          <p className="rounded-3xl border border-border bg-surface p-8 text-lg text-muted">
            The first articles are on their way.
          </p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2">
            {visibleArticles.map((a) => (
              <li key={a.slug}>
                <Reveal className="h-full">
                  <Link
                    href={`/insights/${a.slug}`}
                    className="group flex h-full flex-col rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent/50"
                  >
                    <p className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      {a.status === "draft" && (
                        <span className="rounded-full border border-yellow-400/50 px-2.5 py-0.5 text-xs font-semibold text-yellow-300">
                          Draft — local only
                        </span>
                      )}
                      <span>{formatDate(a.date)}</span>
                      <span aria-hidden>·</span>
                      <span>{readingTime(a)} min read</span>
                    </p>
                    <h2 className="mt-4 font-display text-3xl leading-tight font-bold tracking-tight group-hover:text-accent">
                      {a.title}
                    </h2>
                    <p className="mt-3 flex-1 leading-relaxed text-muted">{a.dek}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {a.tags.map((t) => (
                        <li key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* From the lab: interactive, hands-on demos */}
      {mdmLabPublished && (
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <h2 className="type-heading">From the lab</h2>
          <p className="mt-2 max-w-2xl text-muted">Hands-on, interactive demos — try them in your browser.</p>
          <Reveal className="mt-8">
            <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.07] via-surface to-accent-2/[0.07] p-8 sm:p-10">
              <p className="type-eyebrow text-accent">{labIntro.eyebrow}</p>
              <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
                {labIntro.title} <span className="text-gradient">{labIntro.titleAccent}</span>
              </h3>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">
                Ten messy customer records, three source systems. Watch probabilistic matching, survivorship and
                householding work live — and move the sliders to see every decision change.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/lab/mdm"
                  className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
                >
                  Try the MDM playground →
                </Link>
                <Link
                  href="/lab/mdm/two-ways"
                  className="rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:border-foreground"
                >
                  The same engine in Python →
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      <Contact />
    </main>
  );
}
