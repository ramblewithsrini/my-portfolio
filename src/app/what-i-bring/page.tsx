import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/portfolio";
import { roleValues, valueIntro } from "@/data/value";
import { attributeQuote } from "@/lib/career";

export const metadata: Metadata = {
  title: "How I can help",
  description:
    "How I can help as an architect, Head of Data & AI, Head of Engineering & Architecture, and in pre-sales and client engagement.",
};

const roles = roleValues.map((r) => ({
  ...r,
  attributed: attributeQuote(r.quote),
  studies: r.caseStudies.map((slug) => {
    const job = experience.find((j) => j.slug === slug);
    if (!job) throw new Error(`Unknown case study slug "${slug}" in value.ts`);
    return job;
  }),
}));

export default function WhatIBringPage() {
  return (
    <main id="top" className="overflow-x-clip">
      {/* Intro */}
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-accent-2/30 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
          <Reveal intro>
            <p className="type-eyebrow mb-6 text-accent">
              {valueIntro.eyebrow}
            </p>
          </Reveal>
          <Reveal intro delay={100}>
            <h1 className="type-display">
              {valueIntro.title}
              <br />
              <span className="text-gradient">{valueIntro.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal intro delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {valueIntro.lead}
            </p>
          </Reveal>
          <Reveal intro delay={300}>
            <nav aria-label="Roles" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {roles.map((r, i) => (
                <a
                  key={r.id}
                  href={`#${r.id}`}
                  className="group flex flex-col rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur transition-colors hover:border-accent"
                >
                  <span className="font-display text-sm text-accent-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block flex-1 font-display text-lg leading-tight font-bold group-hover:text-accent">
                    {r.label}
                  </span>
                  {/* A focus line, not a number: the results are in each section below. */}
                  <span className="mt-5 block border-t border-border pt-4 text-sm leading-snug text-muted group-hover:text-foreground">
                    {r.focus}
                  </span>
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {roles.map((r, i) => (
        <section
          key={r.id}
          id={r.id}
          className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 sm:px-8"
        >
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-display text-sm font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="type-eyebrow text-muted">
                For {r.title} roles
              </p>
            </div>
            <h2 className="mt-4 max-w-4xl type-title">
              {r.headline}
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85 sm:text-xl">
              {r.intro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-[3fr_2fr]">
            <Reveal className="h-full">
              <div className="h-full rounded-3xl border border-border bg-surface p-8">
                <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
                  {r.valueTitle}
                </h3>
                <ul className="mt-5 space-y-4">
                  {r.value.map((v) => (
                    <li key={v} className="flex gap-3 text-lg leading-snug">
                      <span className="mt-2.5 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <dl className="grid h-full gap-4 rounded-3xl border border-accent-2/40 bg-accent-2/[0.07] p-8">
                {r.evidence.map((e) => (
                  <div key={e.label} className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm text-muted">{e.label}</dt>
                    <dd className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                      {e.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {r.panel && (
            <Reveal className="mt-6">
              <div className="rounded-3xl border border-accent-2/40 bg-gradient-to-br from-accent-2/[0.08] via-surface to-surface p-8 sm:p-10">
                <p className="type-eyebrow text-[#c5b8ff]">
                  {r.panel.eyebrow}
                </p>
                <h3 className="mt-3 type-heading">
                  {r.panel.title}
                </h3>
                <p className="mt-3 max-w-3xl text-lg leading-relaxed text-muted">{r.panel.lead}</p>
                <ol
                  className={`mt-8 grid gap-4 sm:grid-cols-2 ${
                    r.panel.items.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"
                  }`}
                >
                  {r.panel.items.map((it, j) => (
                    <li
                      key={it.title}
                      className="flex flex-col rounded-2xl border border-border bg-background/60 p-5"
                    >
                      <span className="font-display text-sm text-accent-2">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <h4 className="mt-1 font-display text-lg leading-tight font-bold">{it.title}</h4>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{it.body}</p>
                      <p className="mt-4 border-t border-border pt-3 text-xs leading-relaxed text-foreground/80">
                        <span className="mr-1 text-accent">▸</span>
                        {it.example}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_3fr]">
            <Reveal className="h-full">
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-border p-8">
                <blockquote className="font-display text-xl leading-snug font-medium">
                  “{r.attributed.excerpt}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted">
                  {r.attributed.title}, {r.attributed.company} · {r.attributed.relationship}
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120} className="h-full">
              <div className="h-full rounded-3xl border border-accent/40 bg-accent/[0.05] p-8">
                <p className="type-eyebrow text-accent">
                  My first 90 days
                </p>
                <ol className="mt-5 grid gap-5 sm:grid-cols-3">
                  {r.first90.map((s, j) => (
                    <li key={s.step}>
                      <span className="font-display text-sm text-muted">
                        {j * 30}–{(j + 1) * 30} days
                      </span>
                      <h3 className="mt-1 font-display text-lg font-bold">{s.step}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
              <p className="type-eyebrow text-muted">
                See it in practice
              </p>
              <ul className="flex flex-wrap gap-2">
                {r.studies.map((j) => (
                  <li key={j.slug}>
                    <Link
                      href={`/experience/${j.slug}`}
                      className="inline-block rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
                    >
                      {j.short} case study →
                    </Link>
                  </li>
                ))}
                {r.moreLink && (
                  <li>
                    <Link
                      href={r.moreLink.href}
                      className="inline-block rounded-full border border-accent/50 px-4 py-2 text-sm font-medium text-accent transition-colors hover:border-accent"
                    >
                      {r.moreLink.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </Reveal>
        </section>
      ))}

      <Contact />
    </main>
  );
}
