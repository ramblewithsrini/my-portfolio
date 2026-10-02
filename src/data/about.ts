// Content for the About page (the site's home page). Edit freely — the layout
// reads everything from here.

export const intro = {
  eyebrow: "About me",
  title: "Fluent at sea level.",
  titleAccent: "Trusted at 30,000 feet.", // non-breaking space keeps "30,000 feet" together
  lead: "I'm Srini. I started as a developer in 2001, grew into an architect, and went on to lead the architects and engineers who build payment platforms at scale. That path means I can go deep into the code with an engineer in the morning, make the investment case to an executive board in the afternoon — and translate faithfully between the two.",
};

export const glance = [
  { label: "Path", value: "Developer → Architect → Technology leader" },
  { label: "Based in", value: "London, UK" },
  { label: "Experience", value: "25 years · 15+ in consulting" },
  {
    label: "Focus",
    value: "Regulated industries — fintech, payments, insurtech, airlines, retail",
  },
  { label: "Clearance", value: "Eligible for SC" },
  { label: "Status", value: "Open to new opportunities" },
];

export const uniqueness = {
  title: "What makes me different",
  headline: "I've built it, designed it and led it —",
  headlineAccent: "and I've sat on both sides of the table.",
  pillars: [
    {
      eyebrow: "How I lead",
      title: "People-centric leader",
      body: "People first, clarity next, delivery always. I recognise the effort behind the outcome, own the mistakes and keep blame out of the room — so teams collaborate instead of protecting themselves.",
      proof: "“A true servant leader” — in my team's own words",
    },
    {
      eyebrow: "Where I come from",
      title: "Grown from the code up",
      body: "Developer, then architect, then technology leader. I can challenge a design with an engineer at sea level and make the investment case to an executive board at 30,000 feet.",
      proof: "25 years, from writing code to leading a 30-person organisation",
    },
    {
      eyebrow: "Where I've worked",
      title: "Both sides of the table",
      body: "15+ years in consulting and pre-sales, plus in-house leadership at Allianz, Ricoh and Discover. I know how suppliers win and deliver — and how clients buy, fund and own change.",
      proof: "$50M in pre-sales wins · £40M programme directed in-house",
    },
  ],
  result: {
    title: "A leader who's credible in every room",
    body: "The combination is rare: someone engineers trust, executives back, clients believe and suppliers respect — because I've stood where each of them stands.",
    rooms: ["Engineers", "Architects", "Executives", "Clients", "Vendors"],
  },
  bothWorlds: {
    title: "Two worlds, one perspective",
    lead: "Whichever side of the table you're on, I bring the view from the other side.",
    sides: [
      {
        label: "For consulting firms",
        title: "I bring the client's view",
        body: "I've been the client. I know how buyers evaluate proposals, fund programmes and judge delivery — which makes for propositions that land and engagements clients renew.",
        points: [
          "Proposals written from the buyer's side of the table",
          "Credibility with client CTOs and architecture leaders",
          "Honest solution sizing — I've lived with the consequences",
          "Deep domain knowledge in payments, banking, insurance and travel",
        ],
      },
      {
        label: "For in-house teams",
        title: "I bring the consultant's edge",
        body: "I know how suppliers scope, price and staff their work. That makes me a sharper buyer, a better partner, and a leader who brings pace and structure to change.",
        points: [
          "Stronger vendor selection, contracts and statements of work",
          "Build-buy-partner decisions grounded in how vendors really operate",
          "Business cases and executive storytelling sharpened in pre-sales",
          "Delivery discipline from fixed-scope client programmes",
        ],
      },
    ],
  },
};

export const progression = {
  title: "From code to leadership",
  lead: "Every step up the ladder added a wider view — without giving up the one before it. That's the strength I bring: a technology leader with an engineer's instincts and an architect's eye.",
  stages: [
    // Most recent first (reverse chronological).
    {
      role: "Technology leader",
      altitude: "30,000 feet",
      era: "InterGlobe to Discover",
      body: "I now lead the people who do that work. Most recently, a 30-person organisation of architects and engineers, led through Architecture and Engineering Managers, for platforms processing 200M transactions a day.",
      strength: "Executives get strategy grounded in engineering reality.",
    },
    {
      role: "Architect",
      altitude: "The systems view",
      era: "TCS to Ricoh Europe",
      body: "I moved from components to whole estates — integrating 112 systems for Saudia, designing data and regulatory platforms for global banks, and shaping a $500M cloud transformation.",
      strength: "I see how every decision ripples across platforms, data and teams.",
    },
    {
      role: "Developer",
      altitude: "Sea level",
      era: "TCS · from 2001",
      body: "I started by writing and shipping code for enterprise integration. I learned how systems really behave under load — and exactly how they fail.",
      strength: "Engineers trust my judgement because I've done their job.",
    },
  ],
};

