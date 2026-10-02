import type { Metadata } from "next";
import Link from "next/link";
import CareerTimeline from "@/components/CareerTimeline";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  education,
  experience,
  marquee,
  profile,
  projects,
  skills,
  stats,
} from "@/data/portfolio";
import { formatDuration } from "@/lib/career";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <main id="top" className="overflow-x-clip">
      {/* Hero */}
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

        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8">
          <Reveal intro>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </p>
          </Reveal>
          <Reveal intro delay={100}>
            <h1 className="font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9] font-bold tracking-tighter">
              {profile.name}
            </h1>
          </Reveal>
          <Reveal intro delay={200}>
            <p className="text-gradient mt-4 font-display text-[clamp(1.75rem,5vw,3.75rem)] leading-tight font-bold tracking-tight">
              {profile.headline}
            </p>
          </Reveal>
          <Reveal intro delay={300}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              {profile.tagline} {profile.bio}
            </p>
          </Reveal>
          <Reveal intro delay={400} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-accent px-7 py-3.5 font-semibold text-background transition-transform hover:scale-105"
            >
              View my work
            </a>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-foreground"
              >
                Download résumé
              </a>
            ) : (
              <a
                href="#contact"
                className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-foreground"
              >
                Get in touch
              </a>
            )}
          </Reveal>
          <Reveal intro delay={500}>
            <dl className="mt-16 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold sm:text-4xl">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Skills marquee */}
      <div
        className="-rotate-1 border-y border-border bg-accent py-4 text-background"
        aria-hidden
      >
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl font-bold uppercase">
          {[...marquee, ...marquee].map((s, i) => (
            <span key={i} className="flex items-center gap-10">
              {s} <span>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="01" title="Experience" />
        <Reveal className="mb-20">
          <CareerTimeline />
        </Reveal>
        <ol className="relative border-l border-border">
          {experience.map((job, i) => (
            <li key={job.slug} id={job.slug} className="relative mb-14 ml-8 scroll-mt-24 last:mb-0">
              <span className="absolute -left-[39.5px] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />
              <Reveal delay={i * 80}>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-sm font-medium text-muted">
                  <span>
                    {job.start} — {job.end} · {formatDuration(job)}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs ${
                      job.type === "in-house"
                        ? "border-accent/50 text-accent"
                        : "border-accent-2/50 text-[#c5b8ff]"
                    }`}
                  >
                    {job.type === "in-house" ? "In-house" : "Consulting"}
                  </span>
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  <Link href={`/experience/${job.slug}`} className="hover:text-accent">
                    {job.role}
                  </Link>
                </h3>
                <p className="mt-1 font-display text-lg font-medium text-accent">
                  {job.company}
                </p>
                <ul className="mt-4 max-w-3xl space-y-2 text-muted">
                  {job.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 shrink-0 bg-accent-2" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/experience/${job.slug}`}
                  className="mt-5 inline-block font-semibold text-accent hover:underline"
                >
                  Read the full story →
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="02" title="Selected Work" />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 100}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
                <div
                  className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent-2/0 blur-3xl transition-colors duration-500 group-hover:bg-accent-2/30"
                  aria-hidden
                />
                <span className="font-display text-sm text-muted">
                  {String(i + 1).padStart(2, "0")} · {p.client}
                </span>
                <p className="text-gradient mt-4 font-display text-2xl font-bold tracking-tight">
                  {p.impact}
                </p>
                <h3 className="mt-2 font-display text-3xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted">
                  {p.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 text-sm font-semibold text-accent hover:underline"
                  >
                    Read more ↗
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
        <SectionHeading index="03" title="Expertise" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 80}>
              <div className="h-full rounded-3xl border border-border bg-surface p-7">
                <h3 className="font-display text-lg font-bold text-accent">
                  {g.group}
                </h3>
                <ul className="mt-4 space-y-2">
                  {g.items.map((s) => (
                    <li key={s} className="text-foreground/90">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 flex flex-col gap-3 rounded-3xl border border-border p-7 sm:flex-row sm:items-center sm:gap-8">
          <h3 className="font-display text-lg font-bold text-accent">
            Education &amp; Certifications
          </h3>
          <ul className="flex flex-wrap gap-x-8 gap-y-2 text-foreground/90">
            {education.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
