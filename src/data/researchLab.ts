// Content for the research knowledge-graph lab (/lab/research-graph).
// Every person, institution, paper and ID in the sample data is invented.

import graphRagRuns from "./research-graphrag.json";
import sample from "./research-sample.json";
import type { Dataset } from "@/lib/research";

// Drafts are visible only in local development; set to true to put the page live.
export const researchLabPublished = true;

export const researchData = sample as unknown as Dataset;

// GraphRAG answers recorded from a real run (Claude on Amazon Bedrock + Neo4j AuraDB);
// shown as-is so the public page needs no API keys and costs nothing to run.
export type GraphRagRun = { q: string; cypher: string; answer: string; status: string; pass: boolean };
export const graphRag = graphRagRuns as { summary: { date: string; model: string; answered: string; valid_cypher: string; refused: string }; runs: GraphRagRun[] };

export const researchIntro = {
  eyebrow: "Lab · Knowledge graphs",
  title: "Who's who in research?",
  titleAccent: "From messy records to a graph you can question.",
  lead: "The same researcher appears on papers as “Priya Raman”, “P. Raman” and “Raman, Priya”; the same university as “Northbridge University”, “Univ. of Northbridge” and “NBU”. Until you resolve who's who, you can't answer simple questions — who leads a field, or which institutions work together. Move the sliders, then ask the graph.",
  disclaimer:
    "A fictional dataset on AI in payments and fraud detection: 77 papers and 221 author mentions, all invented. It shows the concepts — entity resolution, knowledge graphs and graph queries — not any employer's system.",
};

export const researchSteps = [
  { n: "01", title: "Messy records", body: "221 author mentions across 77 papers, written 85 different ways." },
  { n: "02", title: "Who's who", body: "Names, institutions, ORCIDs and shared co-authors decide who is the same person." },
  { n: "03", title: "The graph", body: "Researchers, papers, institutions and topics, connected." },
  { n: "04", title: "Ask the graph", body: "Questions answered from the connections — with the query behind each answer." },
  { n: "05", title: "AI on the graph", body: "Claude turns plain-English questions into graph queries, then answers only from the results." },
];
