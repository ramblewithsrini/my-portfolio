"use client";

import { useState } from "react";
import type { GraphRagRun } from "@/data/researchLab";

const plain = (s: string) => s.replace(/\*\*/g, "");

export default function GraphRagPanel(props: {
  summary: { date: string; model: string; answered: string; valid_cypher: string; refused: string };
  runs: GraphRagRun[];
}) {
  const [i, setI] = useState(0);
  const run = props.runs[i];
  const refused = run.status === "refused" || run.status === "blocked";

  return (
    <div>
      <div className="mb-6 mt-16">
        <p className="font-display text-sm text-accent-2">Step 05</p>
        <h2 className="mt-1 type-heading">AI on the graph</h2>
        <p className="mt-2 max-w-3xl text-muted">
          GraphRAG: Claude turns a plain-English question into a read-only Cypher query, a guard checks it, Neo4j runs it,
          and Claude answers only from the rows that come back. These are real answers, recorded from one run against an
          evaluation set — so this page needs no API keys.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
        {[
          { value: props.summary.answered, label: "Answers with the expected facts" },
          { value: props.summary.valid_cypher, label: "Queries that ran first time or after one self-correction" },
          { value: props.summary.refused, label: "Out-of-scope or write requests refused" },
        ].map((s) => (
          <div key={s.label} className="bg-background p-5 sm:p-6">
            <p className="text-gradient font-display text-4xl font-bold">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[20rem_1fr]">
        <ul className="max-h-[32rem] space-y-1.5 overflow-y-auto rounded-3xl border border-border bg-surface p-3" aria-label="Recorded questions">
          {props.runs.map((r, n) => (
            <li key={r.q}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-current={n === i}
                className={`w-full rounded-2xl px-3 py-2 text-left text-sm transition-colors ${
                  n === i ? "bg-accent text-background" : "text-foreground/85 hover:bg-background"
                }`}
              >
                {r.q}
              </button>
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="type-eyebrow text-accent">Claude’s answer</p>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  refused ? "bg-amber-300 text-background" : run.pass ? "bg-accent text-background" : "border border-red-400 text-red-300"
                }`}
              >
                {refused ? "Refused" : run.pass ? "Correct" : "Missed"}
              </span>
            </div>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground/90">{plain(run.answer)}</p>
          </div>
          <div className="rounded-3xl border border-border bg-background p-6">
            <p className="type-eyebrow text-accent">The Cypher Claude wrote</p>
            <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed text-foreground/85">
              <code>{run.cypher || "— no query: the request was refused before reaching the database"}</code>
            </pre>
          </div>
          <p className="text-xs text-muted">
            Recorded {props.summary.date} · {props.summary.model.replace("eu.anthropic.", "Anthropic ").replace(/-v\d+:\d+$/, "")} on Amazon
            Bedrock · Neo4j AuraDB · temperature 0
          </p>
        </div>
      </div>
    </div>
  );
}
