// Content for the governed AI agent lab (/lab/referral-agent).
// Srini Pay, its merchants, people, cards and sanctions list are all invented.

import runs from "./referral-runs.json";

// Drafts are visible only in local development; set to true to put the page live.
export const referralLabPublished = true;

export type Step =
  | { kind: "lookup"; tool: string; input: Record<string, string>; result?: Record<string, unknown>; error?: string }
  | { kind: "action"; tool: string };

export type AgentCase = {
  id: string;
  title: string;
  showcase: boolean;
  merchant: string;
  message: string;
  transaction: string | null;
  steps: Step[];
  proposal: { decision: string; queue: string | null; confidence: number | null; reason?: string | null; message?: string | null } | null;
  outcome: { decision: string; queue: string | null; rule: string | null; overridden: boolean; guardrails: string[]; message: string };
  expected: { decision: string; queue: string | null; rule: string | null };
  toolCalls: number;
  seconds: number;
};

export type Run = { label: string; model: string; rulesInPrompt: boolean; cases: AgentCase[] };

export type ReferralData = {
  network: string;
  hardRules: { id: string; name: string; when: string; then: string }[];
  limits: { max_tool_calls_per_case: number; tool_retries: number; auto_resolve_confidence: number };
  dataProtection: { card_data_visible_to_agent: string; never_disclose_to_merchant: string[] };
  approvedTools: string[];
  runs: { governed: Run; stress: Run };
};

// Runs recorded from the real agent (Claude on Amazon Bedrock, Python), replayed
// as-is so the public page needs no API keys and costs nothing to run.
export const referralData = runs as unknown as ReferralData;

export const referralIntro = {
  eyebrow: "Lab · Agentic AI",
  title: "An AI agent that knows",
  titleAccent: "when to hand over.",
  lead: "Merchants raise a referral when a card payment doesn't go through. This agent works each one like an analyst would: it looks up the merchant, the transaction and the card, screens names against a sanctions list, checks the history, then resolves the case, asks for information, or hands it to a person. A policy layer outside the AI decides what actually happens, so the rules hold even when the AI gets it wrong.",
  disclaimer:
    "Srini Pay is a fictional card network: every merchant, person, card, transaction and sanctions entry here is invented. The demo shows how I would build a governed agent today. It is not any employer's system, and the agent I led at a previous employer used rules and machine learning, not a large language model.",
};

export const referralSteps = [
  { n: "01", title: "A referral arrives", body: "A merchant's note, a merchant ID and, usually, a transaction reference." },
  { n: "02", title: "The agent investigates", body: "Claude calls look-up tools: merchant, transaction, card, sanctions, history." },
  { n: "03", title: "It proposes an outcome", body: "Resolve, ask for information, escalate, or hand to a person, with its confidence." },
  { n: "04", title: "The policy layer decides", body: "Hard rules and a confidence threshold, enforced in code the AI can't override." },
  { n: "05", title: "Measured", body: "30 labelled cases, including traps: near-misses, prompt injection and outages." },
];
