// Articles for the Insights section (/insights).
//
// Drafts are only visible when running locally (`npm run dev`) — never on the
// live site. To publish an article, resolve every "note" block, delete them,
// and set `status: "published"`. The Insights link appears in the nav once at
// least one article is published.

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "note"; text: string } // editor's note for drafts — shown locally only
  // Diagrams and tables, drawn by the article page.
  | { type: "stages"; caption: string; items: { name: string; when: string; goal: string; outputs: string[] }[] }
  | { type: "roles"; caption: string; tiers: { tier: string; purpose: string; roles: { name: string; does: string }[] }[] }
  | { type: "table"; caption: string; head: string[]; rows: string[][]; sources?: { label: string; href: string }[] }
  // A hand-drawn architecture diagram, picked by name from the article page.
  | { type: "diagram"; name: "shared-data-platform" | "time-model"; caption: string };

/** The readable words in a block, for reading time. */
function blockWords(b: Block): string[] {
  switch (b.type) {
    case "list":
      return b.items;
    case "stages":
      return b.items.flatMap((i) => [i.name, i.goal, ...i.outputs]);
    case "roles":
      return b.tiers.flatMap((t) => [t.purpose, ...t.roles.flatMap((r) => [r.name, r.does])]);
    case "table":
      return b.rows.flat();
    case "diagram":
      return [b.caption];
    default:
      return [b.text];
  }
}

export type Article = {
  slug: string;
  title: string;
  dek: string; // one-line summary under the title
  date: string; // YYYY-MM-DD
  status: "draft" | "published";
  tags: string[];
  caseStudy?: string; // related role slug, linked at the end of the article
  blocks: Block[];
};

