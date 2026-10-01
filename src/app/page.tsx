import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import {
  experience,
  profile,
  projects,
  skills,
  stats,
} from "@/data/portfolio";

const allSkills = skills.flatMap((s) => s.items);

export default function Home() {
  return (
    <>
      <Nav />
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
              <a
                href={profile.resumeUrl}
                className="rounded-full border border-border px-7 py-3.5 font-semibold transition-colors hover:border-foreground"
              >
                Download résumé
              </a>
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
            {[...allSkills, ...allSkills].map((s, i) => (
              <span key={i} className="flex items-center gap-10">
                {s} <span>✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <section id="experience" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
          <SectionHeading index="01" title="Experience" />
          <ol className="relative border-l border-border">
            {experience.map((job, i) => (
              <li key={job.company + job.role} className="relative mb-14 ml-8 last:mb-0">
                <span className="absolute -left-[39.5px] top-1 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background" />
                <Reveal delay={i * 80}>
                  <p className="font-display text-sm font-medium text-muted">
                    {job.start} — {job.end}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                    {job.role}{" "}
                    <span className="text-accent">@ {job.company}</span>
                  </h3>
                  <ul className="mt-4 max-w-3xl space-y-2 text-muted">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-3 shrink-0 bg-accent-2" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
          <SectionHeading index="02" title="Projects" />
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 100}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50">
                  <div
                    className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent-2/0 blur-3xl transition-colors duration-500 group-hover:bg-accent-2/30"
                    aria-hidden
                  />
                  <span className="font-display text-sm text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
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
                  <div className="mt-6 flex gap-5 text-sm font-semibold">
                    {p.href && (
                      <a href={p.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                        Live ↗
                      </a>
                    )}
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="hover:text-accent">
                        Code ↗
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mx-auto max-w-6xl px-5 py-32 sm:px-8">
          <SectionHeading index="03" title="Skills" />
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
        </section>

        {/* Contact */}
        <section id="contact" className="px-5 pb-16 sm:px-8">
          <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-accent-2 via-[#4b3bd6] to-[#1b1640] px-8 py-20 text-center sm:px-16 sm:py-28">
            <div className="grid-bg absolute inset-0" aria-hidden />
            <p className="relative font-display text-sm font-medium uppercase tracking-widest text-white/70">
              04 — Contact
            </p>
            <h2 className="relative mt-4 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-bold tracking-tighter">
              Let&apos;s build something.
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-lg text-white/75">
              I&apos;m based in {profile.location}. Whether it&apos;s a role, a
              project, or just a hello — my inbox is open.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="relative mt-10 inline-block rounded-full bg-accent px-8 py-4 font-display text-lg font-bold text-background transition-transform hover:scale-105"
            >
              {profile.email}
            </a>
            <div className="relative mt-8 flex justify-center gap-6">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="hover:text-foreground">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}
