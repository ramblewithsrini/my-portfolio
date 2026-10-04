import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Reveal from "@/components/Reveal";
import parity from "@/data/mdm-parity.json";
import {
  defaultSurvivorship,
  defaultThresholds,
  defaultWeights,
  mdmLabPublished,
  sampleRecords,
} from "@/data/mdmLab";
import { sourceUrl } from "@/data/underTheHood";
import { codeRegion, sourceFile } from "@/lib/codeRegions";
import { run } from "@/lib/mdm";

const isDraft = !mdmLabPublished;
const hidden = isDraft && process.env.NODE_ENV === "production";

// Parity check, at build time: the TypeScript engine must reproduce the
// committed Python results exactly, or the site does not build.
const typescript = run(sampleRecords, defaultWeights, defaultThresholds, defaultSurvivorship);
if (JSON.stringify(typescript) !== JSON.stringify(parity)) {
  throw new Error(
    "The TypeScript and Python MDM engines disagree. Run `python python/export_parity.py`, then fix whichever engine changed.",
  );
}

const TS_FILE = sourceFile("typescript");
const PY_FILE = sourceFile("python");

const steps = [
  {
    region: "similarity",
    title: "How alike are two names?",
    body: "Jaro–Winkler similarity scores two strings from 0 to 1, forgiving small typos like Smith and Smyth and rewarding a shared start.",
  },
  {
    region: "score",
    title: "Scoring a pair of records",
    body: "Field similarities are weighted and combined into a score out of 100. Missing fields don't count, and the thresholds turn the score into a decision.",
  },
  {
    region: "cluster",
    title: "Grouping matches into customers",
    body: "Union–find follows the automatic matches, so if A matches B and B matches C, all three become one customer.",
  },
  {
    region: "survive",
    title: "Building the golden record",
    body: "Survivorship rules decide which source wins each field — the most complete name, the most recent address, the most trusted date of birth.",
  },
  {
    region: "households",
    title: "Grouping households",
    body: "Golden records with the same house number and postcode form a household.",
  },
].map((s) => ({ ...s, ts: codeRegion("typescript", s.region), py: codeRegion("python", s.region) }));

const parityRows = [
  { label: "Customers", ts: typescript.summary.customers, py: parity.summary.customers },
  { label: "Households", ts: typescript.summary.households, py: parity.summary.households },
  { label: "Pairs for review", ts: typescript.summary.review, py: parity.summary.review },
  { label: "Pair scores compared", ts: typescript.pairs.length, py: parity.pairs.length },
];

// While hidden, expose nothing — not even the title.
export const metadata: Metadata = hidden
  ? { robots: { index: false } }
  : {
  title: "One engine, two languages",
  description:
    "The same master data management engine in TypeScript and Python — producing identical results, verified on every build.",
  robots: isDraft ? { index: false } : undefined,
};

function CodePane({ language, file, code }: { language: string; file: string; code: string }) {
  return (
    <figure className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-background">
      <figcaption className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 text-xs">
        <span className="font-semibold text-accent">{language}</span>
        <a
          href={`${sourceUrl}/blob/master/${file}`}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-muted hover:text-accent"
        >
          {file} ↗
        </a>
      </figcaption>
      <pre className="max-h-[28rem] flex-1 overflow-auto p-4 text-[12.5px] leading-relaxed">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </figure>
  );
}

