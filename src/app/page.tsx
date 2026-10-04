import Image from "next/image";
import Link from "next/link";
import ChapterNav from "@/components/ChapterNav";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  beyondWork,
  builtCard,
  chapters,
  glance,
  impact,
  intro,
  now,
  philosophy,
  portrait,
  progression,
  summary,
  uniqueness,
} from "@/data/about";
import { relationshipLabels, testimonials } from "@/data/testimonials";
import { sourceUrl } from "@/data/underTheHood";

const teaser = testimonials.find((t) => t.teaser && !t.hidden);
const testimonialCount = testimonials.filter((t) => !t.hidden).length;

function ChapterHeader({ chapter }: { chapter: (typeof chapters)[number] }) {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
      <Reveal className="border-t border-border pt-10">
        <p className="type-eyebrow text-accent">
          Chapter {chapter.number}
        </p>
        <h2 className="mt-3 type-title">
          {chapter.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">{chapter.teaser}</p>
        {chapter.sections.length > 1 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {chapter.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block rounded-full border border-border px-4 py-1.5 text-sm text-foreground/85 transition-colors hover:border-accent hover:text-accent"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </header>
  );
}

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
              <p className="type-eyebrow mb-6 text-accent">
                {intro.eyebrow}
              </p>
            </Reveal>
            <Reveal intro delay={100}>
              <h1 className="type-display">
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
                href="#built"
                className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-foreground"
              >
                Why I built this
              </a>
            </Reveal>
          </div>

          <Reveal intro delay={400}>
            <div className="overflow-hidden rounded-3xl border border-border bg-surface/70 p-7 backdrop-blur">
              <div className="relative -mx-7 -mt-7 mb-6 aspect-[4/3]">
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 20rem, 100vw"
                  className="object-cover object-[50%_30%]"
                />
              </div>
              <p className="type-eyebrow mb-5 text-muted">
                At a glance
              </p>
              <dl>
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* In 30 seconds */}
      <section aria-labelledby="summary-title" className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <Reveal>
          <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.07] via-surface to-accent-2/[0.07] p-7 sm:p-10">
            <h2
              id="summary-title"
              className="type-eyebrow text-accent"
            >
              {summary.title}
            </h2>
            <ul className="mt-5 grid gap-x-10 gap-y-3 md:grid-cols-2">
              {summary.items.map((s) => (
                <li key={s.text}>
                  <a
                    href={s.href}
                    className="group flex gap-3 text-lg leading-snug hover:text-accent"
                  >
                    <span className="mt-1 text-accent transition-transform group-hover:translate-x-0.5" aria-hidden>
                      →
                    </span>
                    {s.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Impact at a glance */}
        <Reveal className="mt-6">
          <h2 className="sr-only">Impact at a glance</h2>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
            {impact.map((m) => (
              <li key={m.label} className="bg-background">
                <Link
                  href={m.href}
                  className="group flex h-full flex-col justify-between gap-3 p-5 transition-colors hover:bg-surface sm:p-6"
                >
                  <span className="text-gradient type-heading">
                    {m.value}
                  </span>
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
        </Reveal>
      </section>

      <ChapterNav chapters={chapters} />

      {/* Chapter 1 */}
      <div id={chapters[0].id} className="scroll-mt-28">
        <ChapterHeader chapter={chapters[0]} />
      {/* Uniqueness */}
      <section id="different" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8">
        <SectionHeading title={uniqueness.title} />
        <Reveal>
          <p className="max-w-5xl type-title">
            {uniqueness.headline}{" "}
            <span className="text-gradient">{uniqueness.headlineAccent}</span>
          </p>
        </Reveal>

        {/* The formula: three pillars joined by "+", then "=" the result */}
        <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {uniqueness.pillars.flatMap((p, i) => [
            <Reveal key={p.title} delay={i * 120} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-border bg-surface p-7">
                <p className="type-eyebrow text-accent">
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
                  <h3 className="type-heading">
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
      </section>

      {/* Progression */}
      <section id="progression" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8">
        <SectionHeading title={progression.title} />
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
                <div className="type-eyebrow flex items-center justify-between gap-3">
                  <span className="text-accent">{st.altitude}</span>
                  <span className="text-muted">{st.era}</span>
                </div>
                <h3 className="mt-5 type-heading">
                  <span className="mr-3 text-accent-2">{String(level + 1).padStart(2, "0")}</span>
                  {st.role}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted">{st.body}</p>
                <p className="mt-6 border-t border-border pt-4 font-medium">
                  <span className="type-eyebrow mb-1 block text-muted">
                    Strength carried forward
                  </span>
                  {st.strength}
                </p>
              </Reveal>
            </li>
            );
          })}
        </ol>
      </section>
      </div>

      {/* Chapter 2 */}
      <div id={chapters[1].id} className="scroll-mt-28">
        <ChapterHeader chapter={chapters[1]} />
      {/* Philosophy */}
      <section id="philosophy" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8">
        <SectionHeading title={philosophy.title} />
        <Reveal>
          <p className="type-title">
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

      {/* Leadership deep-dive: principles and bookshelf live on /leadership */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <Reveal>
          <Link
            href="/leadership"
            className="group flex flex-col gap-4 rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.07] via-surface to-accent-2/[0.07] p-8 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <span>
              <span className="type-eyebrow block text-accent">
                Go deeper
              </span>
              <span className="mt-2 block font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Leadership moments, the principles behind them, and the books that shaped them
              </span>
            </span>
            <span className="shrink-0 font-semibold text-accent group-hover:underline">
              Read more →
            </span>
          </Link>
        </Reveal>
      </section>
      </div>

      {/* Chapter 3 */}
      <div id={chapters[2].id} className="scroll-mt-28">
        <ChapterHeader chapter={chapters[2]} />
      {/* Now */}
      <section id="situation" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8">
        <SectionHeading title={now.title} />
        <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
          <Reveal className="space-y-6 text-lg leading-relaxed text-foreground/85 sm:text-xl">
            {now.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={150}>
            <div className="h-full rounded-3xl border border-accent/40 bg-accent/[0.06] p-8">
              <p className="type-eyebrow text-accent">
                What I&apos;m looking for
              </p>
              <p className="mt-4 text-lg leading-relaxed">{now.lookingFor.summary}</p>
              <div className="mt-6 space-y-5">
                {now.lookingFor.tracks.map((t) => (
                  <div key={t.label}>
                    <p className="type-eyebrow text-muted">
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
                  How I can help in each role →
                </Link>
                <a href="#contact" className="font-semibold text-foreground/80 hover:underline">
                  Start a conversation →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Built with Claude Code: the detail lives on /under-the-hood */}
      <section id="built" className="mx-auto max-w-6xl scroll-mt-32 px-5 pb-20 sm:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {builtCard.title}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-foreground/85">{builtCard.body}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/under-the-hood"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                See what&apos;s under the hood →
              </Link>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-foreground"
              >
                Source on GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>
      </section>
      </div>

      {/* Chapter 4 */}
      <div id={chapters[3].id} className="scroll-mt-28">
        <ChapterHeader chapter={chapters[3]} />
      {/* Beyond work */}
      <section id="beyond-work" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8">
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
                className={`flex h-full overflow-hidden rounded-3xl border ${
                  it.featured
                    ? // Portrait photo: stacked on phones, side by side on tablets, stacked again in the tall desktop card.
                      "flex-col border-accent/40 bg-gradient-to-br from-accent/[0.12] via-surface to-accent-2/[0.12] md:flex-row lg:flex-col"
                    : "flex-col border-border bg-surface"
                }`}
              >
                {it.image && (
                  <div className="relative aspect-[4/5] w-full shrink-0 md:aspect-auto md:min-h-[24rem] md:w-[42%] lg:h-[19rem] lg:min-h-0 lg:w-full">
                    <Image
                      src={it.image.src}
                      alt={it.image.alt}
                      fill
                      sizes="(min-width: 1024px) 22rem, (min-width: 768px) 20rem, 100vw"
                      className="object-cover object-[45%_30%]"
                    />
                  </div>
                )}
                <div className={`flex flex-1 flex-col p-8 ${it.featured ? "justify-end" : ""}`}>
                  <p className="type-eyebrow text-accent">
                    {it.eyebrow}
                  </p>
                  <h3
                    className={`mt-3 font-display font-bold tracking-tight ${
                      it.featured ? "text-4xl sm:text-5xl lg:text-4xl" : "text-2xl"
                    }`}
                  >
                    {it.title}
                  </h3>
                  <p className={`mt-3 leading-relaxed text-muted ${it.featured ? "text-lg lg:text-base" : ""}`}>
                    {it.body}
                  </p>
                </div>
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
      </div>

      <Contact />
    </main>
  );
}
