import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import LabShowcase from "@/components/LabShowcase";
import Reveal from "@/components/Reveal";
import { formatDate, readingTime, visibleArticles } from "@/data/insights";
import { leadershipMoments } from "@/data/leadershipMoments";

export const metadata: Metadata = {
  title: "Case studies & insights",
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
              Case studies &amp; insights
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

      {/* From the lab: interactive, hands-on demos (shared with /lab) */}
      <LabShowcase />

      {/* Leadership stories live on their own page; point here too, since people look for them under Insights. */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <h2 className="type-heading">Leadership moments</h2>
        <p className="mt-2 max-w-2xl text-muted">Real situations, told from both sides — and what each one taught me.</p>
        <Reveal className="mt-8">
          <Link
            href="/leadership#moments"
            className="group flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {leadershipMoments.map((m) => (
                <li key={m.id}>
                  <span className="type-eyebrow block text-accent">{m.theme}</span>
                  <span className="font-display text-xl font-bold tracking-tight">{m.title}</span>
                </li>
              ))}
            </ul>
            <span className="shrink-0 font-semibold text-accent group-hover:underline">
              Read my leadership stories →
            </span>
          </Link>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