export default function TwoWaysPage() {
  if (hidden) notFound();

  return (
    <main id="top" className="overflow-x-clip">
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pt-32">
          {isDraft && (
            <p className="mb-6 rounded-xl border border-yellow-400/50 bg-yellow-400/[0.06] px-4 py-3 text-sm text-yellow-200">
              Draft — visible only on your local preview, never on the live site.
            </p>
          )}
          <Reveal intro>
            <Link href="/lab/mdm" className="text-sm text-muted hover:text-foreground">
              ← Back to the playground
            </Link>
            <p className="mb-6 mt-8 font-display text-sm font-medium uppercase tracking-widest text-accent">
              Lab · Master data management
            </p>
            <h1 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-bold tracking-tighter">
              One engine,
              <br />
              <span className="text-gradient">two languages.</span>
            </h1>
          </Reveal>
          <Reveal intro delay={100}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
              The playground runs in TypeScript, in your browser. Data teams work in Python. So the same
              engine exists in both — reading the same data, and proven to produce identical results.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12 sm:px-8">
        {/* Why two languages */}
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="h-full rounded-3xl border border-border bg-surface p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">TypeScript</p>
              <h2 className="mt-2 font-display text-2xl font-bold">For the live experience</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Runs instantly in the visitor&apos;s browser — every slider recalculates on the spot, with no
                server and no data leaving the page.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100} className="h-full">
            <div className="h-full rounded-3xl border border-border bg-surface p-8">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">Python</p>
              <h2 className="mt-2 font-display text-2xl font-bold">For data teams</h2>
              <p className="mt-3 leading-relaxed text-muted">
                The language of analysis and data engineering — with pandas, tests and a notebook walkthrough, ready
                to run against real volumes.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Parity */}
        <Reveal className="mt-6">
          <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.07] via-surface to-accent-2/[0.07] p-8 sm:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Identical results — verified on every build
              </h2>
              <p className="text-sm text-muted">Default settings · shared sample data</p>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left">
                <thead className="text-xs uppercase tracking-widest text-muted">
                  <tr className="border-b border-border">
                    <th scope="col" className="py-2 pr-4 font-medium">Result</th>
                    <th scope="col" className="py-2 pr-4 font-medium">TypeScript</th>
                    <th scope="col" className="py-2 pr-4 font-medium">Python</th>
                    <th scope="col" className="py-2 font-medium">Match</th>
                  </tr>
                </thead>
                <tbody>
                  {parityRows.map((r) => (
                    <tr key={r.label} className="border-b border-border/60 last:border-0">
                      <td className="py-3 pr-4">{r.label}</td>
                      <td className="py-3 pr-4 font-display text-xl font-bold">{r.ts}</td>
                      <td className="py-3 pr-4 font-display text-xl font-bold">{r.py}</td>
                      <td className="py-3 font-semibold text-accent">{r.ts === r.py ? "✓" : "✗"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Every pair score, golden record and household is compared — not just these totals. If the two
              engines ever disagree, the website build fails.
            </p>
          </div>
        </Reveal>

        {/* Side by side */}
        <h2 className="mt-20 font-display text-4xl font-bold tracking-tight sm:text-5xl">Side by side</h2>
        <p className="mt-3 max-w-3xl text-lg text-muted">
          The same logic, step by step. These excerpts are read from the real source files when the site is
          built, so they are always the code that runs.
        </p>
        <ol className="mt-10 space-y-14">
          {steps.map((s, i) => (
            <li key={s.region}>
              <Reveal>
                <p className="font-display text-sm text-accent-2">Step {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">{s.title}</h3>
                <p className="mt-2 max-w-3xl text-muted">{s.body}</p>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <CodePane language="TypeScript" file={TS_FILE} code={s.ts} />
                  <CodePane language="Python" file={PY_FILE} code={s.py} />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Links */}
        <Reveal className="mt-20">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: `${sourceUrl}/blob/master/python/mdm_walkthrough.ipynb`,
                eyebrow: "Jupyter notebook",
                title: "The step-by-step walkthrough",
                external: true,
              },
              {
                href: `${sourceUrl}/blob/master/python/test_mdm.py`,
                eyebrow: "pytest",
                title: "The tests, including parity",
                external: true,
              },
              { href: "/lab/mdm", eyebrow: "Playground", title: "Try it live in your browser", external: false },
            ].map((l) =>
              l.external ? (
                <a
                  key={l.title}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-accent">{l.eyebrow}</span>
                  <span className="mt-2 block font-display text-xl font-bold">{l.title} ↗</span>
                </a>
              ) : (
                <Link
                  key={l.title}
                  href={l.href}
                  className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent"
                >
                  <span className="text-xs font-medium uppercase tracking-widest text-accent">{l.eyebrow}</span>
                  <span className="mt-2 block font-display text-xl font-bold">{l.title} →</span>
                </Link>
              ),
            )}
          </div>
          <p className="mt-6 text-sm text-muted">
            Built with Claude Code; reviewed and understood by me. A simplified illustration with fictional data.
          </p>
        </Reveal>
      </section>

      <Contact />
    </main>
  );
}
