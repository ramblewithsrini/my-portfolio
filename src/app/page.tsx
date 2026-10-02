import Link from "next/link";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  buildLog,
  glance,
  intro,
  journey,
  now,
  philosophy,
  principles,
  why,
} from "@/data/about";
import { relationshipLabels, testimonials } from "@/data/testimonials";

const teaser = testimonials.find((t) => t.teaser && !t.hidden);
const testimonialCount = testimonials.filter((t) => !t.hidden).length;

export default function AboutPage() {
  return (
    <main id="top" className="overflow-x-clip">
      {/* Intro */}
      <section className="relative flex min-h-svh items-center pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-accent-2/30 blur-[120px]"
          aria-hidden
        />
        <div
          className="animate-float absolute bottom-0 left-[-10%] -z-10 h-[22rem] w-[22rem] rounded-full bg-accent/20 blur-[120px] [animation-delay:-6s]"
          aria-hidden
        />

        <div className="mx-auto grid w-full max-w-6xl items-end gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_20rem]">
          <div>
            <Reveal intro>
              <p className="mb-6 font-display text-sm font-medium uppercase tracking-widest text-accent">
                {intro.eyebrow}
              </p>
            </Reveal>
            <Reveal intro delay={100}>
              <h1 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-bold tracking-tighter">
                {intro.title}
                <br />
                <span className="text-gradient">{intro.titleAccent}</span>
              </h1>
            </Reveal>
            <Reveal intro delay={200}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
                {intro.lead}
              </p>
            </Reveal>
            <Reveal intro delay={300} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/experience"
                className="rounded-full bg-accent px-7 py-3.5 font-semibold text-background transition-transform hover:scale-105"
              >
                See my experience
              </Link>
              <a
                href="#why"
                className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-foreground"
              >
                Why I built this
              </a>
            </Reveal>
          </div>

          <Reveal intro delay={400}>
            <dl className="rounded-3xl border border-border bg-surface/70 p-7 backdrop-blur">
              <p className="mb-5 font-display text-sm font-medium uppercase tracking-widest text-muted">
                At a glance
              </p>
              {glance.map((g) => (
                <div
                  key={g.label}
                  className="border-t border-border py-3 first-of-type:border-t-0 first-of-type:pt-0"
                >
                  <dt className="text-xs text-muted">{g.label}</dt>
                  <dd className="mt-0.5 font-medium">{g.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="01" title={philosophy.title} />
        <Reveal>
          <p className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.02] font-bold tracking-tighter">
            {philosophy.headline[0]}
            <br />
            <span className="text-gradient">{philosophy.headline[1]}</span>
          </p>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-8 inline-block rounded-full border border-border bg-surface px-5 py-2 font-display text-lg font-medium text-foreground/90">
            {philosophy.mantra}
          </p>
        </Reveal>
        <ol className="mt-16 grid gap-6 md:grid-cols-3">
          {philosophy.pillars.map((p, i) => (
            <li key={p.word}>
              <Reveal
                delay={i * 120}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-colors hover:border-accent/50"
              >
                <span
                  className="absolute -right-4 -top-6 font-display text-[8rem] leading-none font-bold text-white/[0.03] transition-colors group-hover:text-accent/10"
                  aria-hidden
                >
                  {i + 1}
                </span>
                <h3 className="font-display text-4xl font-bold tracking-tight">
                  {p.word}{" "}
                  <span className="text-accent">{p.qualifier}.</span>
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{p.body}</p>
                <p className="mt-6 border-t border-border pt-4 text-sm text-foreground/80">
                  <span className="mr-2 text-accent-2">▸</span>
                  {p.evidence}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
        {teaser && (
          <Reveal className="mt-6">
            <figure className="relative overflow-hidden rounded-3xl border border-border bg-surface p-8 sm:p-12">
              <span
                className="absolute -left-2 -top-10 font-display text-[12rem] leading-none text-accent/10"
                aria-hidden
              >
                “
              </span>
              <blockquote className="relative max-w-4xl font-display text-2xl leading-snug font-medium sm:text-3xl">
                {teaser.teaser}
              </blockquote>
              <figcaption className="relative mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-medium">{teaser.title}</p>
                  <p className="text-sm text-muted">
                    {teaser.company} · {relationshipLabels[teaser.relationship]}
                  </p>
                </div>
                <Link
                  href="/testimonials"
                  className="font-semibold text-accent hover:underline"
                >
                  Read all {testimonialCount} recommendations →
                </Link>
              </figcaption>
            </figure>
          </Reveal>
        )}
      </section>

      {/* Now */}
      <section className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="02" title={now.title} />
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <Reveal className="space-y-6 text-lg leading-relaxed text-foreground/85 sm:text-xl">
            {now.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={150}>
            <div className="h-full rounded-3xl border border-accent/40 bg-accent/[0.06] p-8">
              <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                What I&apos;m looking for
              </p>
              <p className="mt-4 text-lg leading-relaxed">{now.lookingFor}</p>
              <a
                href="#contact"
                className="mt-6 inline-block font-semibold text-accent hover:underline"
              >
                Start a conversation →
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="03" title="Why I built this" />
        <div className="grid gap-6 md:grid-cols-2">
          {why.map((w, i) => (
            <Reveal key={w.title} delay={i * 100}>
              <article className="h-full rounded-3xl border border-border bg-surface p-8 sm:p-10">
                <span className="font-display text-5xl font-bold text-accent-2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight">
                  {w.title}
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{w.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="04" title="What 25 years taught me" />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80} className="bg-background">
              <div className="h-full p-8 transition-colors hover:bg-surface">
                <span className="font-display text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="05" title="The journey" />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-7 lg:gap-0">
          {journey.map((j, i) => {
            const isNext = i === journey.length - 1;
            return (
              <li key={j.year} className="relative lg:pr-4">
                <Reveal delay={i * 60}>
                  <div className="mb-4 hidden items-center lg:flex" aria-hidden>
                    <span
                      className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                        isNext ? "border-accent bg-accent" : "border-accent bg-background"
                      }`}
                    />
                    {!isNext && <span className="h-px flex-1 bg-border" />}
                  </div>
                  <p
                    className={`font-display text-3xl font-bold ${
                      isNext ? "text-gradient" : ""
                    }`}
                  >
                    {j.year}
                  </p>
                  <p className="mt-1 font-semibold text-accent">{j.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{j.theme}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Build log */}
      <section className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="06" title={buildLog.title} />
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <Reveal>
            <p className="text-xl leading-relaxed text-foreground/85">{buildLog.lead}</p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {buildLog.stack.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-border px-3 py-1 text-sm text-muted"
                >
                  {t}
                </li>
              ))}
            </ul>
            <blockquote className="mt-10 border-l-2 border-accent pl-6 font-display text-xl leading-snug font-medium">
              {buildLog.takeaway}
            </blockquote>
          </Reveal>
          <ol className="space-y-4">
            {buildLog.steps.map((s, i) => (
              <li key={s.step}>
                <Reveal
                  delay={i * 80}
                  className="flex gap-5 rounded-2xl border border-border bg-surface p-6"
                >
                  <span className="font-display text-sm font-medium text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{s.step}</h3>
                    <p className="mt-1 text-muted">{s.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Contact />
    </main>
  );
}
