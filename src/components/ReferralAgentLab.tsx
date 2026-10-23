"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { AgentCase, ReferralData } from "@/data/referralAgent";

// Rules decided by the policy layer regardless of the threshold.
const FIXED = new Set(["HR1", "HR2", "HR3", "HR4", "HR5", "HR6", "data_protection", "no_decision"]);
const AUTO = new Set(["resolve", "close_as_duplicate"]);

const QUEUE: Record<string, string> = {
  financial_crime: "financial crime",
  fraud: "fraud",
  approvals: "approvals",
  merchant_risk: "merchant risk",
  complaints: "complaints",
};

const TOOL: Record<string, string> = {
  get_merchant: "Look up merchant",
  get_transaction: "Look up transaction",
  get_card_status: "Check card status",
  screen_sanctions: "Screen sanctions list",
  get_referral_history: "Check earlier referrals",
};

function label(decision: string, queue: string | null) {
  switch (decision) {
    case "resolve":
      return "Resolved with guidance";
    case "request_information":
      return "Asked for information";
    case "close_as_duplicate":
      return "Closed as a duplicate";
    case "escalate":
      return `Escalated to ${QUEUE[queue ?? ""] ?? queue}`;
    case "human_review":
      return "Sent to a person";
    default:
      return decision;
  }
}

type Final = { decision: string; queue: string | null; by: "rule" | "threshold" | "agent" };

// The policy layer, replayed: hard rules are fixed; the threshold applies to auto-resolutions.
function finalAt(c: AgentCase, threshold: number): Final {
  if (c.outcome.rule && FIXED.has(c.outcome.rule)) return { decision: c.outcome.decision, queue: c.outcome.queue, by: "rule" };
  const p = c.proposal;
  if (!p) return { decision: "human_review", queue: null, by: "rule" };
  if (AUTO.has(p.decision) && (p.confidence ?? 0) < threshold) return { decision: "human_review", queue: null, by: "threshold" };
  return { decision: p.decision, queue: p.queue, by: "agent" };
}

const same = (d: string, q: string | null, e: AgentCase["expected"]) => d === e.decision && (q ?? null) === (e.queue ?? null);

function scoreboard(cases: AgentCase[], threshold: number) {
  let governed = 0, agent = 0, wrongAuto = 0, over = 0, caught = 0;
  for (const c of cases) {
    const f = finalAt(c, threshold);
    const ok = same(f.decision, f.queue, c.expected);
    const agentOk = !!c.proposal && same(c.proposal.decision, c.proposal.queue, c.expected);
    governed += +ok;
    agent += +agentOk;
    wrongAuto += +(AUTO.has(f.decision) && !ok);
    over += +(["escalate", "human_review"].includes(f.decision) && !["escalate", "human_review"].includes(c.expected.decision));
    caught += +(ok && !agentOk);
  }
  return { n: cases.length, governed, agent, wrongAuto, over, caught };
}

function fmt(v: unknown): string {
  if (Array.isArray(v)) return v.length ? v.join("; ") : "none";
  if (typeof v === "number") return Number.isInteger(v) ? v.toLocaleString("en-GB") : v.toFixed(2);
  return String(v);
}

