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
  | { type: "table"; caption: string; head: string[]; rows: string[][]; sources?: { label: string; href: string }[] };

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
