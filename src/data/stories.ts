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
  labLink?: { href: string; title: string; body: string }; // an interactive demo of this work
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
      { label: "Data", value: "Data strategy and governance for the domain" },
      { label: "Stakeholders", value: "Product, business and executive leadership; the post-merger Integration Management Office" },
      { label: "Scale", value: "200M transactions a day at 10K+ TPS, against 99.999% availability expectations" },
    ],
    outcomes: [
      { value: "73 → 5–7", label: "Days to onboard a partner" },
      { value: "360%", label: "Volume surge absorbed by the same service team" },
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
        body: "Prepared the platforms for the Capital One network transition, working with the Integration Management Office.",
      },
      {
        date: "May 2024 onwards",
        title: "Converged platforms, unified the experience",
        body: "Led platform convergence and the new P3 solution to eliminate duplicate functionality and unify the customer experience. Introduced Agentic AI to the Referral Management Service to absorb the post-merger surge.",
      },
    ],
    achievements: [
      {
        title: "Partner onboarding: 73 days to 5–7",
        challenge: "Functionality was duplicated across systems, and manual steps — including testing — slowed every onboarding.",
        approach: "Consolidated platforms and built the modern P3 solution to remove duplication, unify the experience and streamline the onboarding journey — with reusable APIs, workflow automation, and improved authentication, authorisation and data integration.",
        outcome: "Onboarding cut to 5–7 days, depending on the merchant, with a unified customer experience — and my team scaled onboarding capacity tenfold, from 100 to 1,000 requests a day, with 97% of primary service requests completing in under 500 ms.",
      },
      {
        title: "Absorbing a 360% surge with Agentic AI",
        challenge: "The Capital One merger drove a surge in referrals — the cases merchants raise when a transaction doesn't go through.",
        approach: "Introduced an AI agent into the Referral Management Service that triages, classifies and prioritises every referral, and resolves the simple cases itself. Live in four months. My team designed the backend for scale: APIs, workflow automation, integration patterns and a referral search bot that cut manual processing.",
        outcome: "The same customer service centre team absorbed the surge within SLA, handling up to 750 referrals a day, with less reliance on temporary contractors.",
      },
      {
        title: "Secure partner access with Okta",
        challenge: "Partners needed simple, secure access to Discover and Diners platforms, and partner-facing services needed protecting at the edge.",
        approach: "One of my agile teams built single sign-on and OAuth with Okta, and a security edge in front of partner-facing services, so every partner request was authenticated and authorised consistently.",
      },
      {
        title: "Ready for longer card numbers",
        challenge: "Industry changes to card numbering meant the payment network had to handle variable-length issuer numbers (IINs/BINs) and account numbers of 6 to 19 digits.",
        approach: "My team upgraded the network's validation, routing and processing for every issuer configuration.",
        outcome: "Accurate transaction validation and routing across issuer configurations.",
      },
      {
        title: "Faster, safer releases",
        challenge: "Legacy Java applications on WebSphere were slow and manual to deploy.",
        approach: "My team completed the move from WebSphere Application Server to OpenShift, modernising deployment patterns and automating build and release.",
        outcome: "Deployment lead time cut by 80–90%, with more repeatable releases.",
      },
      {
        title: "Merger-ready resilience",
        challenge: "The post-merger volume surge put availability, SLAs and SLOs at risk.",
        approach: "Assessed the impact, prioritised scalability work with the Integration Management Office, and scaled capacity rapidly with third-party contractors. Made service health visible in Datadog: dashboards for SLOs, availability and performance, alerting for incident response, and service-health reporting to leadership and the business.",
        outcome: "The platforms held their 99.999% availability target through a smooth transition of the Capital One network; secured Investment Council approval and directed the £40M, 144-platform convergence programme.",
      },
      {
        title: "Data strategy & governance",
        challenge: "Data was spread across in-house, SaaS and legacy applications, with no shared view of what it meant or where it lived.",
        approach: "Led metadata curation and the strategy for data at rest; integrated OLTP and OLAP workloads; drove ingestion into the data lake; and anchored it all in domain-driven data models and data governance. With Enterprise Data Management, my team set the governance process and guidelines and ran workshops to roll them out across the payments network; moved metadata curation to a single 'push' model, managed centrally in Hackolade and published to Alation; and used AI (Copilot and generative AI) to reconcile every data model with production.",
        outcome: "95% of 140+ data models, across 120+ databases, in sync with production and compliant with governance and naming standards — supporting data design for digital payments, fraud, risk, partner enablement, settlements and disputes.",
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
      "Hackolade",
      "Alation",
      "Data lake",
      "OLTP / OLAP",
      "Agentic AI",
      "AI-assisted delivery",
      "C4 modelling",
      "PCI DSS 4.0",
      "Okta",
      "SSO / OAuth 2.0",
      "CI/CD",
      "Datadog",
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
      "Use AI to speed up delivery, within governance: my team used AI tools for design analysis, documentation, refactoring and test-case generation, under compliance controls.",
      "Grow skills in the open: we ran an architecture community of practice on standards, reusable patterns and C4 modelling, and coached team members to AWS certification.",
      "Lead beyond the role: from 2024, I was hand-picked to co-lead APAD (Asian Pacific Associate Development), a 400-member employee resource group — making a modest annual budget stretch to three events a year for 50–60 people each, and mentoring more than 15 colleagues.",
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
      "Senior member of Ricoh Europe's architecture team, contributing to the technology evaluation and integration architecture of a multiyear $500M Oracle Cloud transformation — and Lead Architect for the HR, finance and customer-facing modernisation running alongside it.",
    context: [
      "Ricoh Europe was moving core business platforms to Oracle Cloud as part of a multiyear transformation. Around it, HR, finance and customer-facing systems all needed modernising — largely in parallel.",
      "My brief was to contribute to the technology evaluation for Oracle Cloud adoption, lead the modernisation workstreams around it, and be a trusted adviser to the business on data and integration: showing how the right platforms and patterns would solve their challenges.",
    ],
    scope: [
      { label: "Reporting to", value: "Head of Enterprise Architecture" },
      { label: "Partners", value: "Amelia professional services, for the customer-portal chatbot" },
      { label: "Workstreams", value: "HR modernisation, Concur and invoice management, an AI chatbot for customer portals, and enterprise API management — in parallel" },
      { label: "Platforms", value: "SaaS, workflow, HR and shared business platforms" },
    ],
    outcomes: [
      { value: "$500M", label: "Oracle Cloud programme I contributed to" },
      { value: "27%", label: "Fewer support-desk emails and calls, via an AI chatbot" },
      { value: "6", label: "Workstreams led in parallel" },
      { value: "5", label: "HR platforms modernised" },
    ],
    achievements: [
      {
        title: "Oracle Cloud evaluation and integration",
        challenge: "The business needed confidence in Oracle Cloud before committing to a multiyear migration.",
        approach: "As part of the architecture team, contributed to the technology evaluation for Oracle Cloud adoption and to the cloud migration and integration architecture — building Java proofs of concept on Oracle Fusion myself.",
        outcome: "Helped shape the target architecture and implementation roadmap across SaaS, workflow, HR and shared business platforms.",
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
      "Oracle Fusion",
      "Java",
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
        body: "From first RFI to an EY team trained to deliver the solution themselves.",
      },
      {
        date: "2018",
        title: "Pitney Bowes conference, Dallas",
        body: "Presented how Spectrum and GraphQL power operational master data management.",
      },
      {
        date: "Nov 2018 – Jan 2019",
        title: "GDPR compliance for McDonald's",
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
        approach: "Led due-diligence workshops to shape each client's data governance strategy — data quality and ETL transformations.",
      },
      {
        title: "Winning the right work",
        challenge: "Every RFI and RFP needed a credible solution, a realistic estimate and a clear bid decision.",
        approach: "Led RFI/RFP responses and estimation, and took part in go/no-go decisions so effort went into the opportunities worth winning.",
      },
    ],
    tech: [
      "Pitney Bowes Spectrum",
      "Java",
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
      "Prove it before you sell it: proofs of concept on the client's own ground, often coded myself in Java.",
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
    labLink: {
      href: "/lab/mdm",
      title: "See matching, survivorship and households in action",
      body: "An interactive MDM playground with fictional data — move the sliders and watch customers merge, golden records form and households appear.",
    },
    summary:
      "Senior digital architect and product manager for Allianz UK's shared digital platform, with customer data and master data management at its heart. I built a single, household-level view of the customer that fed marketing and analytics, and a platform six projects reused instead of building their own — recognised by the steering committee as one of the key reasons for the programme's success.",
    context: [
      "Projects across Allianz UK were building and maintaining their own separate solutions — duplicating effort, cost and risk. Customer records were spread across many systems, duplicated and inconsistent.",
      "The answer was a shared digital platform: generic services, including a Customer Hub built on master data management, created once and reused across the business. My job was to define it, build the team and capabilities behind it, and win the projects that would adopt it.",
    ],
    scope: [
      { label: "Role", value: "Senior Digital Architect & Product Manager" },
      { label: "Customer data", value: "MDM on IBM MDM Server: probabilistic matching, survivorship rules, reference data and a household view of the customer" },
      { label: "Team", value: "Led and managed a 15-person third-party TCS team, onsite and offshore; built teams around customer data and MDM" },
    ],
    outcomes: [
      { value: "21%", label: "Better MDM matching rates" },
      { value: "6", label: "Projects reusing the shared platform" },
      { value: "15", label: "Person TCS team led, onsite and offshore" },
    ],
    achievements: [
      {
        title: "A single, trusted view of the customer",
        challenge: "Without a trusted golden record, every system held its own version of the customer.",
        approach: "Built the customer data and MDM capability on IBM MDM Server: standardised addresses against Royal Mail PAF; made the highest-quality source, the policy system, the trusted source for the golden record; tuned automatic-merge and review thresholds against known duplicates, with periodic sampling by data stewards who also worked the review queue; cleansed the data and managed reference data — then built a household view of each customer.",
        outcome: "Matching rates improved by 21%, and the business gained a trusted, household-level view of its customers.",
      },
      {
        title: "Customer data that powers marketing and analytics",
        challenge: "Trusted customer data only creates value when marketing and analytics can use it.",
        approach: "Integrated the Customer Hub with the Adobe marketing suite and with the data lakehouse and data warehouse, using defined integration patterns and data governance.",
        outcome: "Marketing and analytics working from the same householded customer data.",
      },
      {
        title: "A shared digital platform for Allianz UK",
        challenge: "Separate solutions for every project meant duplicated build, higher running costs and more delivery risk.",
        approach: "Formulated and implemented the vision and strategy for the next generation of digital services, designed the Customer Hub and generic services, and defined the target operating model.",
        outcome: "Faster delivery and a lower cost of ownership than building and maintaining separate solutions — and a robust platform that de-risked future projects.",
      },
      {
        title: "Modern, reliable engineering",
        challenge: "Shared services demand consistent releases and an architecture that can grow with adoption.",
        approach: "Directed release management, configuration management and test automation; defined non-functional requirements on a tested platform; developed the containerisation strategy for the Customer Data Solution; and led proof-of-technology and design of federated ESB patterns.",
      },
      {
        title: "A productive partnership with IBM and TCS",
        challenge: "The platform depended on IBM products and on a third-party implementation partner.",
        approach: "Worked with procurement to shape the IBM relationship — products, licence management, consulting, statements of work and a pilot POC — and kept the TCS implementation team, onsite and offshore, working as one team with ours.",
      },
    ],
    leadershipStory: {
      title: "Winning adoption, not mandating it",
      situation:
        "The shared platform would only succeed if other projects chose to build on it — and every one of them was used to building its own solutions.",
      action:
        "I invited the consuming applications into architecture workshops, shared the scope of our work openly, and helped their teams think through how the platform would shorten their time to build and remove duplicated functionality. Programme mandates and a reuse roadmap made each commitment concrete.",
      result:
        "Six projects adopted the platform, and the steering committee highlighted my work as one of the key reasons for the programme's success.",
    },
    leadership: [
      "Bring consumers in early: architecture workshops before commitments.",
      "Sell the outcome, not the platform — faster delivery and no duplicated build.",
      "Build teams around clear focus areas — like customer data and MDM — with real ownership.",
      "Keep sub-system solution architects and partners working as one team.",
    ],
    lessons: [
      "Adoption is earned in the room, not mandated from above. Show each team what's in it for them.",
      "Customer data is only as valuable as the decisions it powers — design for the people who'll consume it from day one.",
    ],
    tech: [
      "IBM MDM Server",
      "Probabilistic matching",
      "Survivorship rules",
      "Reference data management",
      "Household view",
      "Adobe marketing suite",
      "Data lakehouse",
      "Data warehouse",
      "Data governance",
      "Data quality",
      "Federated ESB",
      "Containerisation",
      "Test automation",
    ],
    quotes: [
      "Srini was the MDM Solution Architect working at Allianz.",
      "During a complex design phase around Java services he was a leading light but also very supportive to my team.",
      "understands the importance of putting himself in the business/customer shoes and has strong presentation skills.",
    ],
  },

  interglobe: {
    summary:
      "Head of Enterprise Architecture for InterGlobe Technologies (IGT) in Europe. I built a 15-member Architecture & Design function from the ground up — delivering £1.5M+ in annual revenue — while architecting SITA's passenger and border management platforms and growing IGT's SITA business into a second business line. Recognised with IGT's Game Changer Award in 2014.",
    context: [
      "SITA, the air transport industry's technology provider, was modernising its passenger service systems and building out a government line of business around border management.",
      "As Head of Enterprise Architecture for IGT in Europe, I led the architecture on both fronts.",
    ],
    scope: [
      { label: "Role", value: "Head of Enterprise Architecture, Europe" },
      { label: "Clients", value: "SITA; Travelport" },
      { label: "Identity", value: "Identity and access management (IAM) architect for SITA" },
      { label: "Pre-sales", value: "Led RFI/RFP proposals across clients, for opportunities worth $2M to $20M" },
    ],
    outcomes: [
      { value: "£1.5M+", label: "Annual revenue from the function I built" },
      { value: "PSS → GSL", label: "SITA account grown into a second business line" },
      { value: "15", label: "Member Architecture & Design function" },
      { value: "2", label: "Governments that bought iBorders: Oman and Saudi Arabia" },
    ],
    achievements: [
      {
        title: "Growing the SITA account",
        challenge: "IGT's work with SITA was concentrated in a single business line: passenger service systems.",
        approach: "Used the credibility we built delivering SITA's passenger systems to open the door to its Government Service Line — and shaped the architecture that won the work.",
        outcome: "IGT's SITA business grew from passenger systems into the Government Service Line — recognised with IGT's Game Changer Award in 2014.",
      },
      {
        title: "Modernising SITA's passenger service system",
        challenge: "SITA's Voyager Passenger Management and Distribution platform — reservations, ticketing, inventory, check-in and departure control — needed a modern, service-oriented architecture that could scale with growing carriers.",
        approach: "Produced the reference architecture and functional design on Oracle SOA Suite; identified the services; designed token-based authentication and authorisation across every layer; defined the service and message versioning strategy; led performance and capacity tuning; and worked with the programme's other solution architects to keep integration seamless.",
      },
      {
        title: "Border management with SITA iBorders",
        challenge: "Oman needed to modernise border security while speeding up travel for the low-risk majority of travellers.",
        approach: "Lead Architect for SITA iBorders in Oman — an integrated border management solution that combines risk assessment of traveller data with the tools to manage, monitor and operate border controls, focusing resources on higher-risk travellers.",
        outcome: "iBorders was purchased by Oman and Saudi Arabia.",
      },
      {
        title: "Bringing the innovation lab to IGT",
        challenge: "Airlines wanted to see what modernisation could look like before committing to it.",
        approach: "In 2013, drawing on the TCS lab, I helped build a smaller innovation lab at IGT and presented it to Emirates, collaborating with the airline's own innovation team.",
      },
    ],
    leadershipStory: {
      title: "Building an architecture business from zero",
      situation:
        "There was no dedicated Architecture & Design function — and it had to be built while I was leading live architecture for SITA.",
      action:
        "I built and grew a 15-member function across the UK, US and India, set shared standards and delivery methods, and led RFI/RFP proposals across clients — while staying hands-on as SITA's architect.",
      result:
        "A self-sustaining function whose standards were adopted across client engagements — built without pausing client delivery.",
    },
    leadership: [
      "Earn the next piece of work through the current one: delivery is the best business development.",
      "Run a team across three countries as one practice, with shared standards and methods.",
      "Work as one architecture community with the client's own solution architects.",
    ],
    lessons: [
      "Credibility is the most valuable thing a consultant builds. Deliver well in one business line and the client will invite you into the next.",
    ],
    tech: [
      "Oracle SOA Suite",
      "Identity & access management (IAM)",
      "Token-based authentication & authorisation",
      "Service & message versioning",
      "Performance & capacity tuning",
      "Passenger service systems (PSS)",
      "Reservations & departure control",
      "Border management",
      "Traveller risk assessment",
    ],
    quotes: [
      "Srini joined SITA as a Solution Architect and brought a solution to the acute and long standing issues.",
    ],
  },

  tcs: {
    summary:
      "Ten years at Tata Consultancy Services, growing from lead developer on a US telecoms platform to Lead Solution Architect for Saudi Arabian Airlines' enterprise-wide integration and architect on British Airways' Travel Programme — and, as technical architect in its founding team, helping design and build TCS's airline innovation lab, whose demonstrations were used by British Airways, KLM and SITA.",
    context: [
      "I joined TCS in 2001 as a developer and spent ten years growing into an architect — first in US telecoms, then across some of the world's best-known airlines.",
      "Airlines ran on a tangle of custom messaging, middleware and industry protocols. The work was to replace that complexity with standard, service-oriented integration that cut the cost of ownership and let airlines launch new products faster.",
    ],
    scope: [
      { label: "Progression", value: "Lead Developer → Technical Lead → Lead Integration Designer → Solution Architect → Lead Solution Architect → Architect, British Airways" },
      { label: "Clients", value: "Qwest, British Airways, SITA, Singapore Airlines, Hawaiian Airlines, Saudi Arabian Airlines" },
      { label: "Integration", value: "IBM integration suite (Saudia), Progress (BA Travel Programme), WSO2 (BA SOA governance); airline schedule messaging; Amadeus and Sabre" },
      { label: "Delivery", value: "Coordinated client, onsite and offshore teams; liaised with product vendors" },
    ],
    outcomes: [
      { value: "$25M", label: "Saudia integration programme" },
      { value: "112", label: "Systems integrated" },
      { value: "$50M", label: "Pre-sales wins contributed to" },
      { value: "6", label: "Airline and telecoms clients" },
    ],
    milestones: [
      {
        date: "Mar 2001 – Nov 2004",
        title: "Lead Developer — Qwest (US telecoms)",
        body: "Customer Request Management for a US telecoms provider; coordinated client, onsite and offshore teams.",
      },
      {
        date: "May 2004 – May 2005",
        title: "Technical Lead — British Airways",
        body: "Technical lead across multiple British Airways projects.",
      },
      {
        date: "Jun 2005 – Apr 2006",
        title: "Lead Integration Designer — SITA",
      },
      {
        date: "May 2006 – Sep 2007",
        title: "Solution Architect — Singapore Airlines",
      },
      {
        date: "Oct – Dec 2007",
        title: "Enterprise Consultant — Hawaiian Airlines",
      },
      {
        date: "Dec 2007 – Apr 2009",
        title: "Lead Solution Architect — Saudi Arabian Airlines",
        body: "Architect of the airline-wide integration platform on the IBM integration suite.",
      },
      {
        date: "2008",
        title: "Technical architect — TCS airline innovation lab",
        body: "Part of the founding team that designed and built the lab; presented its demonstrations to airline CEOs and CTOs.",
      },
      {
        date: "May 2010 – Feb 2011",
        title: "Architect — British Airways Travel Programme",
        body: "Messaging and integration architecture for a major business and IT transformation of BA's most critical operational systems.",
      },
    ],
    achievements: [
      {
        title: "One integration platform for an entire airline",
        challenge: "Saudia ran a plethora of custom messaging and middleware platforms on legacy and home-grown protocols — costly to maintain year on year, and a brake on integrating new systems and launching new products.",
        approach: "Identified the right SOA product suite (IBM), produced the reference architecture and functional design, and architected an ESB-based solution integrating all of Saudia's applications — including a scheduling application to parse complex MVT, ASM and SSM airline messages. Liaised with the product vendor and supported construction.",
        outcome: "A $25M programme integrating 112 systems, including Amadeus and Sabre — the foundation for a lower cost of ownership and a phased move to SOA and business process management.",
      },
      {
        title: "An airline innovation lab",
        challenge: "Airline leaders wanted to see new capabilities working on their own kind of operations before investing in them.",
        approach: "As technical architect in the founding team, I helped design and build TCS's airline innovation lab. Its demonstrations included a modernised self-service agent portal, a route to move agents off green-screen host terminals, and modernised baggage messaging over IATA Type B. I presented them to the CEOs and CTOs of several airlines.",
        outcome: "Demonstrations used by British Airways, KLM and SITA — and a habit I've kept ever since: build something working, then decide.",
      },
      {
        title: "Messaging architecture for BA's Travel Programme",
        challenge: "British Airways' Travel Programme was replacing and modernising some of its most critical business and operational systems — and they all had to talk to each other reliably.",
        approach: "Set the publish/subscribe strategy for messages across BA's integration architecture; designed the messaging deployment, identifying active-active and active-passive use cases; established message patterns ratified by the technical working group; produced the reference architecture on Progress; and built a simple/medium/complex estimation model.",
      },
      {
        title: "SOA governance for British Airways",
        challenge: "BA was rolling out SOA across its core operations, and every new business service needed governing from concept to production.",
        approach: "Designed and implemented design-time governance on WSO2: the service development lifecycle, versioning strategy, deployment architecture and capacity tuning, and integration with the Service Delivery Platform. Liaised with the vendor and embedded process governance in the service repository.",
      },
      {
        title: "Hands-on engineering at Qwest",
        challenge: "Wholesale service delivery centres needed a single point of contact to track service requests through ordering, provisioning and billing.",
        approach: "As Lead Developer, built the Instant Activation module and the web services other systems used to reach the Customer Request Management platform, and migrated ColdFusion pages to J2EE on WebLogic with Struts.",
      },
      {
        title: "Pre-sales that won work",
        challenge: "Large integration opportunities needed credible solutions and sizing.",
        approach: "Supported pre-sales and RFP responses for opportunities worth $3M to $25M, and defined delivery methods and reusable architecture standards across client engagements.",
        outcome: "Contributed to wins worth $50M.",
      },
    ],
    leadership: [
      "Learn the craft first: years of hands-on development before designing for others.",
      "Coordinate as one team across client, onsite and offshore locations.",
      "Make vendors partners in the solution, not just suppliers of a product.",
    ],
    tech: [
      "IBM integration suite",
      "Progress",
      "WSO2",
      "Enterprise Service Bus (ESB)",
      "SOA governance",
      "Publish/subscribe messaging",
      "Airline messaging (MVT, ASM, SSM)",
      "Amadeus",
      "Sabre",
      "J2EE",
      "WebLogic",
      "Struts",
      "Web services",
    ],
    quotes: [
      "One can assign him a huge / complex task and be assured that it will get done within the deadline.",
      "what impressed me most about him were his self-confidence, hunger for challenging work, ability to get things done, and readiness to stretch himself to deliver on his commitments.",
      "He also knows how to convince people with his thought process and how to make people understand something very lucidly which they can’t.",
      "Srini's dedication and enthusiasm has been clear to see on this project and he has no problem in going the extra mile in his approach to work.",
    ],
  },
};