export default function ReferralAgentLab({ data }: { data: ReferralData }) {
  const [runKey, setRunKey] = useState<"governed" | "stress">("governed");
  const [threshold, setThreshold] = useState(Math.round(data.limits.auto_resolve_confidence * 100));
  const [showAll, setShowAll] = useState(false);
  const run = data.runs[runKey];
  const t = threshold / 100;
  const cases = useMemo(() => run.cases.filter((c) => showAll || c.showcase), [run, showAll]);
  const [selectedId, setSelectedId] = useState("R1008");
  const selected = run.cases.find((c) => c.id === selectedId) ?? cases[0];
  const score = useMemo(() => scoreboard(run.cases, t), [run, t]);
  const replayRef = useRef<HTMLDivElement>(null);

  // On phones the replay sits above the list, so bring it back into view on a tap.
  function pick(id: string) {
    setSelectedId(id);
    if (window.matchMedia("(max-width: 1023px)").matches) replayRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Shareable links: ?run=stress&case=R1009 opens on that run and case.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const r = q.get("run");
    const id = q.get("case");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off read of the URL after hydration
    if (r === "stress" || r === "governed") setRunKey(r);
    if (id && data.runs.governed.cases.some((c) => c.id === id)) {
      setSelectedId(id);
      if (!data.runs.governed.cases.find((c) => c.id === id)?.showcase) setShowAll(true);
    }
  }, [data]);

  return (
    <div>
      {/* Controls */}
      <div className="grid gap-6 rounded-3xl border border-border bg-surface p-6 sm:p-8 lg:grid-cols-[1fr_20rem] lg:items-end">
        <div>
          <p className="type-eyebrow text-muted">Which run</p>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Which run">
            {(["governed", "stress"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setRunKey(k)}
                aria-pressed={runKey === k}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  runKey === k ? "border-accent bg-accent text-on-accent" : "border-border hover:border-foreground"
                }`}
              >
                {data.runs[k].label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted">
            {run.rulesInPrompt
              ? "The agent was told the rules, and the policy layer enforces them as well."
              : "A smaller model, never told the rules: only the policy layer stands between it and a mistake."}
          </p>
        </div>
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <label htmlFor="threshold" className="text-foreground/85">Auto-resolve only above confidence</label>
            <span className="font-display font-bold text-accent">{t.toFixed(2)}</span>
          </div>
          <input
            id="threshold"
            type="range"
            min={50}
            max={95}
            step={5}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="mt-2 w-full accent-[var(--accent)]"
          />
          <p className="mt-1 text-xs text-muted">Below it, a case the agent wanted to close goes to a person instead.</p>
        </div>
      </div>

      {/* Scoreboard across all 30 cases */}
      <ul className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-5">
        {[
          { v: `${score.governed}/${score.n}`, l: "Correct after the policy layer" },
          { v: `${score.agent}/${score.n}`, l: "Correct by the agent alone" },
          { v: score.caught, l: "Mistakes caught by the policy layer" },
          { v: score.wrongAuto, l: "Wrong auto-resolutions (the costly error)" },
          { v: score.over, l: "Handed over when it didn't need to be" },
        ].map((m, i) => (
          <li key={m.l} className={`bg-background p-5 ${i === 4 ? "col-span-2 lg:col-span-1" : ""}`}>
            <span className="text-gradient type-heading">{m.v}</span>
            <span className="mt-2 block text-sm leading-snug text-muted">{m.l}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-6 lg:grid-cols-[22rem_1fr]">
        {/* Case list */}
        <div className="order-2 lg:order-none">
          <div className="flex items-center justify-between">
            <p className="type-eyebrow text-muted">{showAll ? "All 30 cases" : "15 showcase cases"}</p>
            <button type="button" onClick={() => setShowAll((s) => !s)} className="text-sm text-accent hover:underline">
              {showAll ? "Showcase only" : "Show all 30"}
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {cases.map((c) => {
              const f = finalAt(c, t);
              const ok = same(f.decision, f.queue, c.expected);
              const agentOk = !!c.proposal && same(c.proposal.decision, c.proposal.queue, c.expected);
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => pick(c.id)}
                    aria-current={selected?.id === c.id}
                    className={`w-full rounded-2xl border p-3 text-left transition-colors ${
                      selected?.id === c.id ? "border-accent bg-accent/[0.06]" : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold leading-snug">{c.title}</span>
                      <span className={`shrink-0 text-sm font-bold ${ok ? "text-accent-3" : "text-accent"}`} aria-label={ok ? "correct" : "wrong"}>
                        {ok ? "✓" : "✗"}
                      </span>
                    </span>
                    <span className="mt-1 flex flex-wrap gap-x-3 text-xs text-muted">
                      <span>{label(f.decision, f.queue)}</span>
                      {ok && !agentOk && <span className="font-semibold text-accent">Caught by policy</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Replay */}
        <div ref={replayRef} className="order-1 scroll-mt-20 lg:order-none">
          {selected && <Replay c={selected} threshold={t} />}
        </div>
      </div>

      {/* Governance */}
      <div className="mt-12 rounded-3xl border border-border bg-surface p-6 sm:p-8">
        <p className="type-eyebrow text-accent">The governance, written down</p>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">The policy the agent runs under</h3>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="font-semibold">Hard rules, enforced in code</h4>
            <ul className="mt-3 space-y-3 text-sm">
              {data.hardRules.map((r) => (
                <li key={r.id} className="leading-relaxed">
                  <span className="font-display font-bold text-accent">{r.id}</span> <span className="font-semibold">{r.name}.</span>{" "}
                  <span className="text-muted">When {r.when}: {r.then}.</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 text-sm">
            <div>
              <h4 className="font-semibold">Data protection</h4>
              <p className="mt-2 text-muted">The agent sees cards as a token and the last four digits only. It may never tell a merchant:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                {data.dataProtection.never_disclose_to_merchant.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Limits</h4>
              <p className="mt-2 text-muted">
                At most {data.limits.max_tool_calls_per_case} tool calls a case; one retry for a failed look-up; a case is
                only closed automatically at confidence {data.limits.auto_resolve_confidence.toFixed(2)} or above (the slider).
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Approved tools</h4>
              <p className="mt-2 text-muted">{data.approvedTools.join(", ")}. Nothing else is available to the agent.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Replay({ c, threshold }: { c: AgentCase; threshold: number }) {
  const f = finalAt(c, threshold);
  const ok = same(f.decision, f.queue, c.expected);
  const p = c.proposal;
  const ruleFired = c.outcome.rule && FIXED.has(c.outcome.rule) ? c.outcome.rule : null;
  const changed = !!p && (f.decision !== p.decision || (f.queue ?? null) !== (p.queue ?? null));
  const handover = "Thank you. A colleague is looking into this and will update you shortly.";
  const message = f.by === "agent" ? p?.message || c.outcome.message || handover : f.by === "threshold" ? handover : c.outcome.message;

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <p className="type-eyebrow text-muted">{c.id} · {c.merchant}</p>
      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{c.title}</h3>
      <blockquote className="mt-4 rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed">
        <span className="text-xs text-muted">The merchant wrote</span>
        <span className="mt-1 block">“{c.message}”</span>
      </blockquote>

      <h4 className="mt-6 font-semibold">What the agent did</h4>
      <ol className="mt-3 space-y-2 text-sm">
        {c.steps.map((s, i) =>
          s.kind === "lookup" ? (
            <li key={i} className="rounded-xl border border-border p-3">
              <span className="font-semibold">{TOOL[s.tool] ?? s.tool}</span>{" "}
              <span className="text-muted">({Object.values(s.input).join(", ")})</span>
              {s.error ? (
                <span className="mt-1 block font-semibold text-accent">Failed: {s.error}</span>
              ) : (
                <span className="mt-1 block text-muted">
                  {Object.entries(s.result ?? {})
                    .map(([k, v]) => `${k.replaceAll("_", " ")}: ${fmt(v)}`)
                    .join(" · ")}
                </span>
              )}
            </li>
          ) : null,
        )}
        {c.steps.length === 0 && <li className="text-muted">No look-ups.</li>}
      </ol>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border p-4">
          <p className="text-xs text-muted">The agent proposed</p>
          <p className="mt-1 font-semibold">{p ? label(p.decision, p.queue) : "No decision"}</p>
          {p?.confidence != null && (
            <>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-border" aria-hidden>
                <div className="h-full bg-accent" style={{ width: `${Math.round(p.confidence * 100)}%` }} />
              </div>
              <p className="mt-1 text-xs text-muted">Confidence {p.confidence.toFixed(2)} (threshold {threshold.toFixed(2)})</p>
            </>
          )}
        </div>
        <div className={`rounded-2xl border p-4 ${changed ? "border-accent" : "border-border"}`}>
          <p className="text-xs text-muted">The policy layer decided</p>
          <p className="mt-1 font-semibold">{label(f.decision, f.queue)}</p>
          <p className="mt-1 text-xs text-muted">
            {f.by === "rule" && ruleFired
              ? `Hard rule ${ruleFired} applies${changed ? ": the agent's proposal was overridden." : ", and the agent got there too."}`
              : f.by === "threshold"
                ? "Confidence below the threshold: a person decides."
                : "No rule applies; the agent's proposal stands."}
          </p>
        </div>
      </div>

      {c.outcome.guardrails.filter((g) => !g.startsWith("Hard rule")).length > 0 && (
        <ul className="mt-4 space-y-1 text-sm">
          {c.outcome.guardrails
            .filter((g) => !g.startsWith("Hard rule"))
            .map((g) => (
              <li key={g} className="text-accent">⚑ {g}</li>
            ))}
        </ul>
      )}

      <div className="mt-6 rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed">
        <span className="text-xs text-muted">Sent to the merchant</span>
        <span className="mt-1 block">{message}</span>
      </div>

      <p className={`mt-4 text-sm font-semibold ${ok ? "text-accent-3" : "text-accent"}`}>
        {ok ? "✓ Matches" : "✗ Doesn't match"} the expected outcome: {label(c.expected.decision, c.expected.queue)}.
      </p>
    </div>
  );
}
