// "What I bring" page: one section per kind of role. Each section has an
// anchor (/what-i-bring#<id>) so a tailored link can go with each application.
//
// `quote` must be a verbatim excerpt from src/data/testimonials.ts (checked at
// build time). `caseStudies` are role slugs from src/data/portfolio.ts.

export type RoleValue = {
  id: string;
  label: string; // short label for the role switcher
  title: string;
  stat: { value: string; label: string }; // headline number on the role card
  headline: string;
  intro: string;
  value: string[];
  evidence: { value: string; label: string }[];
  quote: string;
  caseStudies: string[];
  first90: { step: string; body: string }[];
};

export const valueIntro = {
  eyebrow: "What I bring",
  title: "One leader.",
  titleAccent: "Four ways to add value.",
  lead: "I'm open to architecture, data, engineering leadership and client-facing roles. Choose the one you're hiring for — each section shows what I'd bring, the results behind it, and how I'd start.",
};

export const roleValues: RoleValue[] = [
  {
    id: "architect",
    label: "Architect",
    title: "Enterprise & Solution Architect",
    stat: { value: "73 → 5–7", label: "days to onboard a partner" },
    headline: "Architecture that earns its place in business decisions.",
    intro:
      "Twenty-five years from developer to TOGAF-certified enterprise architect. I design target states that are fundable, deliverable and owned by the teams who run them — and I stay with them until they land.",
    value: [
      "North Stars and target architectures tied to investment cases — like the £40M, 144-platform convergence at Discover",
      "Modern patterns applied pragmatically: event-driven, DDD, CQRS, hexagonal, multi-region cloud",
      "Integration at scale — from 112 airline systems to Oracle Cloud and enterprise API management",
      "AI designed in, not bolted on — an API-integrated chatbot that cut support-desk load by 27%",
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
    first90: [
      { step: "Listen", body: "Map the estate, the pain points and the decisions waiting to be made." },
      { step: "Frame", body: "Set a North Star and target architecture tied to business outcomes." },
      { step: "Land", body: "Agree a sequenced roadmap with early wins and governed standards." },
    ],
  },
  {
    id: "data",
    label: "Head of Data",
    title: "Head of Data",
    stat: { value: "21%", label: "better MDM matching rates" },
    headline: "Data strategy grounded in how platforms really work.",
    intro:
      "I've led data from the architecture side — so strategy, governance and platforms are designed together, not bolted on. From a household view of the customer at Allianz UK to the data strategy behind 200M daily payments at Discover.",
    value: [
      "Single and household customer views on MDM that feed marketing and analytics",
      "Data strategy and governance: metadata curation, reference data, data quality and survivorship",
      "Modern data platforms: data at rest, OLTP/OLAP integration, data lakes and warehouses",
      "Regulatory data solutions: GDPR compliance for McDonald's, a KYC solution with EY",
      "Domain-driven data models that keep data close to the business it serves",
    ],
    evidence: [
      { value: "21%", label: "Better MDM matching rates at Allianz UK" },
      { value: "6", label: "Projects reusing the Allianz customer data platform" },
      { value: "200M", label: "Transactions a day on the platforms whose data strategy I led" },
    ],
    quote:
      "He had a rare ability to translate complicated architectural decisions into practical discussions, making him an outstanding partner to Product Management.",
    caseStudies: ["allianz", "discover", "pitney-bowes"],
    first90: [
      { step: "Assess", body: "Understand the data landscape, quality, lineage and regulatory exposure." },
      { step: "Govern", body: "Establish ownership, metadata and standards people will actually use." },
      { step: "Deliver", body: "Link data platforms to the business decisions they enable, in a funded roadmap." },
    ],
  },
  {
    id: "engineering",
    label: "Head of Engineering & Architecture",
    title: "Head of Engineering & Architecture",
    stat: { value: "3,200%", label: "surge absorbed, same team" },
    headline: "Engineering organisations that deliver — with people who want to stay.",
    intro:
      "I've led a 30-person architecture and engineering organisation through its managers, for payment platforms processing 200M transactions a day — through a merger, a platform convergence and a 3,200% volume surge.",
    value: [
      "Leaders who grow leaders: clear decision rights, service ownership and coaching",
      "Teams that collaborate instead of protecting their silos — no blame, shared credit",
      "Resilience as a culture: multi-region design, CI/CD and automated quality gates",
      "Delivery at scale through mergers, platform convergence and volume surges",
      "Governed AI adoption that makes good teams faster",
    ],
    evidence: [
      { value: "30", label: "People led through Architecture and Engineering Managers" },
      { value: "3,200%", label: "Post-merger surge absorbed with Agentic AI — no extra headcount" },
      { value: "73 → 5–7", label: "Days to onboard a partner" },
    ],
    quote:
      "Srini is a true servant leader. He puts his people first, consistently and without needing recognition for it, and the team's performance reflects that.",
    caseStudies: ["discover", "allianz", "interglobe"],
    first90: [
      { step: "Meet the people", body: "One-to-ones, team health, and what's getting in their way." },
      { step: "Clarify", body: "Ownership, decision rights and priorities everyone can explain." },
      { step: "Raise the bar", body: "Resilience, delivery cadence and engineering standards — together." },
    ],
  },
  {
    id: "presales",
    label: "Pre-sales & Client Engagement",
    title: "Pre-sales & Client Engagement",
    stat: { value: "$50M", label: "in pre-sales wins" },
    headline: "Propositions that win — and engagements that deliver what was sold.",
    intro:
      "15+ years client-facing at TCS, InterGlobe and Pitney Bowes — from RFI to go-live, and on stage at industry conferences in Dallas and London — plus the client-side view from leading in-house at Allianz, Ricoh and Discover.",
    value: [
      "Bid qualification that chases the right work: fit, capability and an honest view of the competition",
      "Discovery workshops and proofs of concept on the client's own ground",
      "Partnerships that extend a client's offering — like a KYC solution built with EY",
      "Executive presentations and conference talks that make complex solutions clear",
      "Delivery and enablement after the win, until the client is self-sufficient",
    ],
    evidence: [
      { value: "$50M", label: "In wins I contributed to at TCS" },
      { value: "RFI → live", label: "KYC partnership with EY, through to training EY's team" },
      { value: "2", label: "Financial services clients (HSBC, Broadridge) taken from RFP to post-implementation" },
    ],
    quote:
      "I was particularly impressed by Srini's ability to handle even the toughest clients. That skill often takes years to develop among Professional Services people, but it seemed to come perfectly naturally to him.",
    caseStudies: ["pitney-bowes", "tcs", "interglobe"],
    first90: [
      { step: "Learn the portfolio", body: "Offerings, recent wins and losses — and why they went that way." },
      { step: "Join live pursuits", body: "Shape, size and present alongside the sales team." },
      { step: "Build reusable assets", body: "Reference architectures, sizing models and POC kits." },
    ],
  },
];