export const altitude = {
  title: "The advantage of both altitudes",
  seaLevel: {
    label: "At sea level",
    items: [
      "Reviewing designs in detail with engineers",
      "Triaging high-severity incidents through to root cause",
      "Turning PCI DSS 4.0 requirements into real controls",
      "Rolling up my sleeves to unblock a stubborn problem",
    ],
  },
  highLevel: {
    label: "At 30,000 feet",
    items: [
      "Building investment cases that win Investment Council approval",
      "Owning target architecture and multi-year roadmaps",
      "Leading build-buy-partner decisions with strategic vendors",
      "Directing a £40M, 144-platform convergence programme",
    ],
  },
  bridge:
    "Most leaders are comfortable at one altitude. My value is moving between them in the same day — so strategy stays honest, and engineering stays aligned to what the business needs.",
};

export const consulting = {
  title: "Consulting and pre-sales, built in",
  body: "Before leading in-house, I spent 15+ years in client-facing consulting at TCS, InterGlobe and Pitney Bowes. I learned to listen first, shape a proposition, size a solution honestly — and then deliver what was sold.",
  stats: [
    { value: "$50M", label: "In wins I contributed to at TCS" },
    { value: "$2–25M", label: "Opportunities shaped across TCS and InterGlobe" },
    { value: "$25M", label: "Saudia programme delivered across 112 systems" },
  ],
  capabilities: [
    "Proposals & RFP/RFI responses",
    "Solution sizing",
    "Proof-of-concept leadership",
    "Executive presentations",
    "Trusted-adviser relationships",
  ],
  clients: ["HSBC", "MUFG", "Broadridge", "Travelport", "SITA", "Saudia", "Qwest"],
};

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
  lookingFor: {
    summary:
      "Senior roles where I can turn complex estates into investment cases and deliverable roadmaps — and grow the next generation of leaders.",
    tracks: [
      {
        label: "In-house",
        roles: ["Engineering leadership", "Architecture leadership", "Data leadership"],
      },
      {
        label: "Consulting",
        roles: ["Pre-sales", "Client engagement", "Customer-facing leadership"],
      },
    ],
    focus:
      "Sectors: Fintech · Payments · Insurtech · Airlines · Retail — or any regulated environment",
  },
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

export const beyondWork = {
  title: "Beyond work",
  lead: "Family first — always. Everything else, including how I lead, flows from that.",
  items: [
    {
      eyebrow: "Family",
      title: "Dad, husband, son",
      body: "The roles I'm proudest of. They keep me grounded, teach me patience daily, and remind me what really matters when work gets loud.",
      featured: true,
    },
    {
      eyebrow: "On the pitch",
      title: "Cricket & badminton",
      body: "Cricket taught me early that the team's total matters more than any one innings. Badminton keeps the reflexes sharp.",
    },
    {
      eyebrow: "On foot",
      title: "Long walks",
      body: "Some of my best thinking happens walking — it's where tangled problems tend to untangle themselves.",
    },
    {
      eyebrow: "Giving back",
      title: "Parent Governor & fundraiser",
      body: "I serve as a Parent Governor at my son's school and help raise funds for his cricket club. Governance and stakeholders — with tougher critics.",
    },
    {
      eyebrow: "Downtime",
      title: "The Big Bang Theory & Ted Lasso",
      body: "My favourite comfort viewing. Ted Lasso is quietly one of the best leadership manuals around: lead with belief, kindness and a biscuit.",
    },
  ],
  closing: {
    title: "Family first.",
    body: "It isn't a slogan — it's why \"People first\" comes so naturally at work. Every person on the teams I lead is someone's family too, and I lead them that way.",
  },
};
