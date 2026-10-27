// Content for the About page (the site's home page). Edit freely — the layout
// reads everything from here.

export const intro = {
  eyebrow: "About me",
  title: "Fluent at sea level.",
  titleAccent: "Trusted at 30,000 feet.", // non-breaking space keeps "30,000 feet" together
  lead: "If you need someone to take a complex, regulated technology estate and turn it into a funded plan that actually ships, that's what I do. Most recently I led architecture, engineering and data for the partner and payment platforms of a global payments network: 200M transactions a day at 99.999%, carried through a merger, a multi-year platform convergence and PCI DSS 4.0. I started as a developer in 2001, and that's still my edge: I can go deep into the code with an engineer in the morning, make the investment case to an executive board in the afternoon, and translate faithfully between the two.",
};

export const portrait = {
  src: "/images/headshot.jpg",
  alt: "Srini Vankeepuram, smiling, in a dark jacket",
};

// inCard: shown under the photo; the rest sit in a grid under the opening text.
export const glance = [
  { label: "Seeking", value: "Permanent Director / Head of Engineering, Architecture or Data & AI", inCard: true },
  { label: "Based in", value: "London, UK", inCard: true },
  { label: "Worked in", value: "India · US · UK · Saudi Arabia · UAE" },
  { label: "Experience", value: "25 years · 15+ in consulting" },
  { label: "Recognition", value: "Employee of the Year on three client accounts · conference speaker since 2007" },
  { label: "Influence", value: "Deputy Chair, enterprise design governance board · {articles} published pieces · {recommendations} recommendations" },
  {
    label: "Focus",
    value: "Regulated industries — fintech, payments, insurtech, airlines, telecoms, retail",
  },
  { label: "Clearance", value: "Eligible for SC" },
  { label: "Availability", value: "In an interim technical leadership role · open to permanent roles", inCard: true },
];

export const uniqueness = {
  title: "What makes me different",
  headline: "I've built it, designed it and led it —",
  headlineAccent: "and I've sat on both sides of the table.",
  pillars: [
    {
      eyebrow: "How I lead",
      title: "People-centric leader",
      body: "I recognise the effort behind the outcome, own the mistakes and keep blame out of the room — so teams collaborate instead of protecting themselves. “A true servant leader,” in my team's own words.",
      proof: "Rated by my team as the company's top manager of a larger team (2025 employee survey) · only one person left in three years, by choice",
    },
    {
      eyebrow: "Where I come from",
      title: "Still building",
      body: "25 years from developer to Head of Technology, and I still build: an MDM engine, RAG on AWS Bedrock and a knowledge graph, all with public code.",
      proof: "Hands-on labs with tests and evaluations, open on GitHub",
    },
    {
      eyebrow: "Where I've worked",
      title: "Both sides of the table",
      body: "15+ years in consulting and pre-sales, plus in-house leadership in insurance, technology and payments. I know how suppliers win and deliver — and how clients buy, fund and own change.",
      proof: "Consultant to a Big Four firm and global banks · leader in insurance, technology and payments",
    },
  ],
  result: {
    title: "A leader who's credible in every room",
    body: "The combination is rare: someone engineers trust, executives back, clients believe and suppliers respect — because I've stood where each of them stands.",
    rooms: ["Engineers", "Architects", "Executives", "Clients", "Vendors"],
  },
};

