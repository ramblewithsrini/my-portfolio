// Content for the About page (the site's home page). Edit freely — the layout
// reads everything from here.

export const intro = {
  eyebrow: "About me",
  title: "Twenty-five years in.",
  titleAccent: "Still building.",
  lead: "I'm Srini — an architecture and engineering leader who has spent a career turning complex technology estates into decisions a business can fund and teams can deliver. I started as a developer at TCS in 2001; most recently I led a 30-person architecture and engineering organisation for payment platforms processing 200M transactions a day.",
};

export const glance = [
  { label: "Based in", value: "London, UK" },
  { label: "Experience", value: "25 years · 15+ in consulting" },
  { label: "Focus", value: "Financial services & payments" },
  { label: "Clearance", value: "Eligible for SC" },
  { label: "Status", value: "Open to new opportunities" },
];

export const philosophy = {
  title: "Leadership philosophy",
  headline: ["I modernise platforms", "and humanise leadership."],
  mantra: "People first. Clarity next. Delivery always.",
  pillars: [
    {
      word: "People",
      qualifier: "first",
      body: "Great platforms are built by teams who feel trusted. I invest in people — coaching managers, giving real ownership, and creating the safety to raise problems early.",
      evidence: "Led and coached a 30-person organisation through its managers",
    },
    {
      word: "Clarity",
      qualifier: "next",
      body: "Ambiguity is the enemy of delivery. I turn complex estates into a clear target architecture, explicit decision rights and a roadmap everyone can explain.",
      evidence: "Target architecture for platforms processing 200M transactions a day",
    },
    {
      word: "Delivery",
      qualifier: "always",
      body: "Care and clarity only matter when they ship. I hold a high bar for outcomes and resilience, and I own the hard days as well as the good ones.",
      evidence: "£40M, 144-platform convergence · 99.999% availability",
    },
  ],
};

export const now = {
  title: "Where I am now",
  paragraphs: [
    "In August 2026, my role as Head of Technology for Partner Experience and Payments at Discover was made redundant as part of Capital One's restructuring following the acquisition.",
    "Restructuring is something I understand from the inside — I directed the £40M, 144-platform convergence programme after the merger. Being on the other side of it hasn't changed my view: well-run integration is how organisations get stronger.",
    "It has also given me something rare in a 25-year career: time to step back, sharpen my tools and choose my next chapter deliberately.",
  ],
  lookingFor:
    "Senior architecture and engineering leadership — in consulting or in-house — in financial services and payments, where I can turn complex estates into investment cases and deliverable roadmaps, and grow the next generation of leaders.",
};

export const why = [
  {
    title: "To stay hands-on with AI",
    body: "I've spent recent years helping a regulated organisation adopt Agentic AI responsibly. I wanted first-hand experience of building with it. This site was built with Claude Code — from an empty folder to a version-controlled Next.js application — with me setting direction, making the design and privacy calls, and reviewing every change. Leaders who direct AI-enabled teams should know what the work actually feels like.",
  },
  {
    title: "To show what a CV can't",
    body: "A CV is a list of outcomes. It doesn't show how I think, how I lead, or the lessons behind the numbers. This page is where I share them — the principles that 25 years across consulting, insurance and payments have taught me.",
  },
];

export const principles = [
  {
    title: "Start with the investment case",
    body: "Architecture earns its place when it changes a business decision. The £40M convergence programme at Discover began as an evidence base for an Investment Council — not a diagram.",
  },
  {
    title: "Lead through leaders",
    body: "At scale, my job is to grow the people who grow the teams: clear decision rights, real service ownership, and coaching managers to lead with accountability.",
  },
  {
    title: "Design for the bad day",
    body: "When platforms carry 200M transactions a day, resilience is a culture, not a feature — multi-region design, automated quality gates and honest root-cause analysis.",
  },
  {
    title: "Advise before you architect",
    body: "Fifteen years in client-facing roles taught me that the best solution is the one a client can fund, deliver and own. Listening comes before drawing.",
  },
  {
    title: "Keep the engineering foundation",
    body: "I began as a developer. Staying close to the craft keeps my credibility with engineers and my judgement sharp on trade-offs — this site is part of that.",
  },
  {
    title: "Adopt AI with governance",
    body: "Agentic AI is a capability, not a strategy. With clear guardrails — as we applied to vulnerability identification and audit monitoring — it makes good teams faster.",
  },
];

export const journey = [
  { year: "2001", org: "TCS", theme: "Learned the craft — developer to architect lead" },
  { year: "2010", org: "InterGlobe", theme: "Built and led a European architecture practice" },
  { year: "2014", org: "Allianz", theme: "Saw transformation from the client side" },
  { year: "2018", org: "Pitney Bowes", theme: "Advised global banks on data and regulation" },
  { year: "2020", org: "Ricoh Europe", theme: "Shaped a $500M Oracle Cloud transformation" },
  { year: "2023", org: "Discover", theme: "Led payments technology at scale" },
  { year: "Next", org: "Your organisation?", theme: "Open to the next chapter" },
];

export const buildLog = {
  title: "How this site was built",
  lead: "Built in conversation with Claude Code. I acted as product owner and architect; the AI did the typing.",
  steps: [
    {
      step: "Brief",
      body: "Set the purpose, audience and style — a portfolio, bold and modern, on Next.js.",
    },
    {
      step: "Scaffold",
      body: "Next.js 16, TypeScript and Tailwind CSS, with all content separated into data files so it can change without touching layout.",
    },
    {
      step: "Content",
      body: "Imported my CV straight from Word, then made deliberate calls about what to publish — no phone number on a public site.",
    },
    {
      step: "Review",
      body: "Checked every page on desktop and mobile, and fixed issues such as hero content waiting on JavaScript before it appeared.",
    },
    {
      step: "Ship",
      body: "Version-controlled in GitHub with clear commit history, ready for continuous deployment.",
    },
  ],
  stack: ["Claude Code", "Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "GitHub"],
  takeaway:
    "The lesson for leaders: AI doesn't remove the need for judgement — it moves it. The valuable work became framing the problem, making trade-offs and reviewing the output.",
};
