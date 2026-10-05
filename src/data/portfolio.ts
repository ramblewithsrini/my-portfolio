// All site content lives here. Edit this file to update your portfolio —
// no layout code needs to change.

export const profile = {
  name: "Srini Vankeepuram",
  initials: "SV",
  headline: "Architecture, Engineering & Data Leader",
  tagline:
    "25 years turning complex financial-services estates into investment cases, target architectures and executable roadmaps.",
  bio: "Most recently Head of Technology for Partner Experience and Payments at Discover Financial Services, leading a 30-person architecture and engineering organisation — and the data strategy — for its payment platforms.",
  location: "London, UK",
  availability: "Available immediately · Eligible for SC Clearance",
  email: "srini.vankee@gmail.com",
  // Add a PDF at public/resume.pdf and set this to "/resume.pdf" to show the
  // "Download résumé" button.
  resumeUrl: "",
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/srinvs" }],
};

export const stats = [
  { value: "25", label: "Years experience" },
  { value: "200M", label: "Payments a day" },
  { value: "$50M", label: "Pre-sales wins" },
];

// Short phrases for the scrolling banner under the hero.
export const marquee = [
  "Payments",
  "Banking",
  "Capital Markets",
  "Enterprise Architecture",
  "Data Strategy",
  "Data Governance",
  "Cloud-Native",
  "AWS",
  "Oracle Cloud",
  "Agentic AI",
  "PCI DSS 4.0",
  "TOGAF",
];

export type Job = {
  slug: string; // URL of the role's page: /experience/<slug>
  short: string; // compact label for the career timeline
  type: "in-house" | "consulting";
  role: string;
  company: string;
  start: string;
  end: string;
  startDate: string; // YYYY-MM, used to position the timeline
  endDate: string; // YYYY-MM
  highlights: string[];
};

