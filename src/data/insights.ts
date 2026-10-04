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
  | { type: "note"; text: string } // editor's note for drafts — shown locally only
  // Diagrams and tables, drawn by the article page.
  | { type: "stages"; caption: string; items: { name: string; when: string; goal: string; outputs: string[] }[] }
  | { type: "roles"; caption: string; tiers: { tier: string; purpose: string; roles: { name: string; does: string }[] }[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][]; sources?: { label: string; href: string }[] };

/** The readable words in a block, for reading time. */
function blockWords(b: Block): string[] {
  switch (b.type) {
    case "list":
      return b.items;
    case "stages":
      return b.items.flatMap((i) => [i.name, i.goal, ...i.outputs]);
    case "roles":
      return b.tiers.flatMap((t) => [t.purpose, ...t.roles.flatMap((r) => [r.name, r.does])]);
    case "table":
      return b.rows.flat();
    default:
      return [b.text];
  }
}

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
  {
    slug: "starting-data-governance",
    title: "Starting data governance: where to begin, who you need and how long it takes",
    dek: "A practical route from first conversation to governance that runs itself — the stages, the roles and an honest timeline. Plus what Gartner's 2026 Magic Quadrant does and doesn't tell you about tools.",
    date: "2026-10-04",
    status: "published",
    tags: ["Data governance", "Operating model", "Data strategy", "Tools"],
    caseStudy: "pitney-bowes",
    blocks: [
      {
        type: "p",
        text: "Most organisations start data governance in the wrong place: with a tool. A catalogue gets bought, a few hundred tables get scanned, and six months later nobody is using it — because nobody was ever made responsible for what the data means.",
      },
      {
        type: "p",
        text: "I've seen governance from three sides: running governance due-diligence workshops with financial services, professional services and retail clients as a pre-sales architect; building the data steward model behind a single customer view at Allianz UK; and leading metadata curation for payment platforms at Discover. The lesson is the same from every side: start with a business problem, not a platform.",
      },
      { type: "h2", text: "Where to start: one question" },
      {
        type: "p",
        text: "Ask: which decision, obligation or customer outcome is going wrong because of data? A regulator's report you can't trace. Customers counted twice. An AI use case blocked because nobody trusts the training data. That answer tells you your first data domain, your sponsor and your first measure of success.",
      },
      {
        type: "list",
        items: [
          "Regulatory pressure (GDPR, KYC, PCI DSS, BCBS 239) — start with the data the regulator asks about.",
          "Customer experience — start with customer data: duplicates, addresses, consent.",
          "AI readiness — start with the data your first AI use case depends on, and who may use it.",
        ],
      },
      { type: "h2", text: "The five stages" },
      {
        type: "p",
        text: "Governance isn't a project with an end date. But it does have stages, and each one has to earn the next.",
      },
      {
        type: "stages",
        caption: "From first conversation to governance that runs itself — typical timings for a mid-to-large organisation",
        items: [
          {
            name: "Discover",
            when: "Weeks 0–6",
            goal: "Find the business problem worth solving first.",
            outputs: ["Pain points and the data behind them", "A sponsor who owns the outcome", "Maturity baseline", "First domain chosen"],
          },
          {
            name: "Mobilise",
            when: "Months 1–3",
            goal: "Set up who decides what — before any tool.",
            outputs: ["Charter and principles", "Governance council", "Owners and stewards named", "Success measures agreed"],
          },
          {
            name: "Prove",
            when: "Months 3–9",
            goal: "Make one domain demonstrably better.",
            outputs: ["Critical data elements defined", "Business glossary", "Quality rules and a scorecard", "Issue and change process"],
          },
          {
            name: "Scale",
            when: "Months 9–18",
            goal: "Repeat the pattern; now bring in tooling.",
            outputs: ["More domains onboarded", "Catalogue and lineage", "Policies turned into controls", "Quality dashboards"],
          },
          {
            name: "Embed",
            when: "Year 2–3, then ongoing",
            goal: "Governance becomes how delivery works.",
            outputs: ["Governance by design in every project", "Automated controls", "AI and data product governance", "Federated ownership"],
          },
        ],
      },
      {
        type: "p",
        text: "Notice where the tool appears: stage four. By then you know your owners, your definitions and your rules — so the tool automates a working process instead of becoming a very expensive spreadsheet.",
      },
      { type: "h2", text: "The roles you need" },
      {
        type: "p",
        text: "Governance is an operating model, not a team. Most of the people in it already have day jobs; governance makes part of that job explicit. Three tiers work for most organisations.",
      },
      {
        type: "roles",
        caption: "A three-tier governance operating model",
        tiers: [
          {
            tier: "Strategic",
            purpose: "Sets direction, funds it and settles disputes.",
            roles: [
              { name: "Executive sponsor", does: "Owns the business outcome and clears the way." },
              { name: "Governance council", does: "Senior data owners who approve policies and resolve conflicts." },
              { name: "CDO or head of data", does: "Leads the programme and reports progress to the board." },
            ],
          },
          {
            tier: "Tactical",
            purpose: "Turns direction into policies, standards and priorities.",
            roles: [
              { name: "Data owners", does: "Business leaders accountable for a domain — customer, product, finance." },
              { name: "Governance office", does: "A small team running the framework, metrics and communications." },
              { name: "Data architect", does: "Models, standards and lineage across systems." },
              { name: "Privacy, risk and security", does: "Make sure policies meet regulatory and security obligations." },
            ],
          },
          {
            tier: "Operational",
            purpose: "Does the daily work that keeps data trusted.",
            roles: [
              { name: "Business data stewards", does: "Define terms, set quality rules and work the review queue." },
              { name: "Technical stewards", does: "Implement controls, lineage and fixes in the platforms." },
              { name: "Data quality analysts", does: "Measure, investigate and report on quality." },
              { name: "AI governance lead", does: "Applies the same rules to models and agents: sources, thresholds, oversight." },
            ],
          },
        ],
      },
      {
        type: "p",
        text: "Two of these matter more than people expect. Data owners must sit in the business, not IT — if IT owns the data, the business will never own its quality. And stewards need time in their job description, not goodwill: at Allianz UK the stewards both worked the review queue and sampled what the system merged on its own, and that sampling is how we knew the rules still held.",
      },
      { type: "h2", text: "How long it takes" },
      {
        type: "list",
        items: [
          "First visible value: three to six months, in one domain, if you start from a real problem.",
          "A working foundation — operating model, glossary, quality scorecards across the priority domains: twelve to eighteen months.",
          "Governance that's embedded in how projects are delivered: two to three years.",
          "Done: never. Like security, it's a capability you run, not a project you finish.",
        ],
      },
      {
        type: "p",
        text: "The fastest programmes aren't the best funded. They're the ones that pick a narrow first domain, show a measurable improvement — fewer duplicates, a report that reconciles, a model that can be approved — and use that to earn the next domain.",
      },
      { type: "h2", text: "Tools: what Gartner's 2026 Magic Quadrant says" },
      {
        type: "p",
        text: "In January 2026, Gartner published its Magic Quadrant for Data and Analytics Governance Platforms, evaluating 15 vendors. As publicly reported, they were placed as follows.",
      },
      {
        type: "table",
        caption: "Gartner Magic Quadrant for Data and Analytics Governance Platforms, January 2026 — vendors by quadrant, alphabetical. Gartner does not endorse any vendor; its research reflects its analysts' opinions",
        head: ["Quadrant", "Vendors"],
        rows: [
          ["Leaders", "Alation, Atlan, Collibra, IBM, Informatica"],
          ["Challengers", "BigID, Microsoft"],
          ["Visionaries", "ServiceNow"],
          ["Niche Players", "Ab Initio, Alex Solutions, Ataccama, DataGalaxy, OvalEdge, Precisely, Solidatus"],
        ],
        sources: [
          { label: "AI, Data & Analytics Network: Gartner rates 15 platforms", href: "https://www.aidataanalytics.network/data-governance/news-trends/gartner-rates-15-data-analytics-governance-platforms-in-new-magic-quadrant" },
          { label: "Informatica: complimentary copy of the report", href: "https://www.informatica.com/data-governance-magic-quadrant.html" },
        ],
      },
      {
        type: "p",
        text: "Gartner's commentary points the same way as this article: away from static catalogues towards automated, AI-ready governance across structured and unstructured data. It expects that by 2027, 60% of governance teams will prioritise unstructured data to deliver generative AI use cases.",
      },
      {
        type: "p",
        text: "A quadrant measures vendors, not fit. How I'd use it:",
      },
      {
        type: "list",
        items: [
          "Start from your estate. If you're largely on Microsoft, its own governance tooling may be enough for stages two and three. If you run IT on ServiceNow, its new governance offering deserves a look.",
          "Start from your first problem. If it's finding and protecting sensitive data for privacy, that's a different shortlist from building an enterprise catalogue.",
          "Treat Niche Players seriously for specific jobs. Several are strong in data quality, lineage or regulatory reporting — I delivered GDPR and KYC solutions on Pitney Bowes Spectrum, now part of Precisely.",
          "Run a proof of concept on your own data, with your own stewards, before you sign. The demo is never the hard part.",
        ],
      },
      { type: "h2", text: "Five mistakes to avoid" },
      {
        type: "list",
        items: [
          "Buying the tool first. Tools automate a process; they don't create one.",
          "Boiling the ocean. Governing every domain at once guarantees governing none of them well.",
          "Letting IT own it. Technology supports governance; the business owns the data.",
          "Policies without stewards. A policy nobody operates is a document, not a control.",
          "No measures. If you can't show quality improving, the funding stops — and it should.",
        ],
      },
      {
        type: "quote",
        text: "Start with the decision that's going wrong, not the platform you'd like to buy.",
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
    .flatMap(blockWords)
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
