import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { bookshelf, philosophy, principles } from "@/data/about";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The leadership principles 25 years have taught me — each proven in a real programme — and the books that shaped them.",
};

export default function LeadershipPage() {
  return (
    <main id="top" className="overflow-x-clip">
      {/* Intro */}
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-accent-2/30 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-8 pt-24 sm:px-8 sm:pt-32">
          <Reveal intro>
            <Link href="/#philosophy" className="text-sm text-muted hover:text-foreground">
              ← Back to About
            </Link>
          </Reveal>
          <Reveal intro delay={100}>
            <p className="mb-6 mt-8 font-display text-sm font-medium uppercase tracking-widest text-accent">
              Leadership
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-tighter">
              How I lead —
              <br />
              <span className="text-gradient">in practice.</span>
            </h1>
          </Reveal>
          <Reveal intro delay={200}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              My philosophy is simple:{" "}
              <span className="font-semibold text-foreground">{philosophy.mantra}</span> Below are the
              principles 25 years have taught me — each one proven in a real programme — and the books
              that shaped them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section id="principles" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8">
        <SectionHeading title="What 25 years taught me" />
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

      {/* What shapes how I lead */}
      <section id="bookshelf" className="mx-auto max-w-6xl scroll-mt-32 px-5 py-20 sm:px-8">
        <SectionHeading title={bookshelf.title} />
        <Reveal>
          <p className="-mt-6 mb-10 max-w-3xl text-lg text-muted">{bookshelf.lead}</p>
        </Reveal>
        <ul className="grid gap-6 md:grid-cols-2">
          {bookshelf.books.map((b, i) => (
            <li key={b.title}>
              <Reveal delay={(i % 2) * 100} className="h-full">
                <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface p-8">
                  <span
                    className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-accent to-accent-2"
                    aria-hidden
                  />
                  <h3 className="font-display text-2xl leading-tight font-bold tracking-tight">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{b.author}</p>
                  <p className="mt-5 font-display text-lg leading-snug font-medium text-foreground/90">
                    {b.idea}
                  </p>
                  <p className="mt-4 flex-1 border-t border-border pt-4 leading-relaxed text-muted">
                    <span className="mb-1 block text-xs font-medium uppercase tracking-widest text-accent">
                      In my work
                    </span>
                    {b.inPractice}
                  </p>
                  <Link
                    href={b.href}
                    className="mt-5 text-sm font-semibold text-accent hover:underline"
                  >
                    {b.linkLabel} →
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
        <Reveal className="mt-6">
          <div className="grid items-stretch gap-6 overflow-hidden rounded-3xl border border-border bg-surface sm:grid-cols-[minmax(0,16rem)_1fr]">
            <div className="relative aspect-[3/4] sm:aspect-auto">
              <Image
                src={bookshelf.currentlyReading.image}
                alt={bookshelf.currentlyReading.alt}
                fill
                sizes="(min-width: 640px) 16rem, 100vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-7 sm:py-10 sm:pl-0 sm:pr-10">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">Currently reading</p>
              <p className="font-display text-3xl leading-tight font-bold tracking-tight">
                {bookshelf.currentlyReading.title}
                <span className="mt-1 block text-base font-normal text-muted">
                  {bookshelf.currentlyReading.author}
                </span>
              </p>
              <p className="border-t border-border pt-5 text-foreground/85">
                <span className="mr-2" aria-hidden>
                  🎧
                </span>
                {bookshelf.podcast}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
