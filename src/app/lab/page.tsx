import type { Metadata } from "next";
import Contact from "@/components/Contact";
import LabShowcase from "@/components/LabShowcase";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Lab",
  description: "Hands-on labs: an MDM engine, a knowledge graph with GraphRAG and an MCP server, and a measured RAG assistant, all with public code.",
};

export default function LabPage() {
  return (
    <main id="top" className="overflow-x-clip">
      <section className="relative pt-16">
        <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
        <div
          className="animate-float absolute -top-32 right-[-10%] -z-10 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[120px]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-24 sm:px-8 sm:pt-32">
          <Reveal intro>
            <p className="type-eyebrow mb-6 text-accent">Lab</p>
          </Reveal>
          <Reveal intro delay={100}>
            <h1 className="type-display">
              Still building,
              <br />
              <span className="text-gradient">still learning.</span>
            </h1>
          </Reveal>
          <Reveal intro delay={200}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Working demos you can try in your browser, each with tests or an evaluation, and public code.
            </p>
          </Reveal>
        </div>
      </section>

      <LabShowcase id="demos" heading={false} />

      <Contact />
    </main>
  );
}