// "Where I have influence": four arenas, each item backed by a page on the site.
// {articles} and {recommendations} are filled in with live counts by the page.
export const influence = {
  title: "Where I have influence",
  headline: "Influence isn't a title.",
  headlineAccent: "It's what changes because you were in the room.",
  arenas: [
    {
      eyebrow: "In the boardroom",
      title: "Decisions won with evidence",
      items: [
        { text: "Won executive approval for a multi-year convergence, framed around the merger's own goal", href: "/insights/converging-144-applications-after-a-merger" },
        { text: "Changed a CIO's plan: kept a critical mainframe running safely instead of a rushed replacement", href: "/insights/saying-no-safely" },
        { text: "Stopped a platform move 120 days before go-live, after several presentations made the evidence win", href: "/leadership" },
      ],
    },
    {
      eyebrow: "Across the enterprise",
      title: "Standards others build to",
      items: [
        { text: "Deputy Chair of the enterprise design governance board, reviewing 50–75 designs a year across the company", href: "/experience/discover" },
        { text: "Ran an architecture community of practice, and defined career pathways for architects", href: "/experience/discover" },
        { text: "Won six projects over to a shared platform through workshops, not mandates", href: "/insights/winning-consumers-for-a-shared-platform" },
      ],
    },
    {
      eyebrow: "In the industry",
      title: "A voice beyond my employer",
      items: [
        { text: "Spoke at IBM's MDM conference at Hursley and the Pitney Bowes conference in Dallas, and gave a short talk at a Neo4j event in London", href: "/experience/pitney-bowes" },
        { text: "{articles} published case studies and articles on architecture, data, AI and leadership", href: "/insights" },
        { text: "{recommendations} recommendations from managers, peers and the people I've led", href: "/testimonials" },
      ],
    },
    {
      eyebrow: "With people",
      title: "Leaders who grow leaders",
      items: [
        { text: "Grew engineers and architects into senior roles, and mentored a hire who later became a CTO", href: "/leadership" },
        { text: "Nominated someone in my team for the President's Award, made the case, and won it for them", href: "/leadership" },
        { text: "Co-led a 400-member employee resource group: career panels, leadership talks and a podcast-style interview show, mentoring 15+ colleagues", href: "#beyond-work" },
      ],
    },
  ],
};

export const progression = {
  title: "From code to leadership",
  lead: "Every step up the ladder added a wider view — without giving up the one before it. That's the strength I bring: a technology leader with an engineer's instincts and an architect's eye.",
  stages: [
    // Most recent first (reverse chronological).
    {
      role: "Technology leader",
      altitude: "30,000 feet",
      era: "Consulting to payments",
      body: "I now lead the people who do that work: most recently an organisation of architects and engineers at a global payments network, led through their managers, running payment platforms through a merger and a platform convergence.",
      strength: "Executives get strategy grounded in engineering reality.",
    },
    {
      role: "Architect",
      altitude: "The systems view",
      era: "Systems integration to enterprise",
      body: "I moved from components to whole estates — integrating 112 systems for a national airline, building a household view of the customer at a global insurer, designing data and regulatory solutions for a Big Four firm and global banks, and contributing to a global technology company's move to Oracle Cloud.",
      strength: "I see how every decision ripples across platforms, data and teams.",
    },
    {
      role: "Developer",
      altitude: "Sea level",
      era: "A global systems integrator · from 2001",
      body: "I started by writing and shipping code for enterprise integration. I learned how systems really behave under load — and exactly how they fail.",
      strength: "Engineers trust my judgement because I've done their job.",
    },
  ],
};

export const philosophy = {
  title: "Leadership philosophy",
  headline: ["I modernise platforms", "and humanise leadership."],
  mantra: "People first. Clarity next. Delivery always.",
  pillars: [
    {
      word: "People",
      qualifier: "first",
      body: "Great platforms are built by teams who feel trusted. I invest in people — coaching managers, giving real ownership, and creating the safety to raise problems early. Having worked onsite in India, the US, the UK, Saudi Arabia and Dubai, I know each centre from the inside, so I lead distributed teams as one team, not onshore and offshore.",
      evidence: "Turned stressed, siloed teams into one team",
    },
    {
      word: "Clarity",
      qualifier: "next",
      body: "Ambiguity is the enemy of delivery. I turn complex estates into a clear target architecture, explicit decision rights and a roadmap everyone can explain.",
      evidence: "A shared-platform vision that six projects adopted",
    },
    {
      word: "Delivery",
      qualifier: "always",
      body: "Care and clarity only matter when they ship. I hold a high bar for outcomes and resilience, and I own the hard days as well as the good ones.",
      evidence: "A multi-year convergence approved, with measurable three-year targets",
    },
  ],
};

