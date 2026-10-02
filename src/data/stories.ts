// In-depth case studies for each role page (/experience/<slug>).
//
// Every field is optional: a role page shows only the sections that have
// content here, plus the CV highlights from portfolio.ts. Fill these in as
// the stories are written — nothing appears on the site until it's added.
//
// `quotes` must be verbatim excerpts from src/data/testimonials.ts; the build
// fails if one doesn't match, and attribution is looked up automatically.

export type Story = {
  summary?: string; // one-paragraph overview under the role title
  context?: string[]; // the situation when you joined
  scope?: { label: string; value: string }[]; // reporting line, team, budget...
  outcomes?: { value: string; label: string }[]; // headline numbers
  milestones?: { date: string; title: string; body?: string }[]; // date: "Mon YYYY"
  achievements?: {
    title: string;
    challenge: string;
    approach: string;
    outcome?: string;
  }[];
  leadershipStory?: { title: string; situation: string; action: string; result: string };
  leadership?: string[]; // how I led: people, coaching, culture
  lessons?: string[];
  tech?: string[];
  quotes?: string[];
};

export const stories: Record<string, Story> = {
  discover: {
    summary:
      "Brought in to set the technology direction for a newly formed Partner Enablement and Experience domain — then to carry it through the Capital One merger. Accountable for architecture and engineering of Discover and Diners partner-experience and payment platforms, and for platform convergence after the merger.",
    context: [
      "Partner Enablement and Experience was a newly formed domain with a sprawling estate of in-house, SaaS and legacy applications. Functionality was duplicated across systems, and the partner and customer experience suffered for it.",
      "Onboarding a new partner took 73 days, with manual steps — including testing — along the way. Applications were slow, Party Hierarchy performance was poor, and legacy applications and the modern Profile data were frequently out of sync.",
      "Diners applications lacked a clear technology direction and carried open vulnerabilities, and PCI DSS 4.0 compliance was a pressing requirement across the estate. The brief: make the platforms resilient, expose them through APIs, and move to an event-driven architecture.",
    ],
    scope: [
      { label: "Reporting to", value: "Head of Application Architecture" },
      { label: "Remit", value: "Partner Enablement and Experience, plus platform convergence after the Capital One merger" },
      { label: "Team", value: "30-person architecture & engineering organisation, led through Architecture and Engineering Managers" },
      { label: "Platforms", value: "Discover and Diners partner-experience and payment platforms, integrated with settlement, fraud and disputes" },
      { label: "Stakeholders", value: "Product, business and executive leadership; the post-merger Integration Management Office" },
      { label: "Scale", value: "200M transactions a day at 10K+ TPS, against 99.999% availability expectations" },
    ],
    outcomes: [
      { value: "73 → 5–7", label: "Days to onboard a partner" },
      { value: "3,200%", label: "Volume surge absorbed by the same service team" },
      { value: "200M", label: "Transactions a day" },
      { value: "£40M", label: "Convergence across 144 platforms" },
    ],
    milestones: [
      {
        date: "May – Jul 2023",
        title: "Set the North Star",
        body: "Defined the North Star for Partner Enablement and Experience: platform consolidation, and modernisation wherever it paid back. Standardised on event-driven architecture with a domain-driven model, CQRS and hexagonal architecture.",
      },
      {
        date: "Aug – Dec 2023",
        title: "Moved Profile data to a multi-region cloud",
        body: "Designed and led the move of Profile data from the data centre to a highly resilient, multi-region, multi-cluster OpenShift platform on AWS (US East and US West). Ran a GraphQL proof of concept on MongoDB Atlas for Party Hierarchy, and managed the MongoDB vendor relationship, including contract management and risk analysis.",
      },
      {
        date: "Jan – May 2024",
        title: "Made the platforms merger-ready",
        body: "Assessed the impact of the post-merger volume surge on availability, SLAs and SLOs. Worked with the Integration Management Office to prioritise scalability work, brought in third-party contractors to scale capacity fast, and supported successful testing of the Capital One network transition.",
      },
      {
        date: "May 2024 onwards",
        title: "Converged platforms, unified the experience",
        body: "Led platform convergence and the new P3 solution to eliminate duplicate functionality and unify the customer experience, cutting partner onboarding from 73 days to 5–7. Introduced Agentic AI to the Referral Management Service to absorb the post-merger surge.",
      },
    ],
    achievements: [
      {
        title: "Partner onboarding: 73 days to 5–7",
        challenge: "Onboarding a partner took 73 days, slowed by functionality duplicated across systems and manual steps, including testing.",
        approach: "Consolidated platforms and built the modern P3 solution to remove duplication, unify the experience and streamline the onboarding journey.",
        outcome: "Onboarding cut to 5–7 days, depending on the merchant, with a unified customer experience.",
      },
      {
        title: "Absorbing a 3,200% surge with Agentic AI",
        challenge: "The Capital One merger drove a 3,200% surge in Referral Management volume.",
        approach: "Introduced Agentic AI into the Referral Management Service.",
        outcome: "Handled the surge with the same customer service centre team — no increase in headcount.",
      },
      {
        title: "Merger-ready resilience",
        challenge: "The post-merger volume surge put availability, SLAs and SLOs at risk.",
        approach: "Assessed the impact, prioritised scalability work with the Integration Management Office, and scaled capacity rapidly with third-party contractors.",
        outcome: "Supported a smooth transition of the Capital One network; secured Investment Council approval and directed the £40M, 144-platform convergence programme.",
      },
      {
        title: "Resilient, modern foundations",
        challenge: "Slow applications, legacy and modern Profile data out of sync, and a poorly performing Party Hierarchy.",
        approach: "Moved Profile data to multi-region, multi-cluster OpenShift on AWS; standardised on event-driven architecture with DDD, CQRS and hexagonal architecture; proved GraphQL on MongoDB Atlas for Party Hierarchy.",
      },
    ],
    tech: [
      "AWS multi-region",
      "OpenShift (OCP)",
      "Event-driven architecture",
      "Domain-driven design",
      "CQRS",
      "Hexagonal architecture",
      "MongoDB Atlas",
      "GraphQL",
      "Agentic AI",
      "PCI DSS 4.0",
      "CI/CD",
      "ServiceNow",
      "Salesforce",
    ],
    leadershipStory: {
      title: "From stressed, siloed teams to one team",
      situation:
        "With a heavy delivery agenda, people were stretched and stressed. Teams were working in silos, and collaboration between them had broken down.",
      action:
        "I led people first. I made a point of recognising the hard work behind the results, visibly and specifically. When things went wrong, I took ownership of the mistake myself — no blame game.",
      result:
        "The friction went out of the system. Without the fear of blame, teams stopped protecting their own boundaries and started collaborating across them.",
    },
    leadership: [
      "Recognise the effort behind the outcome, not just the outcome.",
      "Own the mistakes as the leader; give the credit to the team.",
      "No blame game — fix problems together, then learn from them.",
      "Absorb pressure from above so teams can focus on what matters.",
    ],
    lessons: [
      "Silos are rarely a structure problem — they're a trust problem. Remove the fear of blame and collaboration follows.",
      "When a leader owns the mistakes and gives away the credit, teams stop protecting themselves and start protecting the outcome.",
    ],
    quotes: [
      "Srini set clear technical direction and consistently brought the right issues to leadership’s attention, influencing decisions with sound judgment rather than just executing instructions.",
      "Srini led the development of a comprehensive vision for a consolidated customer portal that unified the customer experience, eliminated friction points, and significantly improved overall customer satisfaction.",
      "High-demand work tends to route through a manager first, and instead of passing that pressure down, he absorbed it himself.",
      "No matter how challenging the situation, he remains cool and helps the team focus on finding the right solution rather than assigning blame.",
    ],
  },

  ricoh: {
    scope: [
      { label: "Programme", value: "Multiyear $500M Oracle Cloud transformation" },
      { label: "Platforms", value: "SaaS, workflow, HR and shared business platforms" },
    ],
    outcomes: [{ value: "$500M", label: "Transformation programme" }],
    tech: ["Oracle Cloud", "SAP SuccessFactors", "ServiceNow", "Axon Ivy", "TalentLink", "iPeople"],
  },

  "pitney-bowes": {
    summary:
      "Client-facing architecture adviser to financial services clients including HSBC, MUFG and Broadridge, as well as retail and public-sector-adjacent markets, combining technology advisory, solution design and pre-sales leadership.",
    scope: [
      { label: "Clients", value: "HSBC, MUFG, Broadridge; retail and public-sector-adjacent markets" },
      { label: "Focus", value: "GDPR, KYC and finance screening; smart cities and IoT" },
    ],
    tech: ["Data governance", "Master data management", "IoT"],
    quotes: [
      "I was particularly impressed by Srini's ability to handle even the toughest clients.",
      "a great person to help clients understand and surface their requirements and support them in developing their architecture and strategy",
    ],
  },

  allianz: {
    tech: ["Master data management", "Java services", "IBM", "Data governance"],
    quotes: [
      "During a complex design phase around Java services he was a leading light but also very supportive to my team.",
      "understands the importance of putting himself in the business/customer shoes and has strong presentation skills.",
    ],
  },

  interglobe: {
    scope: [
      { label: "Team", value: "15-person consulting architecture team across the UK, US and India" },
      { label: "Clients", value: "Travel and aviation technology, including Travelport and SITA" },
      { label: "Pre-sales", value: "Opportunities worth $2M to $20M" },
    ],
    outcomes: [
      { value: "15", label: "Architects across three countries" },
      { value: "$2–20M", label: "Opportunities shaped" },
    ],
    quotes: [
      "Srini joined SITA as a Solution Architect and brought a solution to the acute and long standing issues.",
      "He also knows how to convince people with his thought process and how to make people understand something very lucidly which they can’t.",
    ],
  },

  tcs: {
    scope: [
      { label: "Progression", value: "Developer to Architect Lead / Manager over nine years" },
      { label: "Clients", value: "Saudia (Saudi Arabian Airlines), Qwest" },
    ],
    outcomes: [
      { value: "$25M", label: "Saudia integration programme" },
      { value: "112", label: "Systems integrated" },
      { value: "$50M", label: "Pre-sales wins contributed to" },
    ],
    tech: ["IBM integration suite", "Amadeus", "Sabre", "Enterprise integration"],
    quotes: [
      "One can assign him a huge / complex task and be assured that it will get done within the deadline.",
      "what impressed me most about him were his self-confidence, hunger for challenging work, ability to get things done, and readiness to stretch himself to deliver on his commitments.",
    ],
  },
};
