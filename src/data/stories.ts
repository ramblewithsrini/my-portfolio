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
      "Brought in to set the technology direction for a newly formed Partner Enablement and Experience domain — then to carry it through the Capital One merger. Accountable for architecture, engineering and data strategy for Discover and Diners partner-experience and payment platforms, and for platform convergence after the merger.",
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
      { label: "Data", value: "Data strategy and governance: metadata curation, data at rest, OLTP/OLAP integration and data lake ingestion" },
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
        title: "Data strategy & governance",
        challenge: "Data spread across in-house, SaaS and legacy applications, with legacy and modern Profile data out of sync.",
        approach: "Led metadata curation and the strategy for data at rest; integrated OLTP and OLAP workloads; drove ingestion into the data lake; and anchored it all in domain-driven data models and data governance.",
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
      "Data governance",
      "Metadata management",
      "Data lake",
      "OLTP / OLAP",
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
    summary:
      "Senior member of Ricoh Europe's architecture team, leading the technology evaluation and integration architecture for a multiyear $500M Oracle Cloud transformation — and Lead Architect across HR, finance and customer-facing modernisation running alongside it.",
    context: [
      "Ricoh Europe was moving core business platforms to Oracle Cloud as part of a multiyear, $500M transformation. Around it, HR, finance and customer-facing systems all needed modernising — largely in parallel.",
      "My brief was to drive the technology evaluation for Oracle Cloud adoption and to be a trusted adviser to the business on data and integration: showing how the right platforms and patterns would solve their challenges.",
    ],
    scope: [
      { label: "Role", value: "Lead Solution Architect, senior member of the architecture team" },
      { label: "Reporting to", value: "Head of Enterprise Architecture" },
      { label: "Programme", value: "Multiyear $500M Oracle Cloud transformation: technology evaluation, migration and integration" },
      { label: "Partners", value: "Amelia professional services, for the customer-portal chatbot" },
      { label: "Workstreams", value: "HR modernisation, Concur and invoice management, an AI chatbot for customer portals, and enterprise API management — in parallel" },
      { label: "Platforms", value: "SaaS, workflow, HR and shared business platforms" },
      { label: "Data & integration", value: "Integration patterns for downstream systems; data quality management process" },
      { label: "Commercial", value: "Statement-of-work process for an enterprise-wide API management gateway" },
    ],
    outcomes: [
      { value: "$500M", label: "Oracle Cloud transformation" },
      { value: "27%", label: "Fewer support-desk emails and calls, via an AI chatbot" },
      { value: "6", label: "Workstreams led in parallel" },
      { value: "5", label: "HR platforms modernised" },
    ],
    achievements: [
      {
        title: "Oracle Cloud evaluation and integration",
        challenge: "The business needed confidence in Oracle Cloud before committing to a multiyear migration.",
        approach: "Drove the technology evaluation for Oracle Cloud adoption, and owned the overall cloud migration and integration architecture.",
        outcome: "A target architecture and implementation roadmap across SaaS, workflow, HR and shared business platforms.",
      },
      {
        title: "HR platform modernisation",
        challenge: "HR ran across a mix of platforms: iPeople, SAP SuccessFactors, Axon Ivy, TalentLink and ServiceNow.",
        approach: "Led the architecture for modernising the HR estate across all five platforms.",
        outcome: "More consistent HR platforms with greater operational maturity.",
      },
      {
        title: "Conversational AI for customer portals",
        challenge: "The support desk was carrying a heavy load of routine customer queries by email and phone.",
        approach: "Lead Architect for implementing the Amelia AI chatbot on the customer-facing portals, in partnership with Amelia's professional services team — integrated through APIs so it understood each customer: their recent orders and their status.",
        outcome: "27% fewer emails and calls to the support desk.",
      },
      {
        title: "Expense and invoice management",
        challenge: "Expenses and invoices flowed through separate systems.",
        approach: "Lead Architect for Concur and invoice management, integrating Concur, DocuWare and TrustWeaver.",
      },
      {
        title: "Enterprise API management and data quality",
        challenge: "Integration across the enterprise needed consistency, control and trusted data.",
        approach: "Managed the statement-of-work process for an enterprise-wide API management gateway; defined integration patterns for downstream systems and designed the data quality management process.",
        outcome: "Integration and data quality guardrails that improved reliability and supportability.",
      },
    ],
    tech: [
      "Oracle Cloud",
      "SAP SuccessFactors",
      "ServiceNow",
      "Axon Ivy",
      "TalentLink",
      "iPeople",
      "Amelia (conversational AI)",
      "SAP Concur",
      "DocuWare",
      "TrustWeaver",
      "API management",
      "Data quality management",
    ],
    leadershipStory: {
      title: "Leading without authority",
      situation:
        "With no direct line management, delivery depended on external partners — and on internal teams with their own priorities. Partners regularly hit deadlocks they couldn't resolve on their own.",
      action:
        "I gave partners clarity on what was needed and why, then cleared the path: working with Ricoh's infrastructure team and the subject-matter experts for the HR systems and an in-house application in Ricoh's data centre to resolve each blocker.",
      result: "Deadlocks were removed and delivery kept moving — without needing formal authority to make it happen.",
    },
    leadership: [
      "Lead through clarity, not authority: make what's needed — and why — unmistakable.",
      "Be the bridge: connect partners with the internal experts who can unblock them.",
      "Treat partners as part of the team, not as suppliers to be managed.",
    ],
    lessons: [
      "Influence is earned by removing other people's blockers. Make their work easier, and authority stops mattering.",
      "Most deadlocks between partners and internal teams come from missing context, not missing will.",
    ],
  },

  "pitney-bowes": {
    summary:
      "Pre-sales lead and solution architect for Pitney Bowes' Spectrum data platform. I took clients and partners from first workshop to working solution — data governance, master data management and regulatory compliance — for financial services, professional services and retail organisations.",
    context: [
      "Clients were under growing regulatory pressure, with GDPR and KYC chief among the drivers. They needed to turn fragmented data into something governed, trusted and compliant.",
      "My role spanned the whole journey: shaping the opportunity, proving the solution, winning the work — and then delivering it and enabling the client's own people to run it.",
    ],
    scope: [
      { label: "Role", value: "Pre-sales lead and solution architect" },
      { label: "Clients", value: "HSBC, MUFG, Broadridge, McDonald's; retail and public-sector-adjacent markets" },
      { label: "Partners", value: "EY — joint KYC solution built on Pitney Bowes Spectrum" },
      { label: "Pre-sales", value: "RFI/RFP responses, estimation, proofs of concept and go/no-go decisions" },
      { label: "Data", value: "Data governance, data quality, ETL and operational master data management" },
      { label: "Platforms", value: "Pitney Bowes Spectrum, Neo4j and GraphQL" },
    ],
    outcomes: [
      { value: "RFI → live", label: "EY KYC partnership, end to end" },
      { value: "5", label: "Person team delivering GDPR compliance" },
      { value: "2", label: "Industry conferences presented at" },
      { value: "3", label: "Global financial services clients advised" },
    ],
    milestones: [
      {
        date: "May – Oct 2018",
        title: "KYC solution partnership with EY",
        body: "Took EY from RFI/RFP through a proof of concept at their workplace to implementation, then trained EY's professionals to deliver the solution themselves.",
      },
      {
        date: "2018",
        title: "Pitney Bowes conference, Dallas",
        body: "Presented how Spectrum and GraphQL power operational master data management.",
      },
      {
        date: "Nov 2018 – Jan 2019",
        title: "GDPR compliance for McDonald's",
        body: "Led a five-person team through data standardisation, iterative cleansing and an analytical single view of employees.",
      },
    ],
    achievements: [
      {
        title: "KYC solution partnership with EY",
        challenge: "EY wanted to add a Know Your Customer capability to its own service offering.",
        approach: "Led the full lifecycle on Pitney Bowes Spectrum: the RFI and RFP, a proof of concept at EY's workplace, presentations to stakeholders, implementation, and training EY's professionals.",
        outcome: "EY gained a KYC capability built on Spectrum, with its own people trained to deliver it.",
      },
      {
        title: "Spectrum data integration for HSBC and Broadridge",
        challenge: "HSBC and Broadridge were evaluating Spectrum for their data integration needs.",
        approach: "Led the RFI/RFP process, ran discovery workshops and proofs of concept, and designed the ETL integration using Spectrum.",
        outcome: "Carried both through to implementation, and led the post-implementation work.",
      },
      {
        title: "GDPR compliance for McDonald's",
        challenge: "Employee data had to be brought into line with GDPR.",
        approach: "Led a five-person team to standardise the data, run multiple iterations of data cleansing, and build an analytical single view of employees on Spectrum.",
        outcome: "A GDPR-compliant system with a trusted, analytical single view of employee data.",
      },
      {
        title: "Smart city architecture, enabled by IoT",
        challenge: "A Saudi Arabian smart city programme needed an architecture to connect IoT-enabled city services.",
        approach: "As Lead Architect, built the smart city capabilities on Pitney Bowes' own Spectrum platform and AWS, designing the IoT-enabled architecture to bring devices, data and city services together.",
      },
      {
        title: "Data governance by design",
        challenge: "Clients needed a practical strategy for data quality and governance, not just a product.",
        approach: "Led due-diligence workshops to shape each client's data governance strategy — data quality and ETL transformations — and trained client teams on Spectrum and Neo4j.",
      },
      {
        title: "Winning the right work",
        challenge: "Every RFI and RFP needed a credible solution, a realistic estimate and a clear bid decision.",
        approach: "Led RFI/RFP responses and estimation, and took part in go/no-go decisions so effort went into the opportunities worth winning.",
      },
    ],
    tech: [
      "Pitney Bowes Spectrum",
      "Operational MDM",
      "Neo4j",
      "GraphQL",
      "Data quality",
      "ETL",
      "Data governance",
      "GDPR",
      "KYC",
      "IoT",
      "Smart cities",
      "AWS",
    ],
    leadershipStory: {
      title: "Leaving clients self-sufficient",
      situation:
        "A data solution only delivers value if the client's own people can run it once the project team has gone.",
      action:
        "Alongside every implementation, I trained client teams — and EY's professionals — hands-on in Spectrum and Neo4j, until they could own the solution themselves.",
      result: "Client teams became self-sufficient, running and extending the solutions without us.",
    },
    leadership: [
      "Bid on the right work: pursue opportunities aligned to our target market, our product capability and our professional services strength — with an honest assessment of the competition.",
      "Prove it before you sell it: proofs of concept on the client's own ground.",
      "Shape the strategy first: due-diligence workshops before solution design.",
      "Enable, don't create dependency: train client teams until they're self-sufficient.",
    ],
    lessons: [
      "The best bids are often the ones you choose not to chase. Qualify hard on fit, capability and competition — then go all in.",
      "A sale isn't finished until the client can run it without you.",
    ],
    quotes: [
      "I was particularly impressed by Srini's ability to handle even the toughest clients.",
      "a great person to help clients understand and surface their requirements and support them in developing their architecture and strategy",
    ],
  },

  allianz: {
    scope: [
      { label: "Teams", value: "Multidisciplinary teams across customer data, master data and reusable digital services" },
      { label: "Data", value: "Customer and master data management, data governance and integration patterns" },
      { label: "Governance", value: "Supplier, procurement and roadmap governance, including IBM licensing, SOWs and POCs" },
    ],
    tech: ["Master data management", "Customer data", "Data governance", "Java services", "IBM"],
    quotes: [
      "Srini was the MDM Solution Architect working at Allianz.",
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
