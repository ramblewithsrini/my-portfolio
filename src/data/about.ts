// Content for the About page (the site's home page). Edit freely — the layout
// reads everything from here.

export const intro = {
  eyebrow: "About me",
  title: "Fluent at sea level.",
  titleAccent: "Trusted at 30,000 feet.", // non-breaking space keeps "30,000 feet" together
  lead: "I'm Srini. I started as a developer in 2001, grew into an architect, and went on to lead the architects and engineers who build payment platforms at scale — and the data strategy behind them. That path means I can go deep into the code with an engineer in the morning, make the investment case to an executive board in the afternoon — and translate faithfully between the two.",
};

export const portrait = {
  src: "/images/headshot.jpg",
  alt: "Srini Vankeepuram, smiling, in a dark jacket",
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
  { label: "Availability", value: "Available immediately" },
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
      proof: "“A true servant leader” — in my team's own words; credited by an Allianz steering committee",
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
      proof: "Consultant to EY, HSBC and Broadridge · leader at Allianz, Ricoh and Discover",
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
      body: "I now lead the people who do that work. Most recently, a 30-person organisation of architects and engineers, led through Architecture and Engineering Managers, for platforms processing 200M transactions a day — cutting partner onboarding from 73 days to 5–7.",
      strength: "Executives get strategy grounded in engineering reality.",
    },
    {
      role: "Architect",
      altitude: "The systems view",
      era: "TCS to Ricoh Europe",
      body: "I moved from components to whole estates — integrating 112 systems for Saudia, building a household view of the customer at Allianz UK, designing data and regulatory solutions for EY, HSBC and Broadridge, and shaping a $500M cloud transformation.",
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
  body: "Before leading in-house, I spent 15+ years in client-facing consulting at TCS, InterGlobe and Pitney Bowes — from RFI to go-live, and on stage at industry conferences in Dallas and London. I learned to listen first, shape a proposition, size a solution honestly — and then deliver what was sold.",
  stats: [
    { value: "£1.5M+", label: "Annual revenue from the architecture function I built at IGT" },
    { value: "PSS → GSL", label: "SITA account grown into a second line — IGT Game Changer Award, 2014" },
    { value: "$50M", label: "In wins I contributed to at TCS" },
  ],
  capabilities: [
    "Proposals & RFP/RFI responses",
    "Solution sizing",
    "Proof-of-concept leadership",
    "Executive presentations",
    "Trusted-adviser relationships",
  ],
  clients: ["EY", "HSBC", "MUFG", "Broadridge", "McDonald's", "Travelport", "SITA", "Saudia", "Qwest"],
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
      evidence: "Turned stressed, siloed teams into one team at Discover",
    },
    {
      word: "Clarity",
      qualifier: "next",
      body: "Ambiguity is the enemy of delivery. I turn complex estates into a clear target architecture, explicit decision rights and a roadmap everyone can explain.",
      evidence: "A North Star that cut partner onboarding from 73 days to 5–7",
    },
    {
      word: "Delivery",
      qualifier: "always",
      body: "Care and clarity only matter when they ship. I hold a high bar for outcomes and resilience, and I own the hard days as well as the good ones.",
      evidence: "A 3,200% post-merger surge absorbed by the same team",
    },
  ],
};

export const now = {
  title: "My situation",
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
        roles: ["Engineering leadership", "Architecture leadership", "Data & AI leadership"],
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
    body: "Architecture earns its place when it changes a business decision. The £40M convergence at Discover began as an evidence base for an Investment Council — not a diagram.",
  },
  {
    title: "Silos are a trust problem",
    body: "At Discover, stressed teams had stopped collaborating. Recognising the effort, owning the mistakes and removing blame turned them back into one team.",
  },
  {
    title: "Earn adoption — don't mandate it",
    body: "At Allianz UK, architecture workshops showed each project what was in it for them. Six adopted the shared platform, and the steering committee credited the approach.",
  },
  {
    title: "Lead without authority",
    body: "At Ricoh I had no direct reports — just partners and internal experts. Clarity about what's needed, and clearing their blockers, kept six parallel workstreams moving.",
  },
  {
    title: "Leave clients self-sufficient",
    body: "From EY to McDonald's, I trained client teams until they could run the solution without us. A sale isn't finished until the client owns it.",
  },
  {
    title: "Adopt AI with governance",
    body: "A chatbot at Ricoh cut support-desk emails and calls by 27%; Agentic AI at Discover absorbed a 3,200% surge with the same team. Clear guardrails make good teams faster.",
  },
];