export const experience: Job[] = [
  {
    slug: "discover",
    short: "Discover",
    type: "in-house",
    role: "Head of Technology, Partner Experience & Payments",
    company: "Discover Financial Services (a Capital One company)",
    start: "May 2023",
    end: "Aug 2026",
    startDate: "2023-05",
    endDate: "2026-08",
    highlights: [
      "Owned the target architecture and transition roadmap for partner-enablement and payment platforms processing 200M transactions a day at 10K+ TPS.",
      "Led and coached a 30-person architecture and engineering organisation through Architecture and Engineering Managers.",
      "Led data strategy and governance: metadata curation, data at rest, OLTP/OLAP integration and data lake ingestion, built on domain-driven data models.",
      "Identified enterprise capacity risks after the Capital One merger, secured Investment Council approval and directed the £40M, 144-platform convergence programme.",
      "Drove AWS East/West multi-region resilience, CI/CD and automated quality controls to support 99.999% availability.",
      "Translated PCI DSS 4.0 and other regulatory requirements into architecture and controls; applied governed Agentic AI to vulnerability identification and audit monitoring.",
    ],
  },
  {
    slug: "ricoh",
    short: "Ricoh",
    type: "in-house",
    role: "Lead Solution Architect",
    company: "Ricoh Europe",
    start: "Sep 2020",
    end: "May 2023",
    startDate: "2020-09",
    endDate: "2023-05",
    highlights: [
      "Drove the Oracle Cloud technology evaluation and owned cloud migration and integration for a multiyear $500M transformation.",
      "Lead Architect for an Amelia AI chatbot on customer portals, integrated via APIs with customers' orders and their status — cutting support-desk emails and calls by 27%.",
      "Lead Architect for HR modernisation across iPeople, SAP SuccessFactors, Axon Ivy, TalentLink and ServiceNow.",
      "Lead Architect for Concur and invoice management, integrating Concur, DocuWare and TrustWeaver.",
      "Managed the statement-of-work process for an enterprise-wide API management gateway.",
      "Defined integration patterns, data-quality processes and delivery guardrails to improve reliability and supportability.",
    ],
  },
  {
    slug: "pitney-bowes",
    short: "Pitney Bowes",
    type: "consulting",
    role: "Senior Architect, Client Advisory & Pre-Sales",
    company: "Pitney Bowes",
    start: "Jan 2018",
    end: "Apr 2020",
    startDate: "2018-01",
    endDate: "2020-04",
    highlights: [
      "Led the EY partnership for a KYC solution on Pitney Bowes Spectrum — from RFI/RFP and an on-site proof of concept through implementation and training EY professionals.",
      "Led a five-person team delivering GDPR compliance for McDonald's: data standardisation, iterative data cleansing and an analytical single view of employees.",
      "Led RFI/RFP responses, estimation and go/no-go decisions, and ran data governance due-diligence workshops for clients.",
      "Presented operational MDM with Spectrum and GraphQL at the Pitney Bowes conference in Dallas and a Neo4j conference in London.",
      "Led RFI/RFP, workshops, proofs of concept and Spectrum ETL integration for HSBC and Broadridge — through to post-implementation.",
      "Lead Architect building IoT-enabled smart city capabilities on Spectrum and AWS for a Saudi Arabian smart city programme.",
      "Client-facing architecture adviser to financial services clients including HSBC, MUFG and Broadridge.",
    ],
  },
  {
    slug: "allianz",
    short: "Allianz",
    type: "in-house",
    role: "Senior Digital Architect & Product Manager",
    company: "Allianz Insurance",
    start: "Nov 2014",
    end: "Dec 2017",
    startDate: "2014-11",
    endDate: "2017-12",
    highlights: [
      "Built Allianz UK's customer data and MDM capability — a household view of the customer, integrated with the Adobe marketing suite, the data lakehouse and the data warehouse.",
      "Improved MDM matching rates by 21% through probabilistic matching tuning on IBM MDM Server, data cleansing, clearer survivorship rules and reference data management.",
      "Defined the vision, strategy and target operating model for the shared digital platform — adopted by six projects; recognised by the steering committee as a key reason for the programme's success.",
      "Led and managed a 15-person TCS implementation team, onsite and offshore.",
      "Directed release management, configuration management and test automation for corporate IT developments.",
      "Shaped the IBM relationship with procurement — licensing, SOWs and a pilot POC — and managed third-party implementation partners.",
      "Developed the containerisation strategy for the Customer Data Solution and designed federated ESB patterns.",
    ],
  },
  {
    slug: "interglobe",
    short: "InterGlobe",
    type: "consulting",
    role: "Head of Enterprise Architecture, Europe",
    company: "InterGlobe Technologies",
    start: "Mar 2011",
    end: "Oct 2014",
    startDate: "2011-03",
    endDate: "2014-10",
    highlights: [
      "Built a 15-member Architecture & Design function from the ground up, delivering £1.5M+ in annual revenue.",
      "Grew IGT's SITA business from passenger systems into SITA's Government Service Line — recognised with IGT's Game Changer Award (2014).",
      "Lead Architect for SITA iBorders border management, purchased by Oman and Saudi Arabia; Architect for the modernisation of SITA's Voyager passenger service system on Oracle SOA Suite.",
      "Led RFI/RFP proposals for clients including SITA and Travelport, for opportunities worth $2M to $20M.",
    ],
  },
  {
    slug: "tcs",
    short: "TCS",
    type: "consulting",
    role: "Architect Lead / Manager",
    company: "Tata Consultancy Services",
    start: "Mar 2001",
    end: "Feb 2011",
    startDate: "2001-03",
    endDate: "2011-02",
    highlights: [
      "Lead Solution Architect for Saudi Arabian Airlines: an ESB platform on the IBM integration suite, integrating 112 systems including Amadeus and Sabre, in a $25M programme.",
      "Architect for British Airways' Travel Programme (TTP) messaging architecture on Progress, and for SOA governance on WSO2.",
      "Led the TCS airline innovation lab; its demonstrations were used by British Airways, KLM and SITA.",
      "Progressed from Lead Developer to Lead Solution Architect over ten years, across Qwest, British Airways, SITA, Singapore Airlines and Hawaiian Airlines.",
      "Supported pre-sales for opportunities worth $3M to $25M, contributing to wins worth $50M.",
    ],
  },
];