export const articles: Article[] = [
  {
    slug: "converging-144-applications-after-a-merger",
    title: "Case study: converging 144 applications after a merger",
    dek: "How we decided, application by application, what to invest in, tolerate, migrate or retire, and how that became a £40M, three-year investment case.",
    date: "2026-10-10",
    status: "published",
    tags: ["Case study", "Architecture", "Mergers", "Financial services"],
    blocks: [
      {
        type: "p",
        text: "When the global card network I worked for was acquired by a larger bank, the merger came with a public commitment to cost savings. In my domain that meant a hard question: across 144 partner and payment applications, built up over years of in-house, SaaS and legacy decisions, what should survive?",
      },
      {
        type: "p",
        text: "This is how we answered it, the options we rejected, and the call that went against the grain of the savings everyone expected.",
      },
      { type: "h2", text: "The problem" },
      {
        type: "p",
        text: "The estate had grown the way most estates grow: one sensible decision at a time. The result was duplicated functionality across systems, applications carrying compliance gaps and open vulnerabilities, and custom functionality built on SaaS platforms that were never meant to carry it. Every one of those cost money to run, and every one of them made the partner experience harder to change.",
      },
      { type: "h2", text: "The options" },
      {
        type: "table",
        caption: "What we considered, and why",
        head: ["Option", "Why it was attractive", "Why we did or didn't choose it"],
        rows: [
          ["Lift and shift everything to the target platform", "One big move, simple to explain", "Rejected. Too much risk and investment at once, and it would have moved our problems rather than removed them."],
          ["Move everything off SaaS", "One platform, one way of working", "Rejected. Licence commitments meant some functionality was better left on SaaS, for now."],
          ["Include the mainframe exit", "It would have completed the move off legacy", "Taken out of scope. It could not be completed within three years, and the programme had to deliver inside that window."],
          ["Decide application by application, using Gartner's TIME model", "Slower to start, but every decision has a reason behind it", "Chosen. It let us invest where it paid back and retire what nobody needed."],
        ],
      },
      { type: "h2", text: "The principles" },
      {
        type: "p",
        text: "Before classifying a single application, we agreed the principles every decision had to follow:",
      },
      {
        type: "list",
        items: [
          "Move to the cloud: the target platform on AWS is the default home.",
          "Fix compliance and vulnerabilities first: anything less compliant moves up the list.",
          "One capability, one home: remove duplicated functionality rather than migrate it twice.",
          "Use SaaS for what it is for: custom functionality built on a SaaS platform where it doesn't belong comes back to the target platform.",
        ],
      },
      { type: "h2", text: "The decision: 144 applications, four answers" },
      {
        type: "p",
        text: "We ran workshops with subject-matter experts and business owners for each area, and classified every application using TIME: Tolerate, Invest, Migrate or Eliminate. Functionality earmarked for retirement was marked as such, so nobody spent money improving something we planned to switch off.",
      },
      {
        type: "diagram",
        name: "time-model",
        caption: "The 144 applications on Gartner's TIME grid: business value against technical fitness",
      },
      { type: "h2", text: "The hardest call" },
      {
        type: "p",
        text: "Consolidation creates pressure to move fast, and the hardest decision I made was to slow one move down. An application on a SaaS platform was due to move to our in-house platform within 120 days, before its licence came up for renewal. There were no requirements documents behind it.",
      },
      {
        type: "p",
        text: "My team reverse-engineered the application and found more than 15 functional gaps and a compliance risk. That meant asking the Investment Council to keep paying for that SaaS platform: the opposite of the saving they expected. It took several presentations, but the evidence won, and the move was stopped. A saving that creates a compliance risk isn't a saving.",
      },
      { type: "h2", text: "Making the case" },
      {
        type: "p",
        text: "I didn't present the convergence as an architecture project. I built the story around the merger's own goal: what we could realistically achieve toward the promised cost savings in the first three years, which duplication and risk we would remove, and in what order.",
      },
      {
        type: "p",
        text: "We sequenced the work in two tracks: quick wins and compliance fixes first, to show progress and reduce risk early, then longer strategic roadmaps for the applications that needed more time.",
      },
      { type: "h2", text: "What the council funded" },
      {
        type: "p",
        text: "The Investment Council approved £40M for a three-year programme, against four measurable targets:",
      },
      {
        type: "table",
        caption: "The three-year targets behind the £40M case",
        head: ["Target", "Goal", "Why it matters"],
        rows: [
          ["Compliance", "Every system compliant", "Risk removed, not just moved"],
          ["Duplicate systems", "Reduced by 70%", "One capability, one home"],
          ["Cloud", "75–80% of the estate on AWS", "A modern platform the business can change quickly"],
          ["SaaS licences", "Cut by 25%", "Consolidated licences, and SaaS products we didn't need retired"],
        ],
      },
      {
        type: "p",
        text: "Along the way, every one of the 144 applications had a clear TIME decision and a reason behind it, and a premature move was stopped before it created a compliance risk and more than 15 functional gaps.",
      },
      { type: "h2", text: "What I'd do differently" },
      {
        type: "p",
        text: "Much of the effort went into discovery: finding every system, what it really did and where functionality was duplicated. Next time I would use AI to do the first pass, mapping the systems and flagging likely duplicates from code, configuration and documentation, so the workshops with experts start from a draft map rather than a blank page.",
      },
      { type: "h2", text: "What I'd tell another leader" },
      {
        type: "list",
        items: [
          "Agree the principles before you classify anything. They turn arguments about systems into decisions about rules.",
          "Tie the case to the business goal, not the architecture. The council funded measurable targets for cost and risk, not the diagram.",
          "Scope to what you can finish. Leaving the mainframe out kept the programme credible inside three years.",
          "Do the quick wins and compliance fixes first. Early progress buys patience for the long roadmap.",
          "Be willing to argue against the saving when the evidence says so.",
        ],
      },
      {
        type: "quote",
        text: "Convergence isn't about moving everything. It's about deciding, application by application, what deserves to survive.",
      },
    ],
  },
  {
    slug: "leading-distributed-teams-through-agentic-ai",
    title: "One team, three time zones: leading distributed engineers through the move to Agentic AI",
    dek: "How I keep a team spread across India, the UK and the US working as one, and how I handle the real concerns people raise when AI agents arrive in their work.",
    date: "2026-10-09",
    status: "published",
    tags: ["Leadership", "Agentic AI", "Distributed teams", "Change"],
    blocks: [
      {
        type: "p",
        text: "I was recently asked about my experience of leading a team spread across several countries, and how I bring people with me when Agentic AI changes their work. Thinking it through, I realised they are really one question. Both are about trust: trust that you are treated the same wherever you sit, and trust that a new tool is there to help you, not to replace you.",
      },
      { type: "h2", text: "Part 1: one team, not three" },
      {
        type: "p",
        text: "My most recent teams were spread across India, the UK and the US. The risk in that set-up is never the technology. It is that the team in the same time zone as the leader becomes the 'real' team, and everyone else becomes a delivery centre that receives decisions made while they were asleep.",
      },
      { type: "h3", text: "One bar, wherever you sit" },
      {
        type: "p",
        text: "The same standards, the same career paths and the same visibility apply in every location. Some of my teams owned a domain end to end; others were organised by location. Either way the rule was the same: a team owns an outcome, not a queue of tickets handed over from another office. When someone does great work, the people who make decisions about their career hear about it, whichever office they sit in.",
      },
      { type: "h3", text: "Write decisions down" },
      {
        type: "p",
        text: "If a decision only exists in a meeting, half the team missed it. I write decisions down with the reasons and the trade-offs, and when I inherited a team that had lost the business's trust, a weekly action log shared with everyone did more to rebuild it than any meeting.",
      },
      { type: "h3", text: "Protect the overlap" },
      {
        type: "p",
        text: "Between India and the US there are only a few working hours that everyone shares, so I protected a daily overlap window and kept it for the things that genuinely need a live conversation: decisions, blockers and debate. Status updates moved into writing, so the overlap was never wasted on them.",
      },
      { type: "h3", text: "Meet in person" },
      {
        type: "p",
        text: "Video calls carry the work, but they don't build the relationship. I visited the team in India and brought people together in person, and the difference afterwards was obvious: people who have shared a meal assume good intent when a message lands badly at midnight. Earlier in my career, collaborating with colleagues in Australia on a border-security programme taught me the same lesson from the other side: you don't need to manage people to need their trust.",
      },
      { type: "h3", text: "Build communities, not just reporting lines" },
      {
        type: "p",
        text: "An architecture community of practice and shared certification coaching gave people across locations a reason to learn from each other rather than only through me. The strongest signal that a distributed team has become one team is when people go to each other first.",
      },
      { type: "h2", text: "Part 2: the concerns people raise about Agentic AI" },
      {
        type: "p",
        text: "When AI agents arrive, the concerns are reasonable and they are almost always the same four. I have learned to name them early rather than wait for them to surface as quiet resistance.",
      },
      {
        type: "table",
        caption: "The four concerns, and what actually addressed them",
        head: ["Concern", "What people are really asking", "What helped"],
        rows: [
          ["Jobs", "Is this about doing the same work with fewer of us?", "Start with work nobody wants: a surge, a backlog, repetitive triage. Let the agent take volume and keep people on judgement."],
          ["Trust", "What happens when it gets it wrong?", "Narrow scope, humans in the loop for anything that matters, and an audit trail for every decision the agent makes."],
          ["Risk and compliance", "Will this pass an audit?", "Bring Risk, Legal and Compliance in at the start, and make AI review part of the existing governance process rather than a separate gate."],
          ["Skills", "Will I fall behind?", "Hands-on time with the tools for everyone, in every location, and leaders who use them visibly themselves."],
        ],
      },
      { type: "h3", text: "Start with a bottleneck people already feel" },
      {
        type: "p",
        text: "The agent that won people over was not a showcase. It sat at the front of a queue that was overwhelming a service team during a merger surge, triaging and prioritising cases and resolving the simple ones. Because the team had been drowning, they saw the agent as relief, not threat. The same team absorbed the surge within SLA. That story did more for adoption than any presentation.",
      },
      { type: "h3", text: "Make 'safe' visible" },
      {
        type: "p",
        text: "People trust what they can inspect. Every action the agent took was logged, the scope was deliberately narrow, and a person stayed accountable for the outcome. When someone asked 'what if it's wrong?', the answer was not a promise. It was the audit trail.",
      },
      { type: "h3", text: "Let engineers feel the benefit first" },
      {
        type: "p",
        text: "For engineers, AI-assisted coding was the gentlest introduction. We rolled out GitHub Copilot in waves: the US first, then India, then the UK. Velocity rose roughly three to four times by a former colleague's count. It was not a formal study, but it changed the conversation from 'will this replace me?' to 'what else can it take off my plate?'",
      },
      {
        type: "p",
        text: "The question I heard most was simple: will I still have a job? I didn't answer it with reassurance. I answered it with what had actually happened: the same team had absorbed a surge with an agent beside them, and nobody's role had disappeared. The work that went away was the work nobody wanted.",
      },
      { type: "h3", text: "If you roll out in waves, say so" },
      {
        type: "p",
        text: "This is where the two halves meet. Our staggered rollout taught me something. When AI tools reach one office first, the others notice, and at exactly the moment people feel most uncertain it can look like a two-tier team. Sometimes waves are unavoidable, because of licences, security reviews or pilots. If so, tell every location the order, the reason and their date up front, and share what the first wave learned with everyone.",
      },
      { type: "h2", text: "What I'd tell another leader" },
      {
        type: "list",
        items: [
          "Treat a distributed team as one team with one bar. Teams own outcomes, not tickets.",
          "Protect a daily overlap window for decisions, and meet in person when you can.",
          "Write decisions down. It is the cheapest way to include people who were asleep when you made them.",
          "Name the AI concerns early: jobs, trust, risk and skills. Answer each with evidence, not reassurance.",
          "Start agents on a bottleneck people already feel, and keep humans accountable for what matters.",
          "If AI tools must roll out in waves, tell every location the order, the reason and their date up front.",
        ],
      },
      {
        type: "quote",
        text: "People don't resist AI. They resist being surprised by it. Bring them in early, show them the audit trail, and let them feel the benefit first.",
      },
    ],
  },
  {
    slug: "who-owns-what-in-a-shared-data-platform",
    title: "Who owns what? Running a shared data platform for consumer applications",
    dek: "A follow-up to my article on shared platforms: the architecture, using an insurer's customer data, and the split of responsibilities between the platform team, data producers, data governance and executive leadership.",
    date: "2026-10-08",
    status: "published",
    tags: ["Data platforms", "Data governance", "Architecture", "Operating model"],
    blocks: [
      {
        type: "p",
        text: "After I published my article on winning consumers for a shared platform, a product owner I've worked with called me. They'd read it and had sharp questions. Where does the platform team's job end and mine begin? If my marketing data is wrong, who fixes it? Who decides whose request goes first? And who do I call at 2 a.m.?",
      },
      {
        type: "p",
        text: "They're the right questions. A shared data platform rarely fails because of its technology. It fails when nobody is clear who owns what, so every problem lands in a queue between teams. This article is my answer, using an insurer's customer data as the example: the architecture first, then who is in charge of each part.",
      },
      { type: "h2", text: "The architecture: customer data at an insurer" },
      {
        type: "p",
        text: "Picture a consumer insurer selling car and home cover. Policyholders buy and renew through a self-service portal, adding drivers, vehicles and addresses. The motor and home policy systems hold the cover itself. The marketing team runs promotions and records who responded and through which channel. Third-party providers enrich the picture: Dun & Bradstreet with company data for business and fleet customers, and LexisNexis Risk Solutions with identity, claims and no-claims history. Each of these is a data producer.",
      },
      {
        type: "p",
        text: "The shared data platform (SDP) sits in the middle. Producers publish into it through agreed data contracts. The platform matches records into one trusted customer and household view, validates the data and serves it to quote, policy, claims and service applications in real time. It also feeds Snowflake, the analytical warehouse, for pricing analysis, reporting and machine learning.",
      },
      {
        type: "diagram",
        name: "shared-data-platform",
        caption: "Logical architecture: producers send data by API calls, events and ETL; contracts check it at the door; the platform serves applications through API calls and loads Snowflake through ELT.",
      },
      {
        type: "p",
        text: "Here is what each layer holds.",
      },
      {
        type: "roles",
        caption: "A shared data platform for an insurer's customer data: producers publish through contracts; the platform serves operational apps and feeds Snowflake.",
        tiers: [
          {
            tier: "Data producers",
            purpose: "Create the data and own its accuracy at source.",
            roles: [
              { name: "Self-service portal", does: "Policyholder details, drivers, vehicles, consents and preferences." },
              { name: "Policy systems", does: "Motor and home policies, renewals, cover changes and payments." },
              { name: "Marketing team", does: "Promotions, campaign responses and channel preferences." },
              { name: "Third-party providers", does: "Dun & Bradstreet company data; LexisNexis identity, claims and no-claims history." },
            ],
          },
          {
            tier: "Ingestion through contracts",
            purpose: "How data enters: on the contract's terms, never around it.",
            roles: [
              { name: "Data contracts", does: "Schema, meaning, quality rules, owner and freshness, versioned." },
              { name: "Pipelines", does: "Batch ETL, streaming events and APIs, built by producers to the contract." },
              { name: "Validation at the door", does: "Records that break the contract are quarantined, not loaded." },
            ],
          },
          {
            tier: "Shared data platform",
            purpose: "Built once, run well, owned by the platform team.",
            roles: [
              { name: "Customer and household view", does: "Matching and master data: one trusted policyholder, linked to their household." },
              { name: "Quality and lineage", does: "Checks, metadata and a trail from source to use." },
              { name: "Access and privacy", does: "Role-based access, consent and masking of personal data." },
              { name: "Serving layer", does: "APIs and events for applications, with published SLOs." },
            ],
          },
          {
            tier: "Consumers",
            purpose: "Use the data to serve customers and decide better.",
            roles: [
              { name: "Customer applications", does: "Quote, buy, renew, claims and service, reading through APIs and events." },
              { name: "Snowflake (OLAP)", does: "Pricing analysis, reporting and machine learning on full history." },
              { name: "Analysts and data scientists", does: "Self-service queries on governed, documented data." },
            ],
          },
        ],
      },
      {
        type: "p",
        text: "The split between operational and analytical use matters. A quote or a claim needs current, accurate data in milliseconds; Snowflake needs complete history, shaped for questions. The platform serves the first through API calls and events, and feeds the second through ELT and change data capture (CDC), which copies only what changed, as it changes, rather than reloading whole tables overnight. Both come from the same governed model, so the number on the dashboard matches what the customer sees.",
      },
      { type: "h2", text: "Customer data in a domain-driven world" },
      {
        type: "p",
        text: "In a domain-driven organisation, each domain owns its own data. Motor owns motor policies, claims owns claims, marketing owns campaigns. That's healthy: the people closest to the data own it. But every one of those domains also holds a copy of the customer, and they rarely agree. The motor system knows Jane Smith at one address; the home system knows J. Smith at another; marketing knows an email address that matches neither.",
      },
      {
        type: "p",
        text: "So the customer becomes a domain of its own. It owns identity, contact details, consent and the household: who lives with whom, and who is insured for what. Other domains keep the data they need for their own work, but they refer to the customer through one shared identifier and take changes from the customer domain rather than editing their own copy.",
      },
      {
        type: "list",
        items: [
          "Domains own their facts: a policy belongs to the policy domain, a claim to claims, a campaign response to marketing.",
          "The customer domain owns who the customer is: identity, contact details, consent and household links.",
          "The platform publishes the trusted customer as a data product, with a contract, so every domain uses the same identity.",
          "Third-party data enriches the customer record; it doesn't overwrite what the customer told you without a rule that says so.",
        ],
      },
      { type: "h2", text: "What the platform team is in charge of" },
      {
        type: "p",
        text: "The platform team owns the platform as a product. It's led by a shared platform lead, who owns the roadmap and is the single point of accountability when something needs escalating. That remit is narrower than many people assume, and the narrowness is what makes it work.",
      },
      {
        type: "list",
        items: [
          "Data modelling: the canonical model, and how it changes. Producers and consumers propose; the platform team decides, so the model stays coherent.",
          "Data contracts: the template, the tooling and the checks. Every contract names an owner, a schema, quality rules and freshness, and every change is versioned and backward compatible.",
          "Prioritisation: one public backlog for every producer and consumer request, ranked against agreed criteria, not by who shouts loudest.",
          "SLAs and SLOs: published targets for availability, latency and data freshness, on dashboards everyone can see.",
          "Support: a single front door, with clear routes for incidents, requests and questions, and an on-call rota for the platform itself.",
          "Security and privacy controls: access, consent, masking and audit trails, built into the platform rather than bolted on by each consumer.",
        ],
      },
      {
        type: "quote",
        text: "The platform team owns the road, the rules of the road and the signage. It doesn't drive everyone's car.",
      },
      { type: "h2", text: "What the producers are in charge of" },
      {
        type: "p",
        text: "This is where my friend's first question lands. The producer owns the data, so the producer owns its accuracy. The platform can catch bad data at the door, but it can't know that a campaign code is wrong or that a supplier changed a field's meaning overnight.",
      },
      {
        type: "list",
        items: [
          "Ingestion: building and running their pipelines (ETL, events or APIs) to the contract.",
          "Quality at source: fixing data where it's created, not patching it downstream.",
          "Meaning: keeping definitions accurate and telling the platform before anything changes.",
          "Their own incidents: when their feed breaks or their data is wrong, they're first on the call.",
          "Third parties: a producer team owns each external provider's feed and holds the provider to its contract.",
        ],
      },
      { type: "h2", text: "Who's in charge of what, at a glance" },
      {
        type: "table",
        caption: "Responsibilities in a shared data platform. A = accountable (one owner); C = consulted; I = informed.",
        head: ["Area", "Platform team", "Producers", "Data governance", "Executive leadership"],
        rows: [
          ["Canonical data model", "A", "C", "C", "I"],
          ["Data contracts", "A (standard and checks)", "A (their contracts)", "C", "I"],
          ["Ingestion pipelines (ETL, events, APIs)", "C", "A", "I", "I"],
          ["Data quality at source", "C", "A", "C", "I"],
          ["Definitions and data ownership", "C", "C", "A", "I"],
          ["Prioritisation of the backlog", "A", "C", "C", "C"],
          ["SLAs and SLOs", "A", "C", "I", "I"],
          ["Support and incidents (platform)", "A", "C", "I", "I"],
          ["Access, privacy and retention policy", "C", "C", "A", "I"],
          ["Funding, mandate and conflicts", "C", "C", "C", "A"],
        ],
      },
      { type: "h2", text: "The role of data governance" },
      {
        type: "p",
        text: "Data governance sets the rules the platform enforces. It decides who owns each data domain, agrees business definitions, and sets policy on privacy, retention and access. It also resolves disputes about meaning: when marketing and finance define \"active customer\" differently, governance decides, and the contract records the answer.",
      },
      {
        type: "p",
        text: "Good governance is light and fast. It names owners and makes decisions; it doesn't become a committee every change must queue for. The platform team turns its policies into automated checks, so most governance happens in the pipeline, not in a meeting.",
      },
      { type: "h2", text: "The role of executive leadership" },
      {
        type: "p",
        text: "Executives don't need to understand the data model. They need to do three things that nobody else can.",
      },
      {
        type: "list",
        items: [
          "Fund the platform as a product, with a long-lived team, not as a project that ends at go-live.",
          "Give it a mandate: the platform is the agreed route for shared data, and new duplicates need a reason.",
          "Break ties: when two senior stakeholders both say their request comes first, the decision goes up, not round in circles.",
        ],
      },
      {
        type: "p",
        text: "As I wrote last time, a mandate is a backstop, not a strategy. But a shared data platform without visible executive backing becomes optional, and optional platforms get worked around.",
      },
      { type: "h2", text: "Back to the product owner's questions" },
      {
        type: "table",
        caption: "The questions I was asked, and the short answers.",
        head: ["Question", "Answer"],
        rows: [
          ["Where does the platform's job end and mine begin?", "The platform owns the model, contracts, controls and service levels. You own your product's use of the data and the requests you raise."],
          ["If my marketing data is wrong, who fixes it?", "The producer, at source. The platform should have caught it at the door if it broke the contract, and will help find the cause."],
          ["Who decides whose request goes first?", "The platform team, in one public backlog, against agreed criteria. Ties go to executive leadership."],
          ["Who do I call at 2 a.m.?", "The platform's single front door. It routes to the platform on-call, or to the producer whose feed broke."],
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "list",
        items: [
          "Producers own their data and its quality; they publish through contracts.",
          "The platform team owns the model, contracts, controls, priorities, SLOs and support.",
          "Data governance owns definitions, ownership and policy, enforced in the pipeline.",
          "Executive leadership funds the platform as a product, mandates it and breaks ties.",
          "Serve applications and the warehouse from one governed model, so everyone sees the same number.",
        ],
      },
      {
        type: "quote",
        text: "Clear ownership is the cheapest performance improvement a data platform will ever get.",
      },
    ],
  },
  {
    slug: "knowledge-graph-graphrag-mcp",
    title: "Who's who? Entity resolution, a knowledge graph and GraphRAG — measured",
    dek: "Messy research records resolved into people, loaded into Neo4j, questioned by Claude through GraphRAG and exposed to AI assistants over MCP. What worked, what failed first, and what the evaluation caught.",
    date: "2026-10-07",
    status: "published",
    tags: ["Knowledge graphs", "GraphRAG", "MCP", "Entity resolution", "Applied AI"],
    blocks: [
      {
        type: "p",
        text: "Most questions worth asking about data are questions about relationships. Who leads a field? Which organisations work together? How is this supplier connected to that customer? Before any of them can be answered, you have to know who's who — and real data rarely tells you.",
      },
      {
        type: "p",
        text: "So I built a lab around that problem, on a fictional dataset of research on AI in payments and fraud detection: 77 papers and 221 author mentions, with the same 24 researchers written 85 different ways. You can try it in your browser — move the matching sliders, explore the graph and see the AI's answers.",
      },
      { type: "h2", text: "Step one: who's who" },
      {
        type: "p",
        text: "Entity resolution decides which mentions are the same person. Each pair of similar names is scored on four signals — the name itself, the institution, shared co-authors and the topic — and an ORCID on both sides settles it either way. Institutions get the same treatment: exact names, a small reference-data table for acronyms like \"NBU\", then word similarity.",
      },
      {
        type: "p",
        text: "At the default settings it finds exactly the 24 real people: 100% precision and 100% recall against the hidden ground truth. The interesting part is what happens when you change the settings. Lower the match threshold and two different J. Chens, at different institutions, become one person. Remove the institution signal and the same mistake happens. Tighten it too far and real people split into duplicates. Every graph question downstream inherits whichever mistake you make here.",
      },
      {
        type: "quote",
        text: "A knowledge graph is only as trustworthy as its entity resolution. Get who's who wrong, and every answer built on it is confidently wrong.",
      },
      { type: "h2", text: "Step two: the graph" },
      {
        type: "p",
        text: "Resolved people become nodes in Neo4j alongside papers, institutions and topics, connected by authorship, citations, affiliation and co-authorship: 117 nodes and 582 relationships. The website runs the same rules in TypeScript, and a test checks that both implementations find identical people — the same discipline as the MDM engine I built in two languages.",
      },
      { type: "h2", text: "Step three: GraphRAG" },
      {
        type: "p",
        text: "GraphRAG lets people ask in plain English. Claude on Amazon Bedrock turns the question into one read-only Cypher query, a guard checks it, Neo4j runs it in a read-only transaction, and Claude answers only from the rows that come back. Out-of-scope questions are refused before they reach the database.",
      },
      {
        type: "table",
        caption: "GraphRAG evaluation, 7 October 2026 — Claude Haiku 4.5 on Amazon Bedrock, Neo4j AuraDB, temperature 0",
        head: ["Measure", "Result"],
        rows: [
          ["Answer contains the expected facts", "15/15"],
          ["Cypher ran without error (one self-correction allowed)", "15/15"],
          ["Out-of-scope or write requests refused", "3/3"],
        ],
        sources: [{ label: "Code, questions and the full run on GitHub", href: "https://github.com/ramblewithsrini/research-graph" }],
      },
      { type: "h2", text: "What failed first — and what the evaluation caught" },
      {
        type: "list",
        items: [
          "Text-to-Cypher needs examples. The first attempt searched for an author literally named \"Chen\" and misused an aggregate. Three worked examples, a note on how names are stored, and one retry that shows the model the database's own error fixed it.",
          "Guardrails can be too strict. My first guard blocked any query without a LIMIT, and rejected five correct counting queries. Changing it to add a limit rather than block took the score from 10/15 to 15/15. Evaluation catches over-blocking as well as under-blocking.",
          "Agree the definition before trusting the number. Asked who is most cited, the model counted distinct citing papers (11); the lab counts total citations (14). Both are reasonable; only one is what the business means.",
          "Don't let safety depend on the model. Writes are blocked by the guard and by read-only transactions, and tested without any model in the loop.",
        ],
      },
      { type: "h2", text: "Step four: an MCP server" },
      {
        type: "p",
        text: "Finally, the graph is exposed over the Model Context Protocol, so any MCP-capable assistant — Claude Desktop, Claude Code and others — can explore it as a set of tools: describe the schema, find an author, rank researchers on a topic, trace a connection, or run a bounded read-only query. Ask it to delete the papers and it refuses: the server is read-only by design. This is what \"agent-ready data\" means in practice: clear contracts, described meaning and safe access, not just an API.",
      },
      { type: "h2", text: "Why it matters beyond research" },
      {
        type: "list",
        items: [
          "Customer and counterparty data: the same company under ten spellings, before KYC or risk can trust it.",
          "Patents and IP: one owner across many names and offices.",
          "Payments and fraud: rings of accounts, devices and merchants that only show up as a graph.",
          "Enterprise architecture: which systems break if this one is retired.",
        ],
      },
      {
        type: "quote",
        text: "Resolve who's who first, connect it second, and only then let AI answer — with a guard, an evaluation set and the evidence on show.",
      },
    ],
  },
  {
    slug: "ted-lasso-leadership-lessons",
    title: "Eight Ted Lasso leadership lessons I actually use",
    dek: "Ted Lasso is fiction. The way he leads isn't. Eight lessons from the show, and the real situations where I've seen them work.",
    date: "2026-10-07",
    status: "published",
    tags: ["Leadership", "Culture", "Teams"],
    blocks: [
      {
        type: "p",
        text: "I recently watched a short video breaking down the leadership lessons in Ted Lasso, the TV series about an American football coach who ends up managing an English football club. He knows almost nothing about the game, yet he turns a struggling team around. Watching it, I kept thinking: I've done that, and I've seen that work.",
      },
      {
        type: "p",
        text: "Ted is played for laughs, but the habits behind his leadership are serious ones. Here are the eight lessons from the video, and where each has mattered in my own career leading architecture and engineering teams.",
      },
      { type: "h2", text: "1. Make everyone feel like they matter" },
      {
        type: "p",
        text: "Ted learns the kit man's name on day one and treats him like part of the team. The point isn't politeness. People who feel they matter care about the result.",
      },
      {
        type: "p",
        text: "I once led teams that were stretched and stressed by a heavy delivery agenda. They worked hard, but the effort behind the results often went unnoticed. So I made a point of recognising the hard work behind every result, visibly and specifically: not \"great job, team\", but who did what, and why it mattered. It cost nothing, and it changed how people showed up.",
      },
      { type: "h2", text: "2. Align your goals" },
      {
        type: "p",
        text: "Ted doesn't just tell players to win. He gives them a shared purpose that's bigger than any individual's stats.",
      },
      {
        type: "p",
        text: "When I took on a newly formed domain, the first thing I did was set a North Star: what we were consolidating, what we would modernise, and why. Later, when I needed other projects to build on a shared platform, I didn't start with my goals. I ran workshops to show each project what was in it for them. Six of them chose to join.",
      },
      { type: "h2", text: "3. Create lieutenants" },
      {
        type: "p",
        text: "Ted relies on Coach Beard, and he gives real responsibility to people others had overlooked. A leader can't be everywhere; good lieutenants multiply what a team can do.",
      },
      {
        type: "p",
        text: "I lead through people. Whether the team is ten or a hundred, the approach is the same: hire well, give leaders real authority to make decisions, and hold them accountable for outcomes, rather than making every call myself. My job is to grow the next layer of leaders, not to be the bottleneck.",
      },
      { type: "h2", text: "4. Actively ask for feedback, and act on it" },
      {
        type: "p",
        text: "Ted has a suggestion box, and when he finally reads the notes, he acts on them. Asking for feedback only builds trust if something visibly changes.",
      },
      {
        type: "p",
        text: "I once inherited a team that the business blamed for every missed delivery. I started by listening to both sides, and treated every concern from the business as real. I set up a regular meeting with their VP and shared a weekly action log, so they could see their feedback turning into action. Within six months, both sides trusted us.",
      },
      { type: "h2", text: "5. Have empathy for the people you lead" },
      {
        type: "p",
        text: "Ted notices when someone is struggling, and he understands why before deciding what to do about it.",
      },
      {
        type: "p",
        text: "That team was working against technical debt they hadn't created, and nobody was listening to them either. So I worked alongside them, helped them prioritise, and took on the job of delivering bad or difficult news to the business myself, so they didn't have to. A colleague later described it better than I could:",
      },
      {
        type: "quote",
        text: "\"High-demand work tends to route through a manager first, and instead of passing that pressure down, he absorbed it himself.\"",
      },
      { type: "h2", text: "6. Celebrate other people's wins" },
      {
        type: "p",
        text: "Ted makes sure the credit goes to his players, never to himself.",
      },
      {
        type: "p",
        text: "When I put someone in my team forward for promotion, a senior leader pushed back: they hadn't seen enough of the work, because the best of it happened far from the rooms where decisions were made. Rather than argue harder, I gathered feedback from the people who worked with them and invited them to present their own initiative to its steering committee. Senior leaders saw their thinking first-hand, and the promotion followed. I now see it as my job to give my team a platform to be seen.",
      },
      { type: "h2", text: "7. Create belief in a motivating vision" },
      {
        type: "p",
        text: "Ted's one-word sign says it all: believe. Belief isn't optimism for its own sake; it's people seeing a future worth working towards, and trusting that they can reach it.",
      },
      {
        type: "p",
        text: "I've led the vision for a single, consolidated customer portal that unified the customer experience, and seen a team that had been blamed for every delay start believing in itself again. In my first year, that team delivered more than in the previous two years combined. Nobody left or asked to move: everyone chose to stay.",
      },
      { type: "h2", text: "8. Don't deny reality" },
      {
        type: "p",
        text: "Ted's positivity never means ignoring problems. When something is wrong, he faces it, including in himself.",
      },
      {
        type: "p",
        text: "A platform move I inherited was 120 days from going ahead, with no requirements documents behind it. My team reverse-engineered the application and found more than 15 functional gaps and a compliance risk. It took several presentations, and asking for the opposite of the saving everyone expected, but we stopped the move.",
      },
      {
        type: "p",
        text: "Facing reality applies to my own decisions too. Years ago I argued for not bidding on $3.5M of a $10M contract because we lacked the skills. We won the rest, but I later saw that we could have partnered for that capability and grown it ourselves. I said so plainly. Now, before I say no, I ask how we could say yes differently.",
      },
      { type: "h2", text: "The eight lessons at a glance" },
      {
        type: "table",
        caption: "Ted's habits, and what they look like at work.",
        head: ["Lesson", "What I do"],
        rows: [
          ["Make everyone feel they matter", "Recognise the effort behind results, visibly and specifically."],
          ["Align your goals", "Set a North Star, and show each team what's in it for them."],
          ["Create lieutenants", "Lead through managers with real authority and accountability."],
          ["Ask for feedback and act on it", "Listen to both sides; make the response visible."],
          ["Have empathy", "Absorb pressure from above; take the hard conversations myself."],
          ["Celebrate others' wins", "Give my team a platform to be seen, and give them the credit."],
          ["Create belief in a vision", "Paint a future worth working towards, then prove it's reachable."],
          ["Don't deny reality", "Stop what isn't ready; own my own mistakes."],
        ],
        sources: [
          { label: "Video: Ted Lasso Leadership Lessons That Work (Charisma on Command)", href: "https://www.youtube.com/watch?v=i429ScYzwdI" },
        ],
      },
      { type: "h2", text: "Where kindness meets results" },
      {
        type: "p",
        text: "The easy criticism of Ted is that kindness doesn't win matches. In my experience, it's the other way round. A team that isn't busy defending itself has the energy to deliver. Trust came first, and the results followed.",
      },
      {
        type: "quote",
        text: "Kindness and high standards aren't opposites. In my experience, the first is how you get the second.",
      },
      {
        type: "p",
        text: "Ted Lasso is an Apple TV+ series; the lessons above are drawn from the Charisma on Command video linked in the table. The stories are my own.",
      },
    ],
  },
  {
    slug: "building-and-evaluating-a-rag-assistant",
    title: "Building a RAG assistant on Amazon Bedrock — and measuring whether it works",
    dek: "A finance-policy assistant that cites its sources, refuses rather than guesses, and is scored against a fixed test set before anyone trusts it.",
    date: "2026-10-07",
    status: "published",
    tags: ["Applied AI", "RAG", "Amazon Bedrock", "Evaluation"],
    blocks: [
      {
        type: "p",
        text: "Everyone can demo a chatbot. The harder question, and the one a CFO or a risk team will ask, is: how do you know it gives the right answer, and what does it do when it doesn't know? So I built a small retrieval-augmented generation (RAG) assistant to answer exactly that, and measured it.",
      },
      {
        type: "p",
        text: "It answers questions about a fictional company's finance policies: approval limits, expenses, travel, supplier payments, month-end close. Every policy and person in it is made up. The code and results are public on GitHub.",
      },
      { type: "h2", text: "How it works" },
      {
        type: "list",
        items: [
          "Chunk: twelve policies are split by section, so every answer can point to the exact clause.",
          "Embed and retrieve: each section becomes a vector with Amazon Titan Text Embeddings V2; a question finds the three closest sections by meaning.",
          "Decide: if even the best match is weak, the assistant refuses with \"I can't find that in our finance policies\" instead of guessing.",
          "Generate: Claude on Amazon Bedrock answers only from those sections, citing each one, at temperature 0.",
          "Guard: questions about named people's personal data, or predictions such as share prices, are declined before they reach the model.",
        ],
      },
      { type: "h2", text: "Measure before you trust it" },
      {
        type: "p",
        text: "I wrote a fixed test set first: 20 questions with a known source and a known fact in the answer, and 3 that should be refused. The same set runs in a no-cost practice mode (word matching, no AI model) and on Bedrock, so every change to prompts, models or chunking is judged on evidence, not impressions.",
      },
      {
        type: "table",
        caption: "Results, 7 October 2026 (Bedrock: Titan Text Embeddings V2 and Claude Haiku 4.5, eu-west-1)",
        head: ["Measure", "Practice mode", "Amazon Bedrock"],
        rows: [
          ["Right policy section retrieved", "20/20", "20/20"],
          ["Answer contains the expected fact", "18/20", "19/20"],
          ["Out-of-scope questions refused", "3/3", "3/3"],
        ],
        sources: [{ label: "Code, test set and full run output on GitHub", href: "https://github.com/ramblewithsrini/cfo-assistant" }],
      },
      { type: "h2", text: "What the misses taught me" },
      {
        type: "p",
        text: "Practice mode missed two questions that need reasoning, not word matching: it couldn't work out that £12,000 is over a £10,000 limit, or that a taxi is an expense. Claude answered both correctly. That is precisely the value an LLM adds on top of retrieval.",
      },
      {
        type: "p",
        text: "Bedrock's one miss wasn't a wrong answer. Asked whether an order can be split to avoid CFO approval, Claude said \"No, you cannot split an order\" and explained the 30-day rule correctly. But my test looked for the policy's exact words, \"must not be split\". Exact-phrase checks are cheap and strict, and they undercount good answers. The next step is a meaning-based check, an LLM as judge, with a person reviewing a sample of its verdicts.",
      },
      { type: "h2", text: "What I'd tell a team starting out" },
      {
        type: "list",
        items: [
          "Write the test set before the prompt. Otherwise you tune until the demo looks good.",
          "Make refusing a feature. A confident wrong answer about an approval limit is worse than no answer.",
          "Cite everything, so the finance team can check the answer against the policy in seconds.",
          "Start cheap. An in-memory index and a small model cost pennies; scale the infrastructure once the numbers justify it.",
          "Plan for the boring parts: a new AWS account's request quotas throttled my first run, so the code now retries with back-off and paces itself.",
        ],
      },
      {
        type: "quote",
        text: "The question isn't whether the AI can answer. It's whether you can show when it's right, and what it does when it doesn't know.",
      },
    ],
  },
  {
    slug: "winning-consumers-for-a-shared-platform",
    title: "Adoption is earned, not mandated: winning consumers for a shared platform",
    dek: "What a shared platform really is, why the teams it serves hesitate, and seven ways to earn their choice — from my experience of delivering them.",
    date: "2026-10-07",
    status: "published",
    tags: ["Platform engineering", "Leadership", "Architecture", "Adoption"],
    blocks: [
      {
        type: "p",
        text: "Most shared platforms don't fail on technology. They fail because nobody chooses to use them.",
      },
      {
        type: "p",
        text: "I've delivered shared platforms in insurance and in payments, and I've seen both outcomes: platforms that teams queued up to join, and platforms they quietly worked around. The difference was rarely the code. It was whether the people who were meant to use the platform believed it would make their lives easier.",
      },
      { type: "h2", text: "What is a shared platform?" },
      {
        type: "p",
        text: "In my view, a shared platform is the data, capabilities and services a consumer needs, but doesn't necessarily own. The consumer is the product or project team building something for customers. The platform gives them the pieces every team needs, built once and run well, so they can spend their time on what makes their own product different.",
      },
      {
        type: "list",
        items: [
          "Data: a trusted customer record, reference data and the definitions everyone agrees on.",
          "Capabilities: identity and single sign-on, partner onboarding, matching, payments validation.",
          "Services: APIs, observability, automated build and release, security controls.",
        ],
      },
      {
        type: "roles",
        caption: "A shared platform: consumers build on published contracts, not on each other's code.",
        tiers: [
          {
            tier: "Consumers",
            purpose: "Product and project teams that own the customer outcome.",
            roles: [
              { name: "Product team A", does: "Builds what makes its product different." },
              { name: "Product team B", does: "Reuses what's shared instead of rebuilding it." },
              { name: "Project team C", does: "Joins later through self-service, not a negotiation." },
            ],
          },
          {
            tier: "Contracts",
            purpose: "The promise between platform and consumer.",
            roles: [
              { name: "APIs", does: "Versioned and backward compatible." },
              { name: "Data contracts", does: "Agreed meaning, quality and ownership." },
              { name: "SLOs", does: "Availability and performance consumers can plan on." },
              { name: "Self-service", does: "Onboarding without raising a ticket." },
            ],
          },
          {
            tier: "Shared platform",
            purpose: "Built once, run well, owned by the platform team.",
            roles: [
              { name: "Data", does: "Trusted, governed, discoverable." },
              { name: "Capabilities", does: "Identity, onboarding, matching." },
              { name: "Services", does: "Integration, observability, release, security." },
            ],
          },
        ],
      },
      { type: "h2", text: "Why consumers hesitate" },
      {
        type: "p",
        text: "Resistance to a shared platform is usually rational. Before trying to win anyone over, it helps to see the platform from the consumer's side of the table.",
      },
      {
        type: "list",
        items: [
          "Timelines: \"My delivery date now depends on someone else's roadmap.\"",
          "Bottlenecks: \"Every change I need becomes a ticket in another team's queue.\"",
          "Losing authority: \"I'm accountable for the outcome, but I no longer control the parts.\"",
          "Fit: \"Will it really handle my edge cases, or will I end up building around it anyway?\"",
        ],
      },
      { type: "h2", text: "What a shared platform can really do for them" },
      {
        type: "p",
        text: "Each of those worries has an honest answer, and a good platform is designed around them. In my experience, the answers that persuade are concrete, not architectural.",
      },
      {
        type: "table",
        caption: "Each hesitation has an answer — and a lesson below that delivers it.",
        head: ["The consumer's worry", "What the platform gives them", "Lessons"],
        rows: [
          ["Timelines", "Faster delivery: they stop building what already exists. Onboarding fell from 73 days to 5–7 on one platform I led.", "1, 3"],
          ["Bottlenecks", "Self-service and published contracts, so they build without asking permission.", "3, 4"],
          ["Losing authority", "A say in the roadmap, open measures and an SLO they can hold the platform to.", "1, 5"],
          ["Fit", "Proof on their own use case first, an honest list of gaps, and no move until the platform is ready.", "2, 7"],
        ],
      },
      { type: "h2", text: "Seven ways to earn their choice" },
      { type: "h3", text: "1. Start with their problem, not your platform" },
      {
        type: "p",
        text: "Nobody wakes up wanting a shared platform. They want to ship their project on time, without rebuilding customer matching, authentication or onboarding for the third time. On one programme, I invited the consuming projects into architecture workshops before asking for any commitment. We shared our scope openly and worked through their roadmap with them: what they would no longer need to build, how much sooner they could deliver, and what risk they could hand to us. Six projects adopted the platform, and the steering committee named it one of the key reasons the programme succeeded.",
      },
      {
        type: "quote",
        text: "Ask every consumer: what would you stop building, and what would you ship sooner, if this worked for you?",
      },
      { type: "h3", text: "2. Win one team, then make them the hero" },
      {
        type: "p",
        text: "The first adopter carries all the risk, so treat them like a partner, not a customer. Give them your best people, fix their blockers first and celebrate their success loudly. A peer saying \"it saved us three months\" persuades more teams than any architecture deck, and it answers the fit question better than any promise.",
      },
      { type: "h3", text: "3. Make the easy path the right path" },
      {
        type: "p",
        text: "If using the platform is harder than building around it, teams will build around it. Self-service onboarding, clear documentation, templates and working examples matter as much as the core services. On a partner platform I led, onboarding took 73 days, with manual steps, including testing, along the way. Consolidating duplicated platforms with reusable APIs and workflow automation brought it down to 5–7 days and scaled capacity from 100 to 1,000 requests a day. Speed is the best sales pitch a platform has.",
      },
      { type: "h3", text: "4. Contracts, not tickets" },
      {
        type: "p",
        text: "A platform that makes every consumer raise a ticket and wait becomes the bottleneck it was meant to remove. Publish versioned APIs and data contracts, keep them backward compatible, and give notice before anything is retired. Consumers should be able to build on you without asking permission.",
      },
      { type: "h3", text: "5. Measure their outcomes, not your output" },
      {
        type: "p",
        text: "\"We shipped twelve features\" means nothing to a consumer. Track what matters to them: how long onboarding takes, how much they no longer build, the availability they can rely on. We made service health visible on SLO dashboards everyone could see. Open numbers give consumers back some of the authority they feel they've lost: they can hold the platform to account.",
      },
      { type: "h3", text: "6. Use mandates as a backstop, not a strategy" },
      {
        type: "p",
        text: "Mandates get compliance; a better path gets adoption. Programme mandates and a reuse roadmap did help me, but only to make commitments concrete once teams had already seen the value. A mandate without value creates teams that comply on paper and work around you in practice.",
      },
      { type: "h3", text: "7. Retire duplicates with evidence, not deadlines" },
      {
        type: "p",
        text: "Consolidation is where platforms win or lose their credibility. When I secured approval for a £40M convergence across 144 applications, the case rested on evidence about duplication, cost and risk.",
      },
      {
        type: "p",
        text: "The same discipline cuts the other way. One application was due to move to our in-house platform within 120 days, before its licence renewal. There were no requirements documents. My team reverse-engineered them and found more than 15 functional gaps and a compliance risk, so we stopped the move. Forcing a consumer onto a platform that can't serve them yet costs more trust than it saves money.",
      },
      {
        type: "stages",
        caption: "The adoption journey: earn the first consumer, then make joining easy enough that the rest follow.",
        items: [
          { name: "Listen", when: "Before any commitment", goal: "Understand each consumer's roadmap and worries.", outputs: ["Workshops", "What they'd stop building"] },
          { name: "First adopter", when: "Pilot", goal: "Prove it on one real use case.", outputs: ["Best people on it", "A success story"] },
          { name: "Paved road", when: "Make it easy", goal: "Joining is quicker than building around it.", outputs: ["Self-service", "Contracts and docs"] },
          { name: "Scale", when: "Grow", goal: "More teams join because peers did.", outputs: ["Open SLOs", "Adoption measures"] },
          { name: "Retire duplicates", when: "Consolidate", goal: "Move teams when the platform is ready for them.", outputs: ["Evidence-based case", "Gaps closed first"] },
        ],
      },
      { type: "h2", text: "The short version" },
      {
        type: "list",
        items: [
          "Define the platform by what consumers need, not by what you own.",
          "Take their worries seriously: timelines, bottlenecks, authority and fit.",
          "Sell their outcome, not your platform, and make the first adopter a hero.",
          "Make the right path the easy path, and publish contracts, not ticket queues.",
          "Measure adoption and their results in the open.",
          "Mandate last, and move teams only when the platform is ready for them.",
        ],
      },
      {
        type: "quote",
        text: "A shared platform is a product. Its customers are your colleagues, and like any customers, they choose. Earn the choice.",
      },
    ],
  },
  {
    slug: "absorbing-a-360-percent-surge",
    title: "Absorbing a 360% surge with the same team",
    dek: "What a post-merger volume spike taught me about putting Agentic AI to work — safely — in a regulated payments business.",
    date: "2026-10-03",
    status: "published",
    tags: ["Agentic AI", "Payments", "Leadership", "Mergers"],
    caseStudy: "discover",
    blocks: [
      {
        type: "p",
        text: "When Discover joined Capital One, the referrals flowing into our Referral Management Service went up by 360%. A referral is what a merchant raises when a particular transaction doesn't go through — and every one of them needs looking at. Not 36% more of them: four and a half times as many.",
      },
      {
        type: "p",
        text: "The obvious answer was to bring in a wave of temporary contractors. Instead, we put Agentic AI to work alongside the same customer service centre team — and kept the work within SLA.",
      },
      { type: "h2", text: "The problem behind the number" },
      {
        type: "p",
        text: "Mergers create work in waves. As the Capital One network transition progressed, referrals arrived far faster than any team could triage them. Hiring and training takes months, and a surge driven by a one-off integration doesn't justify a permanently larger team. We needed capacity that could flex — without lowering the bar in a regulated environment.",
      },
      { type: "h2", text: "Why Agentic AI — and why governed" },
      {
        type: "p",
        text: "We weren't starting from zero. We had already applied governed Agentic AI to vulnerability identification and audit monitoring, so the guardrails a regulated payments business needs — controls, auditability and clear accountability — were already in place. That's what made moving quickly possible.",
      },
      { type: "h2", text: "What we built" },
      {
        type: "p",
        text: "We built an AI agent that sits at the front of the Referral Management Service. It triages and classifies every incoming referral, prioritises it using an algorithm, and resolves the simple cases on its own.",
      },
      {
        type: "p",
        text: "Everything else reaches the team already classified and in priority order — so people spend their time on the referrals that genuinely need human judgement, starting with the most urgent. From decision to go-live took four months.",
      },
      { type: "h2", text: "The result" },
      {
        type: "list",
        items: [
          "The same customer service centre team absorbed a 360% increase in referrals.",
          "Work stayed within SLA through the surge.",
          "We needed fewer temporary contractors than the surge would otherwise have demanded.",
        ],
      },
      { type: "h2", text: "What I'd tell another technology leader" },
      {
        type: "list",
        items: [
          "Start with the bottleneck, not the technology. We knew exactly where the work was piling up before we chose the tool.",
          "Governance first makes speed possible. Because the guardrails already existed, we went from decision to live in four months — in a regulated payments business.",
          "Let AI take the volume; keep people on the judgement. The agent cleared the simple cases and ordered the rest, and the team stayed accountable for the outcome.",
        ],
      },
      {
        type: "quote",
        text: "The question in a surge isn't 'how many people do we need?' It's 'which work actually needs a person?'",
      },
    ],
  },
  {
    slug: "starting-data-governance",
    title: "Starting data governance: where to begin, who you need and how long it takes",
    dek: "A practical route from first conversation to governance that runs itself — the stages, the roles and an honest timeline. Plus what Gartner's 2026 Magic Quadrant does and doesn't tell you about tools.",
    date: "2026-10-04",
    status: "published",
    tags: ["Data governance", "Operating model", "Data strategy", "Tools"],
    caseStudy: "pitney-bowes",
    blocks: [
      {
        type: "p",
        text: "Most organisations start data governance in the wrong place: with a tool. A catalogue gets bought, a few hundred tables get scanned, and six months later nobody is using it — because nobody was ever made responsible for what the data means.",
      },
      {
        type: "p",
        text: "I've seen governance from three sides: running governance due-diligence workshops with financial services, professional services and retail clients as a pre-sales architect; building the data steward model behind a single customer view at Allianz UK; and leading metadata curation for payment platforms at Discover. The lesson is the same from every side: start with a business problem, not a platform.",
      },
      { type: "h2", text: "Where to start: one question" },
      {
        type: "p",
        text: "Ask: which decision, obligation or customer outcome is going wrong because of data? A regulator's report you can't trace. Customers counted twice. An AI use case blocked because nobody trusts the training data. That answer tells you your first data domain, your sponsor and your first measure of success.",
      },
      {
        type: "list",
        items: [
          "Regulatory pressure (GDPR, KYC, PCI DSS, BCBS 239) — start with the data the regulator asks about.",
          "Customer experience — start with customer data: duplicates, addresses, consent.",
          "AI readiness — start with the data your first AI use case depends on, and who may use it.",
        ],
      },
      { type: "h2", text: "The five stages" },
      {
        type: "p",
        text: "Governance isn't a project with an end date. But it does have stages, and each one has to earn the next.",
      },
      {
        type: "stages",
        caption: "From first conversation to governance that runs itself — typical timings for a mid-to-large organisation",
        items: [
          {
            name: "Discover",
            when: "Weeks 0–6",
            goal: "Find the business problem worth solving first.",
            outputs: ["Pain points and the data behind them", "A sponsor who owns the outcome", "Maturity baseline", "First domain chosen"],
          },
          {
            name: "Mobilise",
            when: "Months 1–3",
            goal: "Set up who decides what — before any tool.",
            outputs: ["Charter and principles", "Governance council", "Owners and stewards named", "Success measures agreed"],
          },
          {
            name: "Prove",
            when: "Months 3–9",
            goal: "Make one domain demonstrably better.",
            outputs: ["Critical data elements defined", "Business glossary", "Quality rules and a scorecard", "Issue and change process"],
          },
          {
            name: "Scale",
            when: "Months 9–18",
            goal: "Repeat the pattern; now bring in tooling.",
            outputs: ["More domains onboarded", "Catalogue and lineage", "Policies turned into controls", "Quality dashboards"],
          },
          {
            name: "Embed",
            when: "Year 2–3, then ongoing",
            goal: "Governance becomes how delivery works.",
            outputs: ["Governance by design in every project", "Automated controls", "AI and data product governance", "Federated ownership"],
          },
        ],
      },
      {
        type: "p",
        text: "Notice where the tool appears: stage four. By then you know your owners, your definitions and your rules — so the tool automates a working process instead of becoming a very expensive spreadsheet.",
      },
      {
        type: "p",
        text: "Discover showed me the order matters. My team settled the process and naming standards with the business first; the tooling — Hackolade for curation, Alation as the catalogue, AI to check models against production — came after. Because the rules already existed, the tools had something to enforce, and almost every data model came into line: 95% of more than 140.",
      },
      { type: "h2", text: "The roles you need" },
      {
        type: "p",
        text: "Governance is an operating model, not a team. Most of the people in it already have day jobs; governance makes part of that job explicit. Three tiers work for most organisations.",
      },
      {
        type: "roles",
        caption: "A three-tier governance operating model",
        tiers: [
          {
            tier: "Strategic",
            purpose: "Sets direction, funds it and settles disputes.",
            roles: [
              { name: "Executive sponsor", does: "Owns the business outcome and clears the way." },
              { name: "Governance council", does: "Senior data owners who approve policies and resolve conflicts." },
              { name: "CDO or head of data", does: "Leads the programme and reports progress to the board." },
            ],
          },
          {
            tier: "Tactical",
            purpose: "Turns direction into policies, standards and priorities.",
            roles: [
              { name: "Data owners", does: "Business leaders accountable for a domain — customer, product, finance." },
              { name: "Governance office", does: "A small team running the framework, metrics and communications." },
              { name: "Data architect", does: "Models, standards and lineage across systems." },
              { name: "Privacy, risk and security", does: "Make sure policies meet regulatory and security obligations." },
            ],
          },
          {
            tier: "Operational",
            purpose: "Does the daily work that keeps data trusted.",
            roles: [
              { name: "Business data stewards", does: "Define terms, set quality rules and work the review queue." },
              { name: "Technical stewards", does: "Implement controls, lineage and fixes in the platforms." },
              { name: "Data quality analysts", does: "Measure, investigate and report on quality." },
              { name: "AI governance lead", does: "Applies the same rules to models and agents: sources, thresholds, oversight." },
            ],
          },
        ],
      },
      {
        type: "p",
        text: "Two of these matter more than people expect. Data owners must sit in the business, not IT — if IT owns the data, the business will never own its quality. And stewards need time in their job description, not goodwill: at Allianz UK the stewards both worked the review queue and sampled what the system merged on its own, and that sampling is how we knew the rules still held.",
      },
      { type: "h2", text: "How long it takes" },
      {
        type: "list",
        items: [
          "First visible value: three to six months, in one domain, if you start from a real problem.",
          "A working foundation — operating model, glossary, quality scorecards across the priority domains: twelve to eighteen months.",
          "Governance that's embedded in how projects are delivered: two to three years.",
          "Done: never. Like security, it's a capability you run, not a project you finish.",
        ],
      },
      {
        type: "p",
        text: "The fastest programmes aren't the best funded. They're the ones that pick a narrow first domain, show a measurable improvement — fewer duplicates, a report that reconciles, a model that can be approved — and use that to earn the next domain.",
      },
      { type: "h2", text: "Tools: what Gartner's 2026 Magic Quadrant says" },
      {
        type: "p",
        text: "In January 2026, Gartner published its latest assessment of governance platforms, rating 15 vendors. As publicly reported, they were placed as follows.",
      },
      {
        type: "table",
        caption: "Gartner Magic Quadrant for Data and Analytics Governance Platforms, January 2026 — vendors by quadrant, alphabetical. Gartner does not endorse any vendor; its research reflects its analysts' opinions",
        head: ["Quadrant", "Vendors"],
        rows: [
          ["Leaders", "Alation, Atlan, Collibra, IBM, Informatica"],
          ["Challengers", "BigID, Microsoft"],
          ["Visionaries", "ServiceNow"],
          ["Niche Players", "Ab Initio, Alex Solutions, Ataccama, DataGalaxy, OvalEdge, Precisely, Solidatus"],
        ],
        sources: [
          { label: "AI, Data & Analytics Network: Gartner rates 15 platforms", href: "https://www.aidataanalytics.network/data-governance/news-trends/gartner-rates-15-data-analytics-governance-platforms-in-new-magic-quadrant" },
          { label: "Informatica: complimentary copy of the report", href: "https://www.informatica.com/data-governance-magic-quadrant.html" },
        ],
      },
      {
        type: "p",
        text: "Gartner's commentary points the same way as this article: away from static catalogues towards automated, AI-ready governance across structured and unstructured data. It expects that by 2027, 60% of governance teams will prioritise unstructured data to deliver generative AI use cases.",
      },
      {
        type: "p",
        text: "A quadrant measures vendors, not fit. How I'd use it:",
      },
      {
        type: "list",
        items: [
          "Start from your estate. If you're largely on Microsoft, its own governance tooling may be enough for stages two and three. If you run IT on ServiceNow, its new governance offering deserves a look.",
          "Start from your first problem. If it's finding and protecting sensitive data for privacy, that's a different shortlist from building an enterprise catalogue.",
          "Treat Niche Players seriously for specific jobs. Several are strong in data quality, lineage or regulatory reporting — I delivered GDPR and KYC solutions on Pitney Bowes Spectrum, now part of Precisely.",
          "Run a proof of concept on your own data, with your own stewards, before you sign. The demo is never the hard part.",
        ],
      },
      { type: "h2", text: "Five mistakes to avoid" },
      {
        type: "list",
        items: [
          "Buying the tool first. Tools automate a process; they don't create one.",
          "Boiling the ocean. Governing every domain at once guarantees governing none of them well.",
          "Letting IT own it. Technology supports governance; the business owns the data.",
          "Policies without stewards. A policy nobody operates is a document, not a control.",
          "No measures. If you can't show quality improving, the funding stops — and it should.",
        ],
      },
      {
        type: "quote",
        text: "Start with the decision that's going wrong, not the platform you'd like to buy.",
      },
    ],
  },
  {
    slug: "first-90-days-director-of-engineering",
    title: "My first 90 days as a Director of Engineering: listen first, shape together, then go",
    dek: "Why I don't change anything in my first month — and the questions about people, systems and process I ask instead.",
    date: "2026-10-04",
    status: "published",
    tags: ["Engineering leadership", "First 90 days", "Leadership"],
    caseStudy: "discover",
    blocks: [
      {
        type: "p",
        text: "A new engineering leader is under pressure to make a mark quickly. But the fastest way I know to lose a team is to change things before understanding them. So my first 90 days follow one rule: listen first, shape together, then go.",
      },
      {
        type: "stages",
        caption: "The first 90 days at a glance",
        items: [
          {
            name: "Listen & learn",
            when: "Days 1–30",
            goal: "Understand the people, the systems and how work flows — before changing anything.",
            outputs: ["People: who we are, and what we've been promised", "Systems: what we run, and how well", "Process: how work gets from idea to production"],
          },
          {
            name: "Immerse & shape",
            when: "Days 31–60",
            goal: "Get hands-on, find the gaps and build a vision with the team.",
            outputs: ["Hands-on in the current state", "Gaps identified, with peers", "Ideas socialised and tested", "A vision the team recognises"],
          },
          {
            name: "Get set, go",
            when: "Day 61 on",
            goal: "On a mission: deliver the vision together.",
            outputs: ["Clear priorities everyone can explain", "Measures we hold ourselves to", "Early wins that build trust"],
          },
        ],
      },
      { type: "h2", text: "Days 1–30: listen and learn" },
      {
        type: "p",
        text: "The first month is about three questions. I write down what I learn, but I don't act on it yet — the first answer is rarely the whole answer.",
      },
      { type: "h3", text: "People — who are we, and what have we been promised?" },
      {
        type: "list",
        items: [
          "One-to-ones with every member of the team, to understand them, not to assess them.",
          "A regular cadence with my direct reports, so we build a rhythm from week one.",
          "Skip-level meetings, so I hear what's really getting in the way — unfiltered.",
          "The promises already made to people: a role change, a training plan, a pay review. Inheriting a team means inheriting its promises, and breaking one by accident costs more trust than any quick win earns.",
          "Who is in line for promotion — and whether the people deciding can see their work.",
          "Our vendors, and the role each one plays.",
        ],
      },
      { type: "h3", text: "Systems — what do we run, and how well?" },
      {
        type: "list",
        items: [
          "Every application in my remit, and its purpose.",
          "The subject-matter expert for each one.",
          "What each system integrates with, and why.",
          "Its SLAs and SLOs — and how we're actually doing against them.",
          "Current challenges and backlogs.",
          "Risk and controls: open audit and regulatory findings, and the change-control rules we work within. In a regulated business, these shape every plan that follows.",
        ],
      },
      { type: "h3", text: "Process — how does work get from idea to production?" },
      {
        type: "list",
        items: [
          "How work comes in: the intake process.",
          "How we deploy to production.",
          "How prioritisation works, and who is involved.",
          "How much of it is automated — and what still depends on people and goodwill.",
        ],
      },
      {
        type: "p",
        text: "By day 30, I want to know the people, the estate and how work flows — and I want the team to know me.",
      },
      { type: "h2", text: "Days 31–60: immerse and shape" },
      {
        type: "list",
        items: [
          "Get my hands dirty in the current state — the real work, not the slides about it.",
          "Collaborate with peers across the business and technology, because most engineering problems start or end outside engineering.",
          "Identify the gaps, as I see them.",
          "Start socialising my ideas, and test them with the people who'll live with the consequences.",
          "Build the vision with the team, not for it.",
        ],
      },
      {
        type: "p",
        text: "By day 60, I want a clear view of the gaps, and a vision the team recognises as theirs. If they can't explain it without me in the room, it isn't ready.",
      },
      { type: "h2", text: "Day 61 on: get set, go" },
      {
        type: "p",
        text: "Now we're on a mission: clear priorities everyone can explain, measures we hold ourselves to, and early wins that build trust — with the business and within the team.",
      },
      { type: "h2", text: "Why listening first works" },
      {
        type: "p",
        text: "When I inherited a team that was blamed for every missed delivery, I didn't start with a new process. I started by listening, to the business and to the team. A year later they had delivered more than in the two years before it combined, and nobody had left. The full story is one of my leadership moments.",
      },
      {
        type: "quote",
        text: "Listen first. Shape together. Then go.",
      },
    ],
  },
];

export const showDrafts = process.env.NODE_ENV !== "production";

export const visibleArticles = articles
  .filter((a) => a.status === "published" || showDrafts)
  .sort((a, b) => b.date.localeCompare(a.date));

export const hasPublishedArticles = articles.some((a) => a.status === "published");

/** Approximate reading time in minutes (220 words a minute). */
export function readingTime(article: Article) {
  const words = article.blocks
    .filter((b) => b.type !== "note")
    .flatMap(blockWords)
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
