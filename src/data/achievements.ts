// Home page "Achievements": one list, three lenses. A card can sit under
// several lenses; the filter buttons show the cards tagged with that lens.
// Public wording rules apply (no team sizes, budgets or internal names).
// Employers are described by industry here; the linked pages carry the names.

export type Lens = "architecture" | "leadership" | "data" | "advisory";

// Key order sets the order of the filter buttons and the lens bands.
export const lensLabels: Record<Lens, string> = {
  leadership: "Leadership",
  architecture: "Architecture",
  data: "Data & AI",
  advisory: "Advisory & Transformation",
};

// One line under each lens band, saying what the lens covers.
export const lensSummaries: Record<Lens, string> = {
  architecture: "Enterprise integration, platforms built to carry real load, and the decisions that kept them safe.",
  data: "Data people trust, and AI that's governed before it's scaled.",
  leadership: "Teams across three countries, platforms modernised, partners held to account and a practice built from zero.",
  advisory: "Change sold, shaped and steered: pre-sales, innovation labs, a network migration and post-merger convergence.",
};

export type Stat = { value: string; label: string; href: string };

// Headline numbers, grouped by lens (these replace the old mixed impact grid).
export const lensStats: Record<Lens, Stat[]> = {
  architecture: [
    { value: "112", label: "Systems integrated for a major national airline, including Amadeus and Sabre", href: "/experience/tcs" },
    { value: "86", label: "Integrations designed for a global technology company's $500M Oracle Cloud programme", href: "/experience/ricoh" },
    { value: "200M", label: "Transactions a day on the payment platforms I owned the architecture for", href: "/experience/discover" },
    { value: "4 tiers", label: "Resilience model mapping every application to availability and recovery targets (SLO/SLA, RTO/RPO)", href: "/experience/discover" },
    { value: "CAD · INR", label: "Cross-border card processing for Canada and India, with in-country processing for India's data rules", href: "/experience/discover" },
    { value: "PCI DSS 4.0", label: "Delivered across the payment platforms: MFA, PAN tokenisation, centralised logging", href: "/experience/discover" },
  ],
  data: [
    { value: "21%", label: "Better customer-matching rates (master data)", href: "/insights/the-customers-we-couldnt-see" },
    { value: "95%", label: "Of data models governed and in sync with production", href: "/experience/discover" },
    { value: "27%", label: "Fewer support calls via an AI chatbot", href: "/experience/ricoh" },
    { value: "In production", label: "An AI vulnerability remediation assistant on Anthropic's Claude, with a person reviewing every fix", href: "/experience/discover" },
    { value: "AI policy", label: "Co-wrote my organisation's AI governance policy: approved tools, data rules, human review", href: "/experience/discover" },
    { value: "Open code", label: "Three public labs I built myself: a knowledge graph with GraphRAG, an MDM engine and a governed AI agent", href: "/lab" },
  ],
  leadership: [
    { value: "UK · India · US", label: "Teams led across three countries, run as one organisation", href: "/experience/discover" },
    { value: "Full stack", label: "Front-end, back-end, data and identity teams, shipping AI in production", href: "/experience/discover" },
    { value: "80–90%", label: "Faster deployments after my teams modernised the platforms onto OpenShift on AWS", href: "/experience/discover" },
    { value: "4x", label: "Team velocity in six months of AI-assisted delivery (10–15 → 45–60 story points a sprint)", href: "/experience/discover" },
    { value: "8 years", label: "Leading delivery through system integrators and outsourced partners", href: "/leadership#partner-to-account" },
    { value: "£1.5M+", label: "A year from an architecture practice I built from zero", href: "/experience/interglobe" },
    { value: "#1", label: "Top-rated manager of a larger team, company-wide (2025 survey)", href: "/leadership" },
    { value: "Near-zero", label: "Attrition: one person left in three years, by choice", href: "/leadership#trusted" },
    { value: "Deputy Chair", label: "Enterprise design governance board, 50–75 designs a year", href: "/experience/discover" },
  ],
  advisory: [
    { value: "$50M", label: "Pre-sales wins contributed to, from 20+ bids led", href: "/experience/tcs" },
    { value: "2 labs", label: "Airline innovation labs I architected or helped build, demoed to airline leaders", href: "/experience/tcs" },
    { value: "2026", label: "Debit portfolio moved from Visa and Mastercard onto our own payment network, proven live before cutover", href: "/experience/discover" },
    { value: "73 → 5–7", label: "Days to onboard a partner", href: "/experience/discover" },
    { value: "Many → 1", label: "Overlapping partner portals consolidated into one, cutting cost by 23%", href: "/experience/discover" },
    { value: "360%", label: "Surge absorbed with Agentic AI, same team", href: "/insights/absorbing-a-360-percent-surge" },
    { value: "M&A", label: "Post-merger convergence, decided application by application", href: "/insights/converging-144-applications-after-a-merger" },
    { value: "Since 2007", label: "Speaking at industry conferences, including IBM's MDM conference at Hursley", href: "/experience/pitney-bowes" },
    { value: "3x", label: "Employee of the Year on client accounts, plus a Game Changer Award", href: "/experience/tcs" },
  ],
};