export type Project = {
  title: string;
  client: string;
  impact: string;
  description: string;
  tech: string[];
  caseStudy?: string; // role slug: links the card to /experience/<slug>
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Post-merger platform convergence",
    caseStudy: "discover",
    client: "Discover Financial Services",
    impact: "£40M · 144 platforms",
    description:
      "Built the evidence base that secured Investment Council funding for enterprise capacity after the Capital One merger, then directed convergence across 144 platforms and applications.",
    tech: ["Architecture strategy", "Investment cases", "Rationalisation"],
  },
  {
    title: "High-throughput payment platforms",
    caseStudy: "discover",
    client: "Discover & Diners Club",
    impact: "10K+ TPS · 99.999% availability",
    description:
      "Target architecture for partner-experience and payment platforms integrated with settlement, fraud and disputes, run against 99.999% availability expectations.",
    tech: ["AWS multi-region", "Microservices", "PCI DSS 4.0"],
  },
  {
    title: "Oracle Cloud transformation",
    caseStudy: "ricoh",
    client: "Ricoh Europe",
    impact: "$500M programme",
    description:
      "Migration and integration strategy, target architecture and implementation roadmap across SaaS, workflow, HR and shared business platforms.",
    tech: ["Oracle Cloud", "SAP SuccessFactors", "ServiceNow"],
  },
  {
    title: "Airline systems integration",
    caseStudy: "tcs",
    client: "Saudia (Saudi Arabian Airlines)",
    impact: "$25M · 112 systems",
    description:
      "Managed and delivered an integration programme spanning SaaS applications and the Amadeus and Sabre travel platforms.",
    tech: ["IBM integration suite", "Amadeus", "Sabre"],
  },
  {
    title: "Regulatory data solutions",
    caseStudy: "pitney-bowes",
    client: "HSBC · MUFG · Broadridge",
    impact: "GDPR · KYC",
    description:
      "Advised on and architected finance-screening solutions built on data governance and master data management, from POC through to solution sizing.",
    tech: ["Data governance", "MDM", "Pre-sales"],
  },
  {
    title: "Governed Agentic AI",
    caseStudy: "discover",
    client: "Discover Financial Services",
    impact: "Security & audit",
    description:
      "Applied governed Agentic AI to vulnerability identification and audit monitoring within a regulated payments environment.",
    tech: ["Agentic AI", "Security", "Compliance"],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Consulting & Growth",
    items: [
      "Trusted-adviser relationships",
      "Business development & pre-sales",
      "RFP/RFI & solution sizing",
      "Proof-of-concept leadership",
      "Account growth",
      "Coaching & mentoring",
    ],
  },
  {
    group: "Architecture & Engineering",
    items: [
      "Enterprise & solution architecture",
      "Target-state design",
      "Microservices & cloud-native",
      "APIs & integration",
      "CI/CD & resilience",
      "Agentic AI adoption",
    ],
  },
  {
    group: "Data",
    items: [
      "Data strategy & governance",
      "Metadata management",
      "Master data management",
      "Data lakes & ingestion",
      "OLTP / OLAP integration",
      "Domain-driven data models",
    ],
  },
  {
    group: "Sectors & Regulation",
    items: [
      "Payments & banking",
      "Capital markets",
      "Insurance",
      "Travel & aviation",
      "Retail & telecoms",
      "PCI DSS 4.0 · GDPR · KYC",
    ],
  },
  {
    group: "Platforms & Frameworks",
    items: [
      "AWS",
      "Oracle Cloud",
      "Salesforce · ServiceNow",
      "MongoDB · IBM",
      "SAP SuccessFactors",
      "TOGAF · Leading SAFe",
    ],
  },
];

export const education = [
  "B.Eng., Electronics & Communication — Madras University",
  "TOGAF Certified Professional",
  "BCS Data Management Certificate",
  "Leading SAFe (Scaled Agile)",
];
