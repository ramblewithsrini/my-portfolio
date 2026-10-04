import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import MdmPlayground from "@/components/MdmPlayground";
import Reveal from "@/components/Reveal";
import {
  defaultSurvivorship,
  defaultThresholds,
  defaultWeights,
  labIntro,
  mdmLabPublished,
  sampleRecords,
  steps,
} from "@/data/mdmLab";

// Draft until published: visible in local development only.
const isDraft = !mdmLabPublished;
const hidden = isDraft && process.env.NODE_ENV === "production";

export const metadata: Metadata = {
  title: "MDM playground",
  description:
    "An interactive illustration of master data management: probabilistic matching, survivorship and householding, running in your browser.",
  robots: isDraft ? { index: false } : undefined,
};

export default function MdmLabPage() {
  if (hidden) notFound();

  return (
    <main id="top" className="overflow-x-clip">
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-accent-2/30 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pt-32">
          {isDraft && (
            <p className="mb-6 rounded-xl border border-yellow-400/50 bg-yellow-400/[0.06] px-4 py-3 text-sm text-yellow-200">
              Draft — visible only on your local preview, never on the live site.
            </p>
          )}
          <Reveal intro>
            <p className="mb-6 font-display text-sm font-medium uppercase tracking-widest text-accent">
              {labIntro.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-tighter">
              {labIntro.title}
              <br />
              <span className="text-gradient">{labIntro.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal intro delay={100}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{labIntro.lead}</p>
          </Reveal>
          <Reveal intro delay={200}>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <li key={s.n} className="rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur">
                  <span className="font-display text-sm text-accent-2">{s.n}</span>
                  <h2 className="mt-1 font-display text-lg font-bold">{s.title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <MdmPlayground
          records={sampleRecords}
          defaults={{ weights: defaultWeights, thresholds: defaultThresholds, survivorship: defaultSurvivorship }}
        />

        <div className="mt-16 flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-accent">From the real world</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/85">
              At Allianz UK I led customer data and MDM on IBM MDM Server — tuning probabilistic matching,
              cleansing data and clarifying survivorship rules improved matching rates by 21%, and a
              household view of the customer fed marketing and analytics.
            </p>
            <p className="mt-4 text-sm text-muted">{labIntro.disclaimer}</p>
          </div>
          <Link
            href="/experience/allianz"
            className="shrink-0 rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
          >
            The Allianz story →
          </Link>
        </div>
      </section>

      <Contact />
    </main>
  );
}
