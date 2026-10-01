// All site content lives here. Edit this file to update your portfolio —
// no layout code needs to change.

export const profile = {
  name: "Srini Vankeepuram",
  initials: "SV",
  headline: "Architecture & Engineering Leader",
  tagline:
    "25 years turning complex financial-services estates into investment cases, target architectures and executable roadmaps.",
  bio: "Most recently Head of Technology for Partner Experience and Payments at Discover Financial Services, leading a 30-person architecture and engineering organisation for platforms processing 200M transactions a day.",
  location: "London, UK",
  availability: "Open to new opportunities · Eligible for SC Clearance",
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
  "Cloud-Native",
  "AWS",
  "Oracle Cloud",
  "Agentic AI",
  "PCI DSS 4.0",
  "TOGAF",
];

export type Job = {
  role: string;
  company: string;
  start: string;
  end: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    role: "Head of Technology, Partner Experience & Payments",
    company: "Discover Financial Services (a Capital One company)",
    start: "May 2023",
    end: "Aug 2026",
    highlights: [
      "Owned the target architecture and transition roadmap for partner-enablement and payment platforms processing 200M transactions a day at 10K+ TPS.",
      "Led and coached a 30-person architecture and engineering organisation through Architecture and Engineering Managers.",
      "Identified enterprise capacity risks after the Capital One merger, secured Investment Council approval and directed the £40M, 144-platform convergence programme.",
      "Drove AWS East/West multi-region resilience, CI/CD and automated quality controls to support 99.999% availability.",
      "Translated PCI DSS 4.0 and other regulatory requirements into architecture and controls; applied governed Agentic AI to vulnerability identification and audit monitoring.",
    ],
  },
  {
    role: "Lead Solution Architect",
    company: "Ricoh Europe",
    start: "Sep 2020",
    end: "May 2023",
    highlights: [
      "Shaped the Oracle Cloud migration and integration strategy for a multiyear $500M transformation.",
      "Modernised HR and corporate platforms including SAP SuccessFactors and ServiceNow.",
      "Defined integration patterns, data-quality processes and delivery guardrails.",
    ],
  },
  {
    role: "Senior Architect, Client Advisory & Pre-Sales",
    company: "Pitney Bowes",
    start: "Jan 2018",
    end: "Apr 2020",
    highlights: [
      "Client-facing architecture adviser to financial services clients including HSBC, MUFG and Broadridge.",
      "Architected GDPR, KYC and finance-screening solutions built on data governance and master data management.",
      "Directed POCs, RFP/RFI responses and solution sizing; led architecture for smart-cities and IoT propositions.",
    ],
  },
  {
    role: "Senior Digital Architect & Product Manager",
    company: "Allianz Insurance",
    start: "Nov 2014",
    end: "Dec 2017",
    highlights: [
      "Defined the vision, target operating model and capability roadmap for Allianz UK shared digital services.",
      "Led multidisciplinary teams across customer data, master data and reusable digital services.",
    ],
  },
  {
    role: "Head of Enterprise Architecture, Europe",
    company: "InterGlobe Technologies",
    start: "Mar 2010",
    end: "Oct 2014",
    highlights: [
      "Led a 15-person consulting architecture team across the UK, US and India for clients including Travelport and SITA.",
      "Supported pre-sales and proposals for opportunities worth $2M to $20M.",
    ],
  },
  {
    role: "Architect Lead / Manager",
    company: "Tata Consultancy Services",
    start: "Mar 2001",
    end: "Feb 2010",
    highlights: [
      "Progressed from hands-on Developer to Architect Lead / Manager over nine years.",
      "Managed a $25M integration programme for Saudia integrating 112 systems, including Amadeus and Sabre.",
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
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Post-merger platform convergence",
    client: "Discover Financial Services",
    impact: "£40M · 144 platforms",
    description:
      "Built the evidence base that secured Investment Council funding for enterprise capacity after the Capital One merger, then directed convergence across 144 platforms and applications.",
    tech: ["Architecture strategy", "Investment cases", "Rationalisation"],
  },
  {
    title: "High-throughput payment platforms",
    client: "Discover & Diners Club",
    impact: "200M txns/day · 10K+ TPS",
    description:
      "Target architecture for partner-experience and payment platforms integrated with settlement, fraud and disputes, run against 99.999% availability expectations.",
    tech: ["AWS multi-region", "Microservices", "PCI DSS 4.0"],
  },
  {
    title: "Oracle Cloud transformation",
    client: "Ricoh Europe",
    impact: "$500M programme",
    description:
      "Migration and integration strategy, target architecture and implementation roadmap across SaaS, workflow, HR and shared business platforms.",
    tech: ["Oracle Cloud", "SAP SuccessFactors", "ServiceNow"],
  },
  {
    title: "Airline systems integration",
    client: "Saudia (Saudi Arabian Airlines)",
    impact: "$25M · 112 systems",
    description:
      "Managed and delivered an integration programme spanning SaaS applications and the Amadeus and Sabre travel platforms.",
    tech: ["IBM integration suite", "Amadeus", "Sabre"],
  },
  {
    title: "Regulatory data solutions",
    client: "HSBC · MUFG · Broadridge",
    impact: "GDPR · KYC",
    description:
      "Advised on and architected finance-screening solutions built on data governance and master data management, from POC through to solution sizing.",
    tech: ["Data governance", "MDM", "Pre-sales"],
  },
  {
    title: "Governed Agentic AI",
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
    group: "Sectors & Regulation",
    items: [
      "Payments & banking",
      "Capital markets",
      "Insurance",
      "Travel & aviation",
      "PCI DSS 4.0 · GDPR · KYC",
      "Data governance & MDM",
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
  "Leading SAFe (Scaled Agile)",
];
