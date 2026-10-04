import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import { formatDate, readingTime, visibleArticles, type Block } from "@/data/insights";
import { experience, profile } from "@/data/portfolio";

// Only visible articles exist (drafts are local-only); anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const article = visibleArticles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.dek,
    authors: [{ name: profile.name }],
    openGraph: { type: "article", title: article.title, description: article.dek },
    robots: article.status === "draft" ? { index: false } : undefined,
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-14 type-heading">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p key={i} className="mt-6 text-lg leading-relaxed text-foreground/85">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul key={i} className="mt-6 space-y-4">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-foreground/85">
              <span className="mt-3 h-1 w-3 shrink-0 bg-accent" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="mt-12 border-l-2 border-accent pl-6 font-display text-2xl leading-snug font-medium"
        >
          {block.text}
        </blockquote>
      );
    // A roadmap: numbered stages joined by a line (down the page on phones, across on wide screens).
    case "stages":
      return (
        <figure key={i} className="mt-10 lg:-mx-32">
          <ol className="grid gap-3 lg:grid-cols-5">
            {block.items.map((s, n) => (
              <li key={s.name} className="relative flex flex-col rounded-2xl border border-border bg-surface p-5">
                <span
                  className="absolute -top-px left-5 right-5 h-0.5 bg-gradient-to-r from-accent to-accent-2"
                  style={{ opacity: 0.4 + n * 0.15 }}
                  aria-hidden
                />
                <span className="type-eyebrow text-accent-2">
                  {String(n + 1).padStart(2, "0")} · {s.when}
                </span>
                <span className="mt-2 font-display text-xl font-bold">{s.name}</span>
                <span className="mt-1 text-sm leading-snug text-foreground/85">{s.goal}</span>
                <ul className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm text-muted">
                  {s.outputs.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="text-accent" aria-hidden>✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 text-sm text-muted">{block.caption}</figcaption>
        </figure>
      );
    // An operating model: one band per tier, top to bottom.
    case "roles":
      return (
        <figure key={i} className="mt-10 lg:-mx-32">
          <div className="space-y-3">
            {block.tiers.map((t, n) => (
              <section
                key={t.tier}
                className="grid gap-4 rounded-2xl border p-5 lg:grid-cols-[12rem_1fr]"
                style={{ borderColor: `color-mix(in srgb, var(--accent-2) ${60 - n * 18}%, var(--border))` }}
              >
                <div>
                  <p className="type-eyebrow text-accent">{t.tier}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{t.purpose}</p>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {t.roles.map((r) => (
                    <li key={r.name} className="rounded-xl bg-surface p-4">
                      <span className="block font-display font-bold">{r.name}</span>
                      <span className="mt-1 block text-sm leading-snug text-muted">{r.does}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <figcaption className="mt-3 text-sm text-muted">{block.caption}</figcaption>
        </figure>
      );
    case "table":
      return (
        <figure key={i} className="mt-8">
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface">
                <tr>
                  {block.head.map((h) => (
                    <th key={h} scope="col" className="type-eyebrow px-4 py-3 text-accent">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, c) =>
                      c === 0 ? (
                        <th key={c} scope="row" className="whitespace-nowrap px-4 py-3 font-semibold">
                          {cell}
                        </th>
                      ) : (
                        <td key={c} className="px-4 py-3 text-foreground/85">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            {block.caption}
            {block.sources && (
              <>
                . Sources:{" "}
                {block.sources.map((s, n) => (
                  <span key={s.href}>
                    {n > 0 && "; "}
                    <a href={s.href} target="_blank" rel="noreferrer" className="underline hover:text-foreground">
                      {s.label}
                    </a>
                  </span>
                ))}
                .
              </>
            )}
          </figcaption>
        </figure>
      );
    case "note":
      return (
        <aside
          key={i}
          className="mt-6 rounded-2xl border border-dashed border-yellow-400/60 bg-yellow-400/[0.06] p-5 text-sm leading-relaxed text-yellow-100"
        >
          <span className="type-eyebrow mb-1 block text-yellow-300">
            Editor&apos;s note — needs your input
          </span>
          {block.text}
        </aside>
      );
  }
}

export default async function ArticlePage(props: PageProps<"/insights/[slug]">) {
  const { slug } = await props.params;
  const article = visibleArticles.find((a) => a.slug === slug);
  if (!article) notFound();
  const study = experience.find((j) => j.slug === article.caseStudy);

  return (
    <main id="top" className="overflow-x-clip">
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Reveal intro>
          <Link href="/insights" className="text-sm text-muted hover:text-foreground">
            ← All insights
          </Link>
          {article.status === "draft" && (
            <p className="mt-6 rounded-xl border border-yellow-400/50 bg-yellow-400/[0.06] px-4 py-3 text-sm text-yellow-200">
              Draft — visible only on your local preview, never on the live site.
            </p>
          )}
        </Reveal>
        <Reveal intro delay={100}>
          <p className="mt-8 flex flex-wrap gap-3 text-sm text-muted">
            <span>{formatDate(article.date)}</span>
            <span aria-hidden>·</span>
            <span>{readingTime(article)} min read</span>
          </p>
          <h1 className="mt-4 type-title">
            {article.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted">{article.dek}</p>
          <p className="mt-6 text-sm text-foreground/80">
            By {profile.name} · {profile.headline}
          </p>
        </Reveal>

        <div className="mt-10 border-t border-border pt-4">{article.blocks.map(renderBlock)}</div>

        {study && (
          <Link
            href={`/experience/${study.slug}`}
            className="mt-14 block rounded-3xl border border-border bg-surface p-7 transition-colors hover:border-accent/50"
          >
            <span className="type-eyebrow text-accent">
              The case study behind this article
            </span>
            <span className="mt-2 block font-display text-2xl font-bold">{study.role}</span>
            <span className="text-muted">{study.company} →</span>
          </Link>
        )}
      </article>

      <Contact />
    </main>
  );
}
