import Link from "next/link";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  altitude,
  beyondWork,
  buildLog,
  consulting,
  glance,
  intro,
  journey,
  now,
  philosophy,
  principles,
  progression,
  uniqueness,
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
              <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-tighter">
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

      {/* Uniqueness */}
      <section id="different" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="01" title={uniqueness.title} />
        <Reveal>
          <p className="max-w-5xl font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] font-bold tracking-tighter">
            {uniqueness.headline}{" "}
            <span className="text-gradient">{uniqueness.headlineAccent}</span>
          </p>
        </Reveal>

        {/* The formula: three pillars joined by "+", then "=" the result */}
        <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {uniqueness.pillars.flatMap((p, i) => [
            <Reveal key={p.title} delay={i * 120} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7">
                <p className="text-xs font-medium uppercase tracking-widest text-accent">
                  {p.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">{p.body}</p>
                <p className="mt-5 border-t border-border pt-4 text-sm text-foreground/80">
                  <span className="mr-2 text-accent-2">▸</span>
                  {p.proof}
                </p>
              </article>
            </Reveal>,
            i < uniqueness.pillars.length - 1 && (
              <span
                key={`${p.title}-plus`}
                className="flex items-center justify-center font-display text-4xl font-bold text-accent-2"
                aria-hidden
              >
                +
              </span>
            ),
          ])}
        </div>
        <div className="mt-4 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          <span
            className="flex items-center justify-center font-display text-4xl font-bold text-accent lg:w-10"
            aria-hidden
          >
            =
          </span>
          <Reveal className="flex-1">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent-2 via-[#4b3bd6] to-[#1b1640] p-8 sm:p-10">
              <div className="grid-bg absolute inset-0" aria-hidden />
              <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {uniqueness.result.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-white/80">
                    {uniqueness.result.body}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                  {uniqueness.result.rooms.map((r) => (
                    <li
                      key={r}
                      className="rounded-full bg-accent px-3 py-1 text-sm font-semibold text-background"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Both worlds */}
        <Reveal className="mt-24">
          <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {uniqueness.bothWorlds.title}
          </h3>
          <p className="mt-3 max-w-2xl text-lg text-muted">{uniqueness.bothWorlds.lead}</p>
        </Reveal>
        <div className="relative mt-10 grid gap-6 md:grid-cols-2">
          <span
            className="absolute left-1/2 top-1/2 z-10 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background font-display text-xl text-accent md:flex"
            aria-hidden
          >
            ⇄
          </span>
          {uniqueness.bothWorlds.sides.map((side, i) => (
            <Reveal key={side.label} delay={i * 120} className="h-full">
              <div
                className={`h-full rounded-3xl border p-8 sm:p-10 ${
                  i === 0
                    ? "border-accent-2/40 bg-accent-2/[0.07]"
                    : "border-accent/40 bg-accent/[0.06]"
                }`}
              >
                <p
                  className={`text-xs font-medium uppercase tracking-widest ${
                    i === 0 ? "text-[#c5b8ff]" : "text-accent"
                  }`}
                >
                  {side.label}
                </p>
                <h4 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {side.title}
                </h4>
                <p className="mt-3 leading-relaxed text-foreground/85">{side.body}</p>
                <ul className="mt-6 space-y-3">
                  {side.points.map((pt) => (
                    <li key={pt} className="flex gap-3 leading-snug">
                      <span
                        className={`mt-2 h-1 w-3 shrink-0 ${i === 0 ? "bg-accent-2" : "bg-accent"}`}
                        aria-hidden
                      />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Progression */}
      <section id="progression" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="02" title={progression.title} />
        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed text-foreground/85 sm:text-2xl">
            {progression.lead}
          </p>
        </Reveal>

        {/* Three stages, rising in altitude */}
        <ol className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-end">
          {progression.stages.map((st, i) => {
            // Stages are listed most recent first; level 0 = developer (sea level).
            const level = progression.stages.length - 1 - i;
            return (
            <li key={st.role} className={level === 1 ? "lg:mb-10" : level === 2 ? "lg:mb-20" : ""}>
              <Reveal
                delay={i * 120}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent to-accent-2"
                  style={{ opacity: 0.35 + level * 0.3 }}
                  aria-hidden
                />
                <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-widest">
                  <span className="text-accent">{st.altitude}</span>
                  <span className="text-muted">{st.era}</span>
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="mr-3 text-accent-2">{String(level + 1).padStart(2, "0")}</span>
                  {st.role}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{st.body}</p>
                <p className="mt-6 border-t border-border pt-4 font-medium">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-muted">
                    Strength carried forward
                  </span>
                  {st.strength}
                </p>
              </Reveal>
            </li>
            );
          })}
        </ol>

        {/* Sea level vs 30,000 feet */}
        <Reveal className="mt-24">
          <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {altitude.title}
          </h3>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {[altitude.seaLevel, altitude.highLevel].map((side, i) => (
            <Reveal key={side.label} delay={i * 120}>
              <div
                className={`h-full rounded-3xl border p-8 ${
                  i === 0
                    ? "border-[#5fe3c0]/30 bg-[#5fe3c0]/[0.04]"
                    : "border-accent-2/40 bg-accent-2/[0.07]"
                }`}
              >
                <p
                  className={`font-display text-sm font-medium uppercase tracking-widest ${
                    i === 0 ? "text-[#5fe3c0]" : "text-[#b3a3ff]"
                  }`}
                >
                  {i === 0 ? "▼" : "▲"} {side.label}
                </p>
                <ul className="mt-6 space-y-4">
                  {side.items.map((it) => (
                    <li key={it} className="flex gap-3 text-lg leading-snug">
                      <span
                        className={`mt-2.5 h-1 w-3 shrink-0 ${i === 0 ? "bg-[#5fe3c0]" : "bg-accent-2"}`}
                        aria-hidden
                      />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <p className="rounded-3xl border border-accent/40 bg-accent/[0.06] p-8 font-display text-xl leading-snug font-medium sm:text-2xl">
            {altitude.bridge}
          </p>
        </Reveal>

        {/* Consulting & pre-sales */}
        <Reveal className="mt-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-8 sm:p-12">
            <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
            <div className="relative grid gap-10 lg:grid-cols-[3fr_2fr]">
              <div>
                <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  {consulting.title}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-foreground/85">
                  {consulting.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {consulting.capabilities.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-sm text-foreground/85"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="grid gap-6 self-start sm:grid-cols-3 lg:grid-cols-1">
                {consulting.stats.map((st) => (
                  <div key={st.label} className="lg:border-l-2 lg:border-accent lg:pl-5">
                    <dt className="sr-only">{st.label}</dt>
                    <dd className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                      {st.value}
                    </dd>
                    <dd className="mt-1 text-sm text-muted">{st.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="relative mt-10 border-t border-border pt-6 text-sm text-muted">
              <span className="mr-3 font-medium uppercase tracking-widest text-foreground/70">
                Clients advised
              </span>
              {consulting.clients.join("  ·  ")}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Philosophy */}
      <section id="philosophy" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="03" title={philosophy.title} />
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
        <SectionHeading index="04" title={now.title} />
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
              <p className="mt-4 text-lg leading-relaxed">{now.lookingFor.summary}</p>
              <div className="mt-6 space-y-5">
                {now.lookingFor.tracks.map((t) => (
                  <div key={t.label}>
                    <p className="text-xs font-medium uppercase tracking-widest text-muted">
                      {t.label}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {t.roles.map((r) => (
                        <li
                          key={r}
                          className="rounded-full border border-accent/40 bg-background/60 px-3 py-1 text-sm font-medium"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-accent/20 pt-4 text-sm text-muted">
                {now.lookingFor.focus}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                <Link
                  href="/what-i-bring"
                  className="font-semibold text-accent hover:underline"
                >
                  The value I bring to each role →
                </Link>
                <a href="#contact" className="font-semibold text-foreground/80 hover:underline">
                  Start a conversation →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="05" title="Why I built this" />
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
        <SectionHeading index="06" title="What 25 years taught me" />
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
        <SectionHeading index="07" title="The journey" />
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
        <SectionHeading index="08" title={buildLog.title} />
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

      {/* Beyond work */}
      <section id="beyond-work" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="09" title={beyondWork.title} />
        <Reveal>
          <p className="max-w-3xl text-xl leading-relaxed text-foreground/85 sm:text-2xl">
            {beyondWork.lead}
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beyondWork.items.map((it, i) => (
            <Reveal
              key={it.title}
              delay={(i % 3) * 100}
              className={it.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
            >
              <article
                className={`flex h-full flex-col rounded-3xl border p-8 ${
                  it.featured
                    ? "border-accent/40 bg-gradient-to-br from-accent/[0.12] via-surface to-accent-2/[0.12] lg:justify-end"
                    : "border-border bg-surface"
                }`}
              >
                <p className="text-xs font-medium uppercase tracking-widest text-accent">
                  {it.eyebrow}
                </p>
                <h3
                  className={`mt-3 font-display font-bold tracking-tight ${
                    it.featured ? "text-4xl sm:text-5xl" : "text-2xl"
                  }`}
                >
                  {it.title}
                </h3>
                <p className={`mt-3 leading-relaxed text-muted ${it.featured ? "text-lg" : ""}`}>
                  {it.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-border p-8 sm:flex-row sm:items-center sm:gap-10 sm:p-10">
            <p className="text-gradient shrink-0 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {beyondWork.closing.title}
            </p>
            <p className="text-lg leading-relaxed text-foreground/85">
              {beyondWork.closing.body}
            </p>
          </div>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
