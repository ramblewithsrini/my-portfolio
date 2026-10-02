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
  leadership?: string[]; // how I led: people, coaching, culture
  lessons?: string[];
  tech?: string[];
  quotes?: string[];
};

export const stories: Record<string, Story> = {
  discover: {
    summary:
      "Accountable for architecture and engineering of Discover and Diners partner-experience and payment platforms, integrated with settlement, fraud and disputes services, advising Product, business and executive stakeholders on strategy, investment and risk.",
    scope: [
      { label: "Team", value: "30-person architecture & engineering organisation, led through Architecture and Engineering Managers" },
      { label: "Platforms", value: "Discover and Diners partner-experience and payment platforms" },
      { label: "Integrations", value: "Settlement, fraud and disputes services" },
      { label: "Stakeholders", value: "Product, business and executive leadership" },
    ],
    outcomes: [
      { value: "200M", label: "Transactions a day" },
      { value: "10K+", label: "Transactions per second" },
      { value: "99.999%", label: "Availability expectation" },
      { value: "£40M", label: "Convergence across 144 platforms" },
    ],
    achievements: [
      {
        title: "Post-merger capacity and convergence",
        challenge: "Enterprise capacity risks surfaced after the Capital One merger.",
        approach: "Developed scalable options and built the evidence base for an Investment Council decision.",
        outcome: "Secured Investment Council approval and directed the £40M convergence programme across 144 platforms and applications.",
      },
      {
        title: "P3 unified solution",
        challenge: "Payment, settlement, fraud and disputes capabilities spread across multiple teams.",
        approach: "Aligned the teams around shared services, governed interfaces and sequenced delivery.",
      },
    ],
    tech: ["AWS multi-region", "CI/CD", "PCI DSS 4.0", "Agentic AI", "ServiceNow", "Salesforce", "MongoDB"],
    quotes: [
      "Srini set clear technical direction and consistently brought the right issues to leadership’s attention, influencing decisions with sound judgment rather than just executing instructions.",
      "Srini led the development of a comprehensive vision for a consolidated customer portal that unified the customer experience, eliminated friction points, and significantly improved overall customer satisfaction.",
      "High-demand work tends to route through a manager first, and instead of passing that pressure down, he absorbed it himself.",
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
