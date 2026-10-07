import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import GraphRagPanel from "@/components/GraphRagPanel";
import ResearchGraphLab from "@/components/ResearchGraphLab";
import Reveal from "@/components/Reveal";
import { graphRag, researchData, researchIntro, researchLabPublished, researchSteps } from "@/data/researchLab";

// Draft until published: visible in local development only.
const isDraft = !researchLabPublished;
const hidden = isDraft && process.env.NODE_ENV === "production";

// While hidden, expose nothing — not even the title.
export const metadata: Metadata = hidden
  ? { robots: { index: false } }
  : {
      title: "Research knowledge graph",
      description:
        "An interactive illustration of entity resolution and knowledge graphs: resolve who's who in messy research records, build a graph, then ask it questions — in your browser.",
      robots: isDraft ? { index: false } : undefined,
    };

export default function ResearchGraphPage() {
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
            <p className="type-eyebrow mb-6 text-accent">{researchIntro.eyebrow}</p>
            <h1 className="type-display">
              {researchIntro.title}
              <br />
              <span className="text-gradient">{researchIntro.titleAccent}</span>
            </h1>
          </Reveal>
          <Reveal intro delay={100}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{researchIntro.lead}</p>
          </Reveal>
          <Reveal intro delay={200}>
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {researchSteps.map((s) => (
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
        <ResearchGraphLab data={researchData} />
        <GraphRagPanel summary={graphRag.summary} runs={graphRag.runs} />

        <div className="mt-16 flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="type-eyebrow text-accent">Under the hood</p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/85">
              The same entity resolution in Python, the graph in Neo4j, GraphRAG with Claude on Amazon Bedrock and its
              evaluation — plus an MCP server, so Claude Desktop or Claude Code can explore the graph as read-only tools.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/insights/knowledge-graph-graphrag-mcp"
              className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-transform hover:scale-105"
            >
              How I built it →
            </Link>
            <a
              href="https://github.com/ramblewithsrini/research-graph"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 font-semibold transition-colors hover:border-foreground"
            >
              Code on GitHub ↗
            </a>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted">{researchIntro.disclaimer}</p>
      </section>

      <Contact />
    </main>
  );
}
