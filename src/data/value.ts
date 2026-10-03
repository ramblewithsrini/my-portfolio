// "What I bring" page: one section per kind of role. Each section has an
// anchor (/what-i-bring#<id>) so a tailored link can go with each application.
//
// `quote` must be a verbatim excerpt from src/data/testimonials.ts (checked at
// build time). `caseStudies` are role slugs from src/data/portfolio.ts.

export type RoleValue = {
  id: string;
  label: string; // short label for the role switcher
  title: string;
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
  lead: "I'm open to architecture, data, engineering leadership and client-facing roles. Choose the one you're hiring for — each section shows what I'd bring, the evidence behind it, and how I'd start.",
};

export const roleValues: RoleValue[] = [
  {
    id: "architect",
    label: "Architect",
    title: "Enterprise & Solution Architect",
    headline: "Architecture that earns its place in business decisions.",
    intro:
      "Twenty-five years from developer to TOGAF-certified enterprise architect. I design target states that are fundable, deliverable and owned by the teams who run them.",
    value: [
      "Target architectures and transition roadmaps tied to investment cases",
      "Integration at scale — from 112 airline systems to multi-region payment platforms",
      "Modern patterns applied pragmatically: event-driven, DDD, CQRS, hexagonal, cloud-native",
      "Regulation designed in from the start: PCI DSS 4.0, GDPR, KYC",
    ],
    evidence: [
      { value: "112", label: "Systems integrated for Saudia" },
      { value: "$500M", label: "Oracle Cloud transformation shaped" },
      { value: "TOGAF", label: "Certified enterprise architect" },
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
    headline: "Data strategy grounded in how platforms really work.",
    intro:
      "I've led data from the architecture side — so strategy, governance and platforms are designed together, not bolted on afterwards.",
    value: [
      "Data strategy and governance aligned to regulation and business value",
      "Metadata curation, master data management and domain-driven data models",
      "Modern data platforms: data-at-rest strategy, OLTP/OLAP integration, data lake ingestion",
      "Regulatory data solutions: GDPR compliance for McDonald's, a KYC solution with EY",
    ],
    evidence: [
      { value: "200M", label: "Transactions a day on the platforms whose data strategy I led" },
      { value: "3", label: "Organisations where I've led data strategy or MDM" },
      { value: "GDPR · KYC", label: "Data solutions for McDonald's, EY, HSBC and Broadridge" },
    ],
    quote:
      "He had a rare ability to translate complicated architectural decisions into practical discussions, making him an outstanding partner to Product Management.",
    caseStudies: ["discover", "pitney-bowes", "allianz"],
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
    headline: "Engineering organisations that deliver — with people who want to stay.",
    intro:
      "I've led a 30-person architecture and engineering organisation through its managers, for payment platforms processing 200M transactions a day.",
    value: [
      "Leaders who grow leaders: clear decision rights, service ownership and coaching",
      "Resilience as a culture: multi-region design, CI/CD and automated quality gates",
      "Delivery at scale through mergers, platform convergence and volume surges",
      "Governed AI adoption that makes good teams faster",
    ],
    evidence: [
      { value: "30", label: "People led through Architecture and Engineering Managers" },
      { value: "99.999%", label: "Availability target supported by multi-region design" },
      { value: "73 → 5–7", label: "Days to onboard a partner" },
    ],
    quote:
      "Srini is a true servant leader. He puts his people first, consistently and without needing recognition for it, and the team's performance reflects that.",
    caseStudies: ["discover", "interglobe"],
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
    headline: "Propositions that win — and engagements that deliver what was sold.",
    intro:
      "15+ years client-facing at TCS, InterGlobe and Pitney Bowes, plus the client-side view from leading in-house at Allianz, Ricoh and Discover.",
    value: [
      "Solution shaping, sizing and RFP/RFI responses",
      "Proof-of-concept leadership that de-risks the buying decision",
      "Executive presentations and trusted-adviser relationships",
      "Partnerships that extend a client's own offering — like a KYC solution built with EY",
      "Honest sizing from someone who's been the client",
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
