// "How I can help" page (URL: /what-i-bring): one section per kind of role. Each section has an
// anchor (/what-i-bring#<id>) so a tailored link can go with each application.
//
// `quote` must be a verbatim excerpt from src/data/testimonials.ts (checked at
// build time). `caseStudies` are role slugs from src/data/portfolio.ts.

export type RoleValue = {
  id: string;
  label: string; // short label for the role switcher
  title: string;
  focus: string; // short line on the role card
  headline: string;
  intro: string;
  valueTitle: string; // heading above the value points, written as a sentence
  value: string[];
  evidence: { value: string; label: string }[];
  quote: string;
  caseStudies: string[];
  moreLink?: { href: string; label: string }; // extra link next to the case studies
  first90: { step: string; body: string }[];
  // Optional feature panel, e.g. "How I make architecture decisions".
  panel?: {
    eyebrow: string;
    title: string;
    lead: string;
    items: { title: string; body: string; example: string }[];
  };
};

export const valueIntro = {
  eyebrow: "How I can help",
  title: "One leader.",
  titleAccent: "Four ways to add value.",
  lead: "I'm open to architecture, data, engineering leadership and client-facing roles. Choose the one you're hiring for — each section shows what I'd bring, the results behind it, and how I'd start.",
};

export const roleValues: RoleValue[] = [
  {
    id: "architect",
    valueTitle: "Where I'll make the difference to your architecture",
    label: "Architect",
    title: "Enterprise & Solution Architect",
    focus: "Target states, integration and decisions",
    headline: "Architecture that earns its place in business decisions.",
    intro:
      "Twenty-five years from developer to TOGAF-certified enterprise architect. I design target states that are fundable, deliverable and owned by the teams who run them — and I stay with them until they land.",
    value: [
      "North Stars and target architectures tied to investment cases — like the £40M, 144-platform convergence at Discover",
      "Modern patterns applied pragmatically: event-driven, DDD, CQRS, hexagonal, multi-region cloud",
      "Integration at scale — from 112 airline systems to Oracle Cloud and enterprise API management",
      "AI designed in, not bolted on — like an API-integrated chatbot on Ricoh's customer portals",
      "Regulation built in from the start: PCI DSS 4.0, GDPR, KYC",
    ],
    evidence: [
      { value: "73 → 5–7", label: "Days to onboard a partner, after platform convergence" },
      { value: "$500M", label: "Oracle Cloud transformation — evaluation and integration architecture" },
      { value: "112", label: "Systems integrated for Saudia" },
    ],
    quote:
      "Srini has a remarkable ability to design complex architectures and, equally importantly, articulate them in a way that makes them easy for everyone on the team to understand.",
    caseStudies: ["discover", "ricoh", "tcs"],
    panel: {
      eyebrow: "How I work",
      title: "How I make architecture decisions",
      lead: "Good architecture is a series of well-made, well-explained decisions. This is the loop I run — and where I've run it.",
      items: [
        {
          title: "Start from the outcome",
          body: "Anchor every decision in the business result and its constraints — cost, risk, regulation and time — before any technology.",
          example: "At Ricoh, the Oracle Cloud evaluation started from the business's challenges, not the product.",
        },
        {
          title: "Frame options, not answers",
          body: "Put two or three real options on the table, including build, buy and partner, with the trade-offs made explicit.",
          example: "Build-buy-partner decisions with ServiceNow, Salesforce and MongoDB at Discover.",
        },
        {
          title: "Decide in the open",
          body: "Record the decision and the reasoning, and ratify it in the right forum so it survives contact with delivery.",
          example: "Message patterns for BA's Travel Programme, ratified by its technical working group.",
        },
        {
          title: "Guardrails, not gatekeeping",
          body: "Turn decisions into principles, patterns and standards that let teams move fast without asking permission.",
          example: "Integration patterns and data quality guardrails across Ricoh's parallel workstreams.",
        },
        {
          title: "Revisit with evidence",
          body: "Measure what the decision was meant to change, and adjust when the evidence says so.",
          example: "Partner onboarding time at Discover, tracked through the convergence.",
        },
      ],
    },
    first90: [
      { step: "Listen", body: "Map the estate, the pain points and the decisions waiting to be made." },
      { step: "Frame", body: "Set a North Star and target architecture tied to business outcomes." },
      { step: "Land", body: "Agree a sequenced roadmap with early wins and governed standards." },
    ],
  },
  {
    id: "data",
    valueTitle: "Where I'll make the difference to your data and AI",
    label: "Head of Data & AI",
    title: "Head of Data & AI",
    focus: "Trusted data, MDM and governed AI",
    headline: "Data and AI that earn their keep — trusted, governed and in production.",
    intro:
      "BCS-certified in data management, I've led data from the architecture side — so strategy, governance and platforms are designed together, not bolted on. And I've put AI to work on top of that data, in production and with guardrails.",
    value: [
      "AI-ready data: trusted, governed data that analytics and AI can safely build on",
      "Governed AI in production — Agentic AI at Discover, conversational AI at Ricoh — with guardrails a regulator would recognise",
      "Single and household customer views on MDM that feed marketing and analytics",
      "Data strategy and governance: metadata curation, reference data, data quality and survivorship",
      "Modern data platforms: data at rest, OLTP/OLAP integration, data lakes and warehouses",
      "Regulatory data solutions: GDPR compliance for McDonald's, a KYC solution with EY",
    ],
    evidence: [
      { value: "21%", label: "Better MDM matching rates at Allianz UK" },
      { value: "4 months", label: "From decision to live: governed Agentic AI at Discover" },
      { value: "27%", label: "Fewer support-desk emails and calls via conversational AI at Ricoh" },
      { value: "95%", label: "Of 140+ data models in sync with production and governed, at Discover" },
    ],
    quote:
      "He had a rare ability to translate complicated architectural decisions into practical discussions, making him an outstanding partner to Product Management.",
    caseStudies: ["allianz", "discover", "ricoh", "pitney-bowes"],
    moreLink: { href: "/lab/mdm", label: "Try the MDM playground →" },
    first90: [
      { step: "Assess", body: "Map the data landscape, quality, lineage and regulatory exposure — and where AI could add value." },
      { step: "Govern", body: "Establish ownership, metadata, standards and AI guardrails people will actually use." },
      { step: "Deliver", body: "A funded roadmap linking data platforms and AI use cases to the business decisions they enable." },
    ],
  },
  {
    id: "engineering",
    valueTitle: "Where I'll make the difference to your teams",
    label: "Head of Engineering & Architecture",
    title: "Head of Engineering & Architecture",
    focus: "Teams, delivery and resilience",
    headline: "Engineering organisations that deliver — with people who want to stay.",
    intro:
      "I've led a 30-person architecture and engineering organisation through its managers, for payment platforms processing 200M transactions a day — through a merger, a platform convergence and a post-merger surge.",
    value: [
      "Leaders who grow leaders: clear decision rights, service ownership and coaching",
      "Functions built from the ground up, across the UK, US and India",
      "Teams that collaborate instead of protecting their silos — no blame, shared credit",
      "Resilience as a culture: multi-region design, CI/CD and automated quality gates",
      "Delivery at scale through mergers, platform convergence and volume surges",
      "Governed AI adoption that makes good teams faster",
    ],
    evidence: [
      { value: "8 of 8", label: "People who chose to stay after I turned their team around" },
      { value: "360%", label: "Post-merger surge absorbed with Agentic AI — same team, within SLA" },
      { value: "80–90%", label: "Shorter deployment lead time after my team's move to OpenShift" },
    ],
    quote:
      "Srini is a true servant leader. He puts his people first, consistently and without needing recognition for it, and the team's performance reflects that.",
    caseStudies: ["discover", "allianz", "interglobe"],
    moreLink: { href: "/leadership", label: "My leadership principles →" },
    first90: [
      { step: "Meet the people", body: "One-to-ones, team health, and what's getting in their way." },
      { step: "Clarify", body: "Ownership, decision rights and priorities everyone can explain." },
      { step: "Raise the bar", body: "Resilience, delivery cadence and engineering standards — together." },
    ],
  },
  {
    id: "presales",
    valueTitle: "Where I'll make the difference to your pipeline",
    label: "Pre-sales & Client Engagement",
    title: "Pre-sales & Client Engagement",
    focus: "Bids, workshops and client delivery",
    headline: "Propositions that win — and engagements that deliver what was sold.",
    intro:
      "15+ years client-facing at TCS, InterGlobe and Pitney Bowes — from RFI to go-live, building and running an architecture function, and on stage at industry conferences in Dallas and London. Then nine years as the buyer, at Allianz, Ricoh and Discover. I've sat on both sides of the table, so I know what makes a client say yes — and what makes them walk away.",
    value: [
      "Account growth that starts with delivery: earn the next business line through the current one",
      "Bid qualification that chases the right work: fit, capability and an honest view of the competition",
      "Discovery workshops and proofs of concept on the client's own ground",
      "Partnerships that extend a client's offering — like a KYC solution built with EY",
      "Executive presentations and conference talks that make complex solutions clear",
      "Delivery and enablement after the win, until the client is self-sufficient",
    ],
    evidence: [
      { value: "£1.5M+", label: "Annual revenue from the Architecture & Design function I built at IGT" },
      { value: "PSS → GSL", label: "SITA account grown into a second business line — IGT Game Changer Award, 2014" },
      { value: "$50M", label: "In wins I contributed to at TCS" },
    ],
    quote:
      "I was particularly impressed by Srini's ability to handle even the toughest clients. That skill often takes years to develop among Professional Services people, but it seemed to come perfectly naturally to him.",
    caseStudies: ["pitney-bowes", "tcs", "interglobe"],
    panel: {
      eyebrow: "The buyer's view",
      title: "I've been the client — recently",
      lead: "My in-house years were spent choosing, contracting and managing suppliers. That's the perspective I bring to every pursuit: proposals written for how buyers actually decide.",
      items: [
        {
          title: "Build, buy or partner",
          body: "I ran the decision from the client side — so I know how buyers weigh fit, risk and total cost.",
          example: "ServiceNow, Salesforce and MongoDB at Discover.",
        },
        {
          title: "Contracts and risk",
          body: "I've negotiated contracts and assessed supplier risk, so I size and scope honestly.",
          example: "MongoDB contract management and risk analysis at Discover.",
        },
        {
          title: "Statements of work",
          body: "I've written and managed SOWs, so I know what makes them clear — and where they go wrong.",
          example: "An enterprise API management gateway at Ricoh; IBM SOWs and a pilot POC at Allianz.",
        },
        {
          title: "Managing partners",
          body: "I've led supplier teams day to day, so I know what clients value in a delivery partner.",
          example: "A 15-person TCS team at Allianz; Amelia professional services at Ricoh.",
        },
      ],
    },
    first90: [
      { step: "Learn the portfolio", body: "Offerings, recent wins and losses — and why they went that way." },
      { step: "Join live pursuits", body: "Shape, size and present alongside the sales team." },
      { step: "Build reusable assets", body: "Reference architectures, sizing models and POC kits." },
    ],
  },
];
