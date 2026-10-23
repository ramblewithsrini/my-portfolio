import Link from "next/link";
import Reveal from "@/components/Reveal";
import { labIntro, mdmLabPublished } from "@/data/mdmLab";
import { referralLabPublished } from "@/data/referralAgent";
import { researchLabPublished } from "@/data/researchLab";

// Hands-on, interactive demos: shown on /lab and under Case studies & insights.
export default function LabShowcase({ id = "lab", heading = true }: { id?: string; heading?: boolean }) {
  if (!mdmLabPublished) return null;
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24 sm:px-8">
      {heading && (
        <>
          <h2 className="type-heading">From the lab</h2>
          <p className="mt-2 max-w-2xl text-muted">Hands-on, interactive demos — try them in your browser.</p>
        </>
      )}
      {referralLabPublished && (
        <Reveal className={heading ? "mt-8" : ""}>
          <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.08] via-surface to-accent-2/[0.06] p-8 sm:p-10">
            <p className="type-eyebrow text-accent">Lab · Agentic AI</p>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
              An AI agent that knows <span className="text-gradient">when to hand over.</span>
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              Claude investigates card-payment referrals with tools; a policy layer in code decides what actually
              happens. In a stress test, a smaller model that was never told the rules got 24 of 30 cases right on
              its own: the policy layer caught five more, including two lost cards it tried to wave through.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/lab/referral-agent"
                className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
              >
                Replay the agent →
              </Link>
              <a
                href="https://github.com/ramblewithsrini/referral-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:border-foreground"
              >
                Code on GitHub ↗
              </a>
            </div>
          </div>
        </Reveal>
      )}
      <Reveal className={referralLabPublished || heading ? "mt-6" : ""}>
        <div className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/[0.07] via-surface to-accent-2/[0.07] p-8 sm:p-10">
          <p className="type-eyebrow text-accent">{labIntro.eyebrow}</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
            {labIntro.title} <span className="text-gradient">{labIntro.titleAccent}</span>
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            Ten messy customer records, three source systems. Watch probabilistic matching, survivorship and
            householding work live — and move the sliders to see every decision change.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/lab/mdm"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
            >
              Try the MDM playground →
            </Link>
            <Link
              href="/lab/mdm/two-ways"
              className="rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:border-foreground"
            >
              The same engine in Python →
            </Link>
          </div>
        </div>
      </Reveal>
      {researchLabPublished && (
        <Reveal className="mt-6">
          <div className="rounded-3xl border border-accent-2/40 bg-gradient-to-br from-accent-2/[0.08] via-surface to-accent/[0.05] p-8 sm:p-10">
            <p className="type-eyebrow text-accent">Lab · Knowledge graphs</p>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
              Who&apos;s who in research? <span className="text-gradient">Ask the graph.</span>
            </h3>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted">
              Resolve 221 messy author mentions into 24 people, explore the knowledge graph, then see Claude answer
              questions from it through GraphRAG — 15/15 on its evaluation, with every query on show.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/lab/research-graph"
                className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
              >
                Try the knowledge graph →
              </Link>
              <Link
                href="/insights/knowledge-graph-graphrag-mcp"
                className="rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:border-foreground"
              >
                How I built and tested it →
              </Link>
            </div>
          </div>
        </Reveal>
      )}
      <Reveal className="mt-6">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <p className="type-eyebrow text-accent">Lab · Applied AI</p>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight">
            A RAG assistant, <span className="text-gradient">measured.</span>
          </h3>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">
            A finance-policy assistant on Amazon Bedrock with Claude: it cites every answer, refuses rather than
            guesses, and is scored against a fixed test set — 20/20 on retrieval, 3/3 correct refusals.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/insights/building-and-evaluating-a-rag-assistant"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
            >
              How I built and tested it →
            </Link>
            <a
              href="https://github.com/ramblewithsrini/cfo-assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:border-foreground"
            >
              Code on GitHub ↗
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