export const now = {
  title: "Now",
  paragraphs: [
    "I'm currently in an interim technical leadership role.",
    "Before that, I spent three years leading architecture, engineering and data for the partner and payment platforms of a global card network, through its acquisition and the convergence that followed. Seeing a merger from the inside taught me that well-run integration is how organisations get stronger.",
    "I'm open to the right permanent leadership role, and I'm choosing it deliberately.",
  ],
  strongFit: {
    title: "Where I'd be a strong fit",
    items: [
      "A complex, regulated estate that needs one funded plan everyone can explain",
      "A merger or platform convergence: deciding what deserves to survive",
      "Bringing AI into engineering safely, with governance that makes teams faster",
      "Teams that need trust rebuilt and delivery back on track",
    ],
  },
  buildingNow: {
    title: "What I'm building right now",
    body: "I still build to learn: most recently a research knowledge graph with entity resolution, GraphRAG and an MCP server, measured against a fixed evaluation set.",
    links: [
      { label: "The knowledge graph lab", href: "/lab/research-graph" },
      { label: "How I measured it", href: "/insights/knowledge-graph-graphrag-mcp" },
    ],
  },
  howIStart: {
    label: "See how I'd start in your role",
    href: "/insights/first-90-days-director-of-engineering",
  },
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
  },
};

export const principles = [
  {
    title: "Start with the investment case",
    body: "Architecture earns its place when it changes a business decision. A multi-year platform convergence I led began as an evidence base for an investment decision — not a diagram.",
  },
  {
    title: "Silos are a trust problem",
    body: "In one organisation, stressed teams had stopped collaborating. Recognising the effort, owning the mistakes and removing blame turned them back into one team.",
  },
  {
    title: "Earn adoption — don't mandate it",
    body: "At a global insurer, architecture workshops showed each project what was in it for them. Six adopted the shared platform, and the steering committee credited the approach.",
  },
  {
    title: "Lead without authority",
    body: "On one transformation I had no direct reports — just partners and internal experts. Clarity about what's needed, and clearing their blockers, kept six parallel workstreams moving.",
  },
  {
    title: "Leave clients self-sufficient",
    body: "From a Big Four firm to a global consumer brand, I trained client teams until they could run the solution without us. A sale isn't finished until the client owns it.",
  },
  {
    title: "Adopt AI with governance",
    body: "A chatbot I architected cut support-desk emails and calls by 27%; Agentic AI absorbed a 360% surge with the same team. Clear guardrails make good teams faster.",
  },
];

// The About page is organised into chapters; the sticky navigator and the
// chapter headers read from here. Section ids match the page's anchors.
export const chapters = [
  {
    id: "who",
    number: "01",
    title: "Who I am",
    short: "Who I am",
    teaser: "What makes me different, where I have influence, and how I grew from developer to technology leader.",
    sections: [
      { id: "different", title: "What makes me different" },
      { id: "influence", title: "Where I have influence" },
      { id: "progression", title: "From code to leadership" },
    ],
  },
  {
    id: "lead",
    number: "02",
    title: "How I lead",
    short: "How I lead",
    teaser: "My leadership philosophy — with the principles and books behind it one click away.",
    sections: [{ id: "philosophy", title: "Leadership philosophy" }],
  },
  {
    id: "now",
    number: "03",
    title: "Where I am now",
    short: "Now",
    teaser: "What I'm doing now, where I'd be a strong fit, and why I built this site.",
    sections: [
      { id: "situation", title: "Now" },
      { id: "built", title: "Built with Claude Code" },
    ],
  },
  {
    id: "beyond",
    number: "04",
    title: "Beyond work",
    short: "Beyond work",
    teaser: "Family first — and what I love outside work.",
    sections: [{ id: "beyond-work", title: "Beyond work" }],
  },
];

