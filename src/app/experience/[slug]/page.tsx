import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChapterNav from "@/components/ChapterNav";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/portfolio";
import { attributeQuote, formatDuration, getRole } from "@/lib/career";

// Only the roles listed in portfolio.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return experience.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata(props: PageProps<"/experience/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const role = getRole(slug);
  if (!role) return {};
  return {
    title: `${role.job.role} · ${role.job.short}`,
    description: role.story.summary ?? role.job.highlights[0],
  };
}

// Jump-link targets: the id is derived from the short label.
const sectionId = (label: string) => label.toLowerCase().replace(/[^a-z]+/g, "-");

function Section({ title, nav, children }: { title: string; nav: string; children: React.ReactNode }) {
  return (
    <section id={sectionId(nav)} className="scroll-mt-32 border-t border-border py-14">
      <Reveal className="grid gap-8 lg:grid-cols-[14rem_1fr]">
        <h2 className="type-eyebrow text-accent">
          {title}
        </h2>
        <div>{children}</div>
      </Reveal>
    </section>
  );
}

export default async function RolePage(props: PageProps<"/experience/[slug]">) {
  const { slug } = await props.params;
  const role = getRole(slug);
  if (!role) notFound();
  const { job, story, newer, older } = role;
  const quotes = (story.quotes ?? []).map(attributeQuote);

  return (
    <main id="top" className="overflow-x-clip">
      {/* Header */}
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className={`animate-float absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full blur-[120px] ${
            job.type === "in-house" ? "bg-accent/20" : "bg-accent-2/30"
          }`}
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-20 sm:px-8 sm:pt-28">
          <Reveal intro>
            <Link href="/experience" className="text-sm text-muted hover:text-foreground">
              ← All experience
            </Link>
          </Reveal>
          <Reveal intro delay={80}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <span
                className={`rounded-full border px-3 py-1 font-medium ${
                  job.type === "in-house"
                    ? "border-accent/50 text-accent"
                    : "border-accent-2/50 text-[#c5b8ff]"
                }`}
              >
                {job.type === "in-house" ? "In-house" : "Consulting"}
              </span>
              <span className="text-muted">
                {job.start} — {job.end} · {formatDuration(job)}
              </span>
            </div>
          </Reveal>
          <Reveal intro delay={160}>
            <h1 className="mt-5 max-w-4xl type-title">
              {job.role}
            </h1>
            <p className="mt-3 font-display text-xl font-medium text-accent sm:text-2xl">
              {job.company}
            </p>
          </Reveal>
          {story.summary && (
            <Reveal intro delay={240}>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
                {story.summary}
              </p>
            </Reveal>
          )}
          {story.outcomes && (
            <Reveal intro delay={320}>
              <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
                {story.outcomes.map((o) => (
                  <div key={o.label} className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm text-muted">{o.label}</dt>
                    <dd className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                      {o.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      <ChapterNav
        label="Case study sections"
        chapters={(
          [
            [story.context, "Context"],
            [story.scope, "Scope"],
            [story.milestones, "Milestones"],
            [story.achievements, "Achievements"],
            [!story.achievements, "Delivered"],
            [story.leadershipStory || story.leadership, "How I led"],
            [quotes.length > 0, "In their words"],
            [story.lessons, "Lessons"],
            [story.tech, "Technology"],
          ] as const
        )
          .filter(([present]) => present)
          .map(([, nav], i) => ({ id: sectionId(nav), number: String(i + 1).padStart(2, "0"), title: nav }))}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {story.context && (
          <Section title="Context" nav="Context">
            <div className="space-y-4 text-lg leading-relaxed text-foreground/85">
              {story.context.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Section>
        )}

        {story.scope && (
          <Section title="Role & scope" nav="Scope">
            <dl className="grid gap-4 sm:grid-cols-2">
              {story.scope.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-surface p-5">
                  <dt className="type-eyebrow text-muted">
                    {s.label}
                  </dt>
                  <dd className="mt-2 leading-relaxed">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {story.milestones && (
          <Section title="Milestones" nav="Milestones">
            <ol className="relative border-l border-border">
              {story.milestones.map((m) => (
                <li key={m.date + m.title} className="relative mb-8 ml-7 last:mb-0">
                  <span className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                  <p className="text-sm font-medium text-muted">{m.date}</p>
                  <h3 className="mt-1 font-display text-xl font-bold">{m.title}</h3>
                  {m.body && <p className="mt-2 leading-relaxed text-muted">{m.body}</p>}
                </li>
              ))}
            </ol>
          </Section>
        )}

        {story.labLink && (
          <section className="border-t border-border py-14">
            <Reveal>
              <Link
                href={story.labLink.href}
                className="group flex flex-col gap-4 rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.07] via-surface to-accent-2/[0.07] p-8 transition-colors hover:border-accent sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="type-eyebrow block text-accent">Try it</span>
                  <span className="mt-2 block font-display text-2xl font-bold tracking-tight">{story.labLink.title}</span>
                  <span className="mt-2 block max-w-2xl text-muted">{story.labLink.body}</span>
                </span>
                <span className="shrink-0 font-semibold text-accent group-hover:underline">Open the playground →</span>
              </Link>
            </Reveal>
          </section>
        )}

        {story.achievements && (
          <Section title="Key achievements" nav="Achievements">
            <div className="space-y-6">
              {story.achievements.map((a) => (
                <article key={a.title} className="rounded-3xl border border-border bg-surface p-7">
                  <h3 className="font-display text-2xl font-bold tracking-tight">{a.title}</h3>
                  <dl className="mt-5 grid gap-5 md:grid-cols-3">
                    {(
                      [
                        ["Challenge", a.challenge],
                        ["Approach", a.approach],
                        ["Outcome", a.outcome],
                      ] as const
                    )
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <div key={k}>
                          <dt className="type-eyebrow text-accent">
                            {k}
                          </dt>
                          <dd className="mt-2 leading-relaxed text-foreground/85">{v}</dd>
                        </div>
                      ))}
                  </dl>
                </article>
              ))}
            </div>
          </Section>
        )}

        {/* With full achievements, the CV highlights would only repeat them (they're on /experience). */}
        {!story.achievements && (
          <Section title="What I delivered" nav="Delivered">
            <ul className="space-y-3 text-lg leading-relaxed text-foreground/85">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span className="mt-3 h-1 w-3 shrink-0 bg-accent-2" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {(story.leadershipStory || story.leadership) && (
          <Section title="How I led" nav="How I led">
            {story.leadershipStory && (
              <article className="mb-8 overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.08] via-surface to-accent-2/[0.08] p-7 sm:p-9">
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {story.leadershipStory.title}
                </h3>
                <dl className="mt-6 grid gap-6 md:grid-cols-3">
                  {(
                    [
                      ["The situation", story.leadershipStory.situation],
                      ["What I did", story.leadershipStory.action],
                      ["What changed", story.leadershipStory.result],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt className="type-eyebrow text-accent">{k}</dt>
                      <dd className="mt-2 leading-relaxed text-foreground/85">{v}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            )}
            {story.leadership && (
            <ul className="space-y-3 text-lg leading-relaxed text-foreground/85">
              {story.leadership.map((l) => (
                <li key={l} className="flex gap-3">
                  <span className="mt-3 h-1 w-3 shrink-0 bg-accent" aria-hidden />
                  {l}
                </li>
              ))}
            </ul>
            )}
          </Section>
        )}

        {quotes.length > 0 && (
          <Section title="In their words" nav="In their words">
            <div className="grid gap-5 md:grid-cols-2">
              {quotes.map((q) => (
                <figure key={q.excerpt} className="rounded-3xl border border-border bg-surface p-7">
                  <blockquote className="font-display text-lg leading-snug font-medium">
                    “{q.excerpt}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-muted">
                    {q.title}, {q.company} · {q.relationship}
                  </figcaption>
                </figure>
              ))}
            </div>
            <Link
              href="/testimonials"
              className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
            >
              All testimonials →
            </Link>
          </Section>
        )}

        {story.lessons && (
          <Section title="Lessons" nav="Lessons">
            <div className="space-y-4">
              {story.lessons.map((l) => (
                <p
                  key={l}
                  className="border-l-2 border-accent pl-6 font-display text-xl leading-snug font-medium"
                >
                  {l}
                </p>
              ))}
            </div>
          </Section>
        )}

        {story.tech && (
          <Section title="Technology & domain" nav="Technology">
            <ul className="flex flex-wrap gap-2">
              {story.tech.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-sm text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Previous / next role */}
        <nav className="grid gap-4 border-t border-border py-14 sm:grid-cols-2" aria-label="Other roles">
          {older ? (
            <Link
              href={`/experience/${older.slug}`}
              className="rounded-2xl border border-border p-5 transition-colors hover:border-foreground"
            >
              <span className="type-eyebrow text-muted">← Earlier</span>
              <span className="mt-1 block font-display text-lg font-bold">{older.role}</span>
              <span className="text-sm text-accent">{older.short}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={`/experience/${newer.slug}`}
              className="rounded-2xl border border-border p-5 text-right transition-colors hover:border-foreground"
            >
              <span className="type-eyebrow text-muted">Later →</span>
              <span className="mt-1 block font-display text-lg font-bold">{newer.role}</span>
              <span className="text-sm text-accent">{newer.short}</span>
            </Link>
          )}
        </nav>
      </div>

      <Contact />
    </main>
  );
}