// The About page is organised into chapters; the sticky navigator and the
// chapter headers read from here. Section ids match the page's anchors.
export const chapters = [
  {
    id: "who",
    number: "01",
    title: "Who I am",
    teaser: "What makes me different — and how I grew from developer to technology leader.",
    sections: [
      { id: "different", title: "What makes me different" },
      { id: "progression", title: "From code to leadership" },
    ],
  },
  {
    id: "lead",
    number: "02",
    title: "How I lead",
    teaser: "My leadership philosophy, the principles 25 years have taught me, and the books that shaped them.",
    sections: [
      { id: "philosophy", title: "Leadership philosophy" },
      { id: "principles", title: "What 25 years taught me" },
      { id: "bookshelf", title: "What shapes how I lead" },
    ],
  },
  {
    id: "now",
    number: "03",
    title: "Where I am now",
    teaser: "My situation, the roles I'm looking for, and why I built this site.",
    sections: [
      { id: "situation", title: "My situation" },
      { id: "built", title: "Why — and how — I built this site" },
    ],
  },
  {
    id: "beyond",
    number: "04",
    title: "Beyond work",
    teaser: "Family first — and what I love outside work.",
    sections: [{ id: "beyond-work", title: "Beyond work" }],
  },
];

// "In 30 seconds" summary card under the opening, each line linking deeper.
export const summary = {
  title: "In 30 seconds",
  items: [
    {
      text: "Architecture, engineering & data leader — 25 years, from developer to Head of Technology.",
      href: "#different",
    },
    {
      text: "Led payments platforms at 200M transactions a day, and absorbed a 3,200% post-merger surge with Agentic AI — same team.",
      href: "/experience/discover",
    },
    {
      text: "Built a household view of the customer at Allianz UK; six projects adopted the shared platform.",
      href: "/experience/allianz",
    },
    {
      text: "15+ years in consulting and pre-sales — built a £1.5M-a-year architecture function at IGT, and grew SITA into a second business line.",
      href: "/experience/interglobe",
    },
    {
      text: "Available immediately · London · SC-eligible · in-house or consulting roles.",
      href: "#situation",
    },
  ],
};

// Headline results across the career, shown as a grid under the summary.
export const impact = [
  { value: "200M", label: "Transactions a day", href: "/experience/discover" },
  { value: "73 → 5–7", label: "Days to onboard a partner", href: "/experience/discover" },
  { value: "3,200%", label: "Surge absorbed with Agentic AI, same team", href: "/experience/discover" },
  { value: "27%", label: "Fewer support calls via an AI chatbot", href: "/experience/ricoh" },
  { value: "21%", label: "Better MDM matching rates", href: "/experience/allianz" },
  { value: "$500M", label: "Oracle Cloud transformation", href: "/experience/ricoh" },
  { value: "£40M", label: "Convergence across 144 platforms", href: "/experience/discover" },
  { value: "£1.5M+", label: "Annual revenue from a function I built", href: "/experience/interglobe" },
];

// Books that shaped my leadership — each tied to where it shows up in my work.
export const bookshelf = {
  title: "What shapes how I lead",
  lead: "Four books I keep coming back to — and where each one shows up in my work.",
  books: [
    {
      title: "Leaders Eat Last",
      author: "Simon Sinek",
      idea: "Leaders create safety by taking the pressure themselves, so their teams don't have to.",
      inPractice: "When work surged at Discover, I absorbed the pressure rather than passing it down — one of my architects described exactly that in their recommendation.",
      href: "/testimonials",
      linkLabel: "Read the recommendations",
    },
    {
      title: "Start With Why",
      author: "Simon Sinek",
      idea: "People commit to a purpose long before they commit to a plan.",
      inPractice: "At Allianz UK I opened with why a shared platform mattered to each team — and six projects chose to adopt it instead of building their own.",
      href: "/experience/allianz",
      linkLabel: "The Allianz story",
    },
    {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      idea: "Understand before you try to be understood, and start with the end in mind.",
      inPractice: "Discovery workshops before any solution design, and a North Star before any roadmap — from Pitney Bowes clients to Discover's convergence.",
      href: "/experience/discover",
      linkLabel: "The Discover story",
    },
    {
      title: "The 21 Irrefutable Laws of Leadership",
      author: "John C. Maxwell",
      idea: "Leadership is influence — it isn't a job title.",
      inPractice: "At Ricoh I had no direct reports. Progress came from influence: giving partners clarity and clearing their blockers.",
      href: "/experience/ricoh",
      linkLabel: "The Ricoh story",
    },
  ],
  podcast: "And I keep learning: Simon Sinek's podcast, A Bit of Optimism, is a regular listen.",
  currentlyReading: {
    title: "The Infinite Game",
    author: "Simon Sinek",
    image: "/images/reading-the-infinite-game.jpg",
    alt: "Srini reading The Infinite Game by Simon Sinek at home",
  },
};

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
      image: { src: "/images/casual.jpg", alt: "Srini smiling at home in a relaxed orange T-shirt" },
      body: "The roles I'm proudest of. They keep me grounded, teach me patience daily, and remind me what really matters when work gets loud.",
      featured: true,
    },
    {
      eyebrow: "On the pitch",
      title: "Cricket & Badminton",
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
