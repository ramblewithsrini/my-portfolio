// Articles for the Insights section (/insights).
//
// Drafts are only visible when running locally (`npm run dev`) — never on the
// live site. To publish an article, resolve every "note" block, delete them,
// and set `status: "published"`. The Insights link appears in the nav once at
// least one article is published.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "note"; text: string }; // editor's note for drafts — shown locally only

export type Article = {
  slug: string;
  title: string;
  dek: string; // one-line summary under the title
  date: string; // YYYY-MM-DD
  status: "draft" | "published";
  tags: string[];
  caseStudy?: string; // related role slug, linked at the end of the article
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "absorbing-a-360-percent-surge",
    title: "Absorbing a 360% surge with the same team",
    dek: "What a post-merger volume spike taught me about putting Agentic AI to work — safely — in a regulated payments business.",
    date: "2026-10-03",
    status: "published",
    tags: ["Agentic AI", "Payments", "Leadership", "Mergers"],
    caseStudy: "discover",
    blocks: [
      {
        type: "p",
        text: "When Discover joined Capital One, the referrals flowing into our Referral Management Service went up by 360%. A referral is what a merchant raises when a particular transaction doesn't go through — and every one of them needs looking at. Not 36% more of them: four and a half times as many.",
      },
      {
        type: "p",
        text: "The obvious answer was to bring in a wave of temporary contractors. Instead, we put Agentic AI to work alongside the same customer service centre team — and kept the work within SLA.",
      },
      { type: "h2", text: "The problem behind the number" },
      {
        type: "p",
        text: "Mergers create work in waves. As the Capital One network transition progressed, referrals arrived far faster than any team could triage them. Hiring and training takes months, and a surge driven by a one-off integration doesn't justify a permanently larger team. We needed capacity that could flex — without lowering the bar in a regulated environment.",
      },
      { type: "h2", text: "Why Agentic AI — and why governed" },
      {
        type: "p",
        text: "We weren't starting from zero. We had already applied governed Agentic AI to vulnerability identification and audit monitoring, so the guardrails a regulated payments business needs — controls, auditability and clear accountability — were already in place. That's what made moving quickly possible.",
      },
      { type: "h2", text: "What we built" },
      {
        type: "p",
        text: "We built an AI agent that sits at the front of the Referral Management Service. It triages and classifies every incoming referral, prioritises it using an algorithm, and resolves the simple cases on its own.",
      },
      {
        type: "p",
        text: "Everything else reaches the team already classified and in priority order — so people spend their time on the referrals that genuinely need human judgement, starting with the most urgent. From decision to go-live took four months.",
      },
      { type: "h2", text: "The result" },
      {
        type: "list",
        items: [
          "The same customer service centre team absorbed a 360% increase in referrals.",
          "Work stayed within SLA through the surge.",
          "We needed fewer temporary contractors than the surge would otherwise have demanded.",
        ],
      },
      { type: "h2", text: "What I'd tell another technology leader" },
      {
        type: "list",
        items: [
          "Start with the bottleneck, not the technology. We knew exactly where the work was piling up before we chose the tool.",
          "Governance first makes speed possible. Because the guardrails already existed, we went from decision to live in four months — in a regulated payments business.",
          "Let AI take the volume; keep people on the judgement. The agent cleared the simple cases and ordered the rest, and the team stayed accountable for the outcome.",
        ],
      },
      {
        type: "quote",
        text: "The question in a surge isn't 'how many people do we need?' It's 'which work actually needs a person?'",
      },
    ],
  },
];

export const showDrafts = process.env.NODE_ENV !== "production";

export const visibleArticles = articles
  .filter((a) => a.status === "published" || showDrafts)
  .sort((a, b) => b.date.localeCompare(a.date));

export const hasPublishedArticles = articles.some((a) => a.status === "published");

/** Approximate reading time in minutes (220 words a minute). */
export function readingTime(article: Article) {
  const words = article.blocks
    .filter((b) => b.type !== "note")
    .flatMap((b) => ("items" in b ? b.items : [b.text]))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
