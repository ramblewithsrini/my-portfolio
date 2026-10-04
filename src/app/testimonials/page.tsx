import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TestimonialWall from "@/components/TestimonialWall";
import {
  linkedInRecommendationsUrl,
  relationshipLabels,
  testimonials,
} from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Recommendations from managers, team members and colleagues.",
};

const shown = testimonials.filter((t) => !t.hidden);
const featured = shown.filter((t) => t.featured);
const years = shown.map((t) => Number(t.date.slice(0, 4)));
const span = Math.max(...years) - Math.min(...years);

const stats = [
  { value: String(shown.length), label: "Recommendations" },
  { value: `${span} yrs`, label: `Of feedback, ${Math.min(...years)}–${Math.max(...years)}` },
  { value: "360°", label: "Managers, team and peers" },
];

export default function TestimonialsPage() {
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
              Testimonials
            </p>
          </Reveal>
          <Reveal intro delay={100}>
            <h1 className="type-display">
              In their <span className="text-gradient">words.</span>
            </h1>
          </Reveal>
          <Reveal intro delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Leadership is best judged by the people on the receiving end of
              it. These are recommendations from the managers I&apos;ve worked
              for, the people I&apos;ve led and the partners I&apos;ve worked
              alongside — reproduced as written on LinkedIn.
            </p>
          </Reveal>
          <Reveal intro delay={300}>
            <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold sm:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Featured, tied to the leadership pillars */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading index="01" title="The philosophy, in practice" />
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((t, i) => (
            <Reveal key={t.featured!.pillar} delay={i * 120}>
              <figure className="flex h-full flex-col rounded-3xl border border-border bg-gradient-to-b from-surface to-background p-8">
                <p className="type-eyebrow text-accent">
                  {t.featured!.pillar}
                </p>
                <blockquote className="mt-5 flex-1 font-display text-2xl leading-snug font-medium">
                  “{t.featured!.excerpt}”
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-4">
                  <p className="font-medium">{t.title}</p>
                  <p className="text-sm text-muted">
                    {t.company} · {relationshipLabels[t.relationship]}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* All recommendations */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading index="02" title="Every recommendation" />
        <TestimonialWall items={shown} />
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          Reproduced verbatim from LinkedIn. Recommenders&apos; names are
          withheld for privacy; titles and companies are as they currently
          appear on LinkedIn.{" "}
          <a
            href={linkedInRecommendationsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline underline-offset-4"
          >
            View the originals on LinkedIn ↗
          </a>
        </p>
      </section>

      <Contact />
    </main>
  );
}