// "In 30 seconds" summary card under the opening, each line linking deeper.
export const summary = {
  title: "In 30 seconds",
  items: [
    {
      text: "25 years in technology, the last decade leading architecture and engineering across payments, insurance, technology and consulting: fluent with engineers, trusted by executive boards.",
      href: "#different",
    },
    {
      text: "Lead through people: grew engineers and architects into senior roles, and kept the team together through a merger.",
      href: "/leadership",
    },
    {
      text: "Steered a global payments network through a merger without dropping below 99.999% availability: mapped the combined estate, tested it for the extra load, and won approval for a multi-year convergence by deciding, application by application, what deserved to survive.",
      href: "/insights/converging-144-applications-after-a-merger",
    },
    {
      text: "Said no when it was the safe answer: kept a critical mainframe running rather than rush its replacement, and stopped a platform move 120 days before go-live.",
      href: "/insights/saying-no-safely",
    },
    {
      text: "Put governed AI to work early: an agent live in four months that absorbed a post-merger surge with the same team, and AI-assisted delivery that took team velocity from 10–15 to 45–60 story points a sprint.",
      href: "/insights/absorbing-a-360-percent-surge",
    },
    {
      text: "Gave a global insurer one trusted view of every customer and household.",
      href: "/experience/allianz",
    },
    {
      text: "Architected an airline innovation lab whose demonstrations were used by British Airways, KLM and SITA, and built an architecture practice from zero.",
      href: "/experience/tcs",
    },
    {
      text: "Co-founded TalkMusically as CTO, with our own codec to carry music and voice on one call and close to £1.5M raised, and I still build to learn: an MDM engine and a knowledge graph, with public code.",
      href: "/lab",
    },
  ],
};

// Compact "how I built this site" card on About; the detail is on /under-the-hood.
export const builtCard = {
  title: "Built with Claude Code",
  body: "I built this site with Claude Code to stay hands-on with AI — and to show what a CV can't. Every decision behind it is open to inspect.",
};

// Books that shaped my leadership — each tied to where it shows up in my work.
export const bookshelf = {
  title: "What shapes how I lead",
  lead: "Four books I keep coming back to — and where each one shows up in my work.",
  books: [
    {
      title: "Leaders Eat Last",
      author: "Simon Sinek",
      idea: "Leaders create safety by taking the pressure themselves, so their teams don't have to.",
      inPractice: "When work surged, I absorbed the pressure rather than passing it down — one of my architects described exactly that in their recommendation.",
      href: "/testimonials",
      linkLabel: "Read the recommendations",
    },
    {
      title: "Start With Why",
      author: "Simon Sinek",
      idea: "People commit to a purpose long before they commit to a plan.",
      inPractice: "At a global insurer, I opened with why a shared platform mattered to each team — and six projects chose to adopt it instead of building their own.",
      href: "/experience/allianz",
      linkLabel: "The insurance case study",
    },
    {
      title: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
      idea: "Understand before you try to be understood, and start with the end in mind.",
      inPractice: "Discovery workshops before any solution design, and a North Star before any roadmap — from consulting clients to a post-merger platform convergence.",
      href: "/experience/discover",
      linkLabel: "The payments case study",
    },
    {
      title: "The 21 Irrefutable Laws of Leadership",
      author: "John C. Maxwell",
      idea: "Leadership is influence — it isn't a job title.",
      inPractice: "On one transformation I had no direct reports. Progress came from influence: giving partners clarity and clearing their blockers.",
      href: "/experience/ricoh",
      linkLabel: "The transformation case study",
    },
  ],
  podcast: "And I keep learning: Simon Sinek's podcast, A Bit of Optimism, is a regular listen.",
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
      title: "Community host, governor, fundraiser",
      body: "At my last employer I co-led our 400-member Asian Pacific employee resource group: hosting career panels and leadership talks, speaking at our events, and running a podcast-style show where I interviewed the group's leaders. Outside work, I serve as a Parent Governor at my son's school, helped raise more than £3,000 for it last year, and support fundraising for his cricket club.",
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