export type Achievement = {
  title: string;
  outcome: string;
  lenses: Lens[];
  href: string;
  linkLabel: string; // "Read the case study", "Read the story" or "See the details"
};

export const achievementsIntro = {
  title: "Achievements",
  // One line per lens, in the same order as the buttons; the first is highlighted.
  headlineLines: ["Leading teams.", "Designing platforms.", "Steering change."],
  body: "The same career, seen three ways. Pick a lens to see the numbers and the stories behind the teams and practices I built, the platforms I designed, and the change I steered.",
};

export const achievements: Achievement[] = [
  {
    title: "An airline-wide integration platform",
    outcome: "Lead Solution Architect for a major national airline's $25M programme: an ESB on the IBM integration suite connecting 112 systems, including Amadeus and Sabre, replacing costly home-grown middleware.",
    lenses: ["architecture", "advisory"],
    href: "/experience/tcs",
    linkLabel: "See the details",
  },
  {
    title: "One integration design for an Oracle Cloud move",
    outcome: "Owned the integration design for a global technology company's $500M programme: 86 integrations on Oracle Integration and MQ, MuleSoft as the API gateway, and one pattern catalogue that readied the company for Oracle Cloud.",
    lenses: ["architecture", "advisory"],
    href: "/experience/ricoh",
    linkLabel: "See the details",
  },
  {
    title: "Moving a card portfolio onto a new payment network",
    outcome: "After the merger, led the authorisation and tokenisation changes and coordinated settlement and disputes to move the debit portfolio from Visa and Mastercard onto our own network, proven with live end-to-end transactions before cutover. Completed in 2026.",
    lenses: ["architecture", "advisory", "leadership"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "Kept a critical mainframe running, safely",
    outcome: "Recommended a significant failover investment instead of a rushed replacement; the CIO agreed, with an exit roadmap alongside.",
    lenses: ["architecture", "advisory"],
    href: "/insights/saying-no-safely",
    linkLabel: "Read the case study",
  },
  {
    title: "API platforms built for reuse",
    outcome: "Apigee and MuleSoft API platforms, with OpenAPI and AsyncAPI contracts, an API catalogue and policy as code in CI/CD.",
    lenses: ["architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "An AI vulnerability remediation assistant",
    outcome: "Built on Anthropic's Claude: scans production libraries, flags vulnerable versions and suggests fixes, with a person reviewing every fix.",
    lenses: ["data", "architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "Payments, end to end",
    outcome: "Platforms covering partner onboarding with KYB checks, authorisation, tokenisation, settlement and disputes, including cross-border processing for Canada and India.",
    lenses: ["architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "A resilience tier for every application",
    outcome: "Mapped every application in the estate to a four-tier resilience model, with latency, availability and recovery targets set through the design board, and failover tested every six months by SRE.",
    lenses: ["architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "AI governance before AI adoption",
    outcome: "Co-wrote my organisation's AI governance policy (approved tools, what data may go in, human review, risk and monitoring), evaluated Copilot, Claude and Agentforce, then rolled out AI-assisted delivery in three stages.",
    lenses: ["data", "leadership"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "A governed AI agent, live in four months",
    outcome: "An agent built on rules and machine learning, with a person in the loop, went live in four months and absorbed a 360% post-merger surge with the same team.",
    lenses: ["data", "leadership"],
    href: "/insights/absorbing-a-360-percent-surge",
    linkLabel: "Read the case study",
  },
  {
    title: "Identity resolution for global banks",
    outcome: "Identity resolution and business hierarchies for global banks, and KYB checks built into partner onboarding; presented graph-based identity resolution at a data conference in Dallas.",
    lenses: ["data", "advisory"],
    href: "/experience/pitney-bowes",
    linkLabel: "See the details",
  },
  {
    title: "Still hands-on",
    outcome: "Three labs I built and published with open code: a knowledge graph with entity resolution and GraphRAG, an MDM matching engine, and a governed AI agent with a replayable stress test.",
    lenses: ["data", "architecture"],
    href: "/lab",
    linkLabel: "See the labs",
  },
  {
    title: "Platform modernisation, from customer experience to modern architecture",
    outcome: "My teams rebuilt the partner portal from scratch on React with single sign-on, and moved a 14-year-old payments portfolio from WebSphere and Java 8 to OpenShift on AWS, Java 21 and Spring Boot 3, with no customer disruption.",
    lenses: ["leadership", "architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "Front-end, back-end and data teams across three countries",
    outcome: "React front ends, Java microservices, data, identity and Salesforce teams across the UK, India and the US, run as one organisation and shipping AI in production.",
    lenses: ["leadership"],
    href: "/leadership#trusted",
    linkLabel: "Read the story",
  },
  {
    title: "Delivering through partners, and holding them to account",
    outcome: "Eight years leading delivery through system integrators and outsourced teams: escalating with evidence when a partner fell behind, and refusing to sign off work that wasn't built as designed.",
    lenses: ["leadership"],
    href: "/leadership#partner-to-account",
    linkLabel: "Read the story",
  },
  {
    title: "Hiring for the gaps, growing people",
    outcome: "Hired for the team's gaps and for potential, ran an architecture community of practice across the company, defined career pathways for architects and coached people to AWS certification. Near-zero attrition followed.",
    lenses: ["leadership"],
    href: "/leadership#visible",
    linkLabel: "Read the story",
  },
  {
    title: "An architecture practice built from zero",
    outcome: "Grew a function across the UK, US and India to £1.5M+ a year, with shared standards and methods, while staying hands-on in client architecture.",
    lenses: ["leadership", "advisory"],
    href: "/experience/interglobe",
    linkLabel: "See the details",
  },
  {
    title: "AI-assisted delivery, rolled out in three stages",
    outcome: "Team velocity rose from 10–15 to 45–60 story points a sprint within six months.",
    lenses: ["leadership", "data"],
    href: "/insights/leading-distributed-teams-through-agentic-ai",
    linkLabel: "Read the article",
  },
  {
    title: "Deputy Chair, enterprise design governance board",
    outcome: "Reviewed 50–75 designs a year across the company, with ADRs and delegated approvals.",
    lenses: ["leadership", "architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "PCI DSS 4.0, delivered",
    outcome: "MFA, PAN tokenisation, centralised logging and unsupported software retired across the payment platforms, evidenced to auditors.",
    lenses: ["leadership", "architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
  {
    title: "Leadership stories, including the estimate I got wrong",
    outcome: "Owned a six-week slip, re-planned it openly, and the project was delivered and recognised.",
    lenses: ["leadership"],
    href: "/leadership#estimate",
    linkLabel: "Read the story",
  },
  {
    title: "Airline innovation labs",
    outcome: "Architected an airline innovation lab whose demos were shown to airline CEOs and CTOs and used by major airlines, then helped build a second lab and presented it to a major Gulf airline.",
    lenses: ["advisory", "architecture"],
    href: "/experience/tcs",
    linkLabel: "See the details",
  },
  {
    title: "On stage and recognised",
    outcome: "Speaking at industry conferences since 2007, including IBM's MDM conference at Hursley and a data conference in Dallas. Employee of the Year on three client accounts, and a Game Changer Award for growing a client account into a second business line.",
    lenses: ["advisory", "leadership"],
    href: "/experience/pitney-bowes",
    linkLabel: "See the details",
  },
  {
    title: "Pre-sales that won work",
    outcome: "Led 20+ bids and RFP responses and contributed to $50M of wins, then took data clients, including global banks, from first workshop to working solution.",
    lenses: ["advisory"],
    href: "/experience/tcs",
    linkLabel: "See the details",
  },
  {
    title: "A post-merger integration playbook",
    outcome: "Map the combined estate (LeanIX, capability map, Gartner TIME), test it for the combined load, then rationalise.",
    lenses: ["advisory"],
    href: "/what-i-bring",
    linkLabel: "See the details",
  },
  {
    title: "A multimillion-pound convergence after a merger",
    outcome: "Won executive approval for more than a hundred applications by deciding, one at a time, what deserved to survive.",
    lenses: ["advisory", "leadership", "architecture"],
    href: "/insights/converging-144-applications-after-a-merger",
    linkLabel: "Read the case study",
  },
  {
    title: "A single customer view for a large insurer",
    outcome: "Matching rates 21% better, and a household view that let marketing cross-sell.",
    lenses: ["data", "advisory", "architecture"],
    href: "/insights/the-customers-we-couldnt-see",
    linkLabel: "Read the case study",
  },
  {
    title: "Many partner portals into one",
    outcome: "10–12 overlapping portals consolidated into one, with one login, cutting cost by 23%.",
    lenses: ["advisory", "architecture"],
    href: "/experience/discover",
    linkLabel: "See the details",
  },
];
