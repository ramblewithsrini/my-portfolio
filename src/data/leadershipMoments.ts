// "Leadership moments" on /leadership: real situations, told the same way each time
// (situation, their side, what I did, what changed, lesson). People and, where
// noted, companies are kept anonymous on purpose.

export type LeadershipMoment = {
  id: string;
  theme: string; // what the story shows, e.g. "Judgement under pressure"
  title: string;
  teaser: string; // one sentence, shown before the story is opened
  situation: string | string[];
  theirSide: string | string[];
  whatIDid: string[];
  whatChanged: string[];
  lesson: string;
  // Headings for the middle two parts, when "Their side" and "What I did" don't fit the story.
  labels?: { theirSide?: string; whatIDid?: string };
};

export const momentsIntro = {
  title: "Leadership moments",
  lead: "Four real situations: what was at stake, how it looked from the other side, what I did and what changed. Names are left out on purpose.",
};

export const leadershipMoments: LeadershipMoment[] = [
  {
    id: "visible",
    theme: "Standing up for my people",
    title: "Making good work visible",
    teaser: "A VP pushed back on promoting someone in my team. Instead of arguing harder, I changed what they could see.",
    situation:
      "Someone in my team consistently did the work that held major initiatives together. When I put them forward for promotion, the VP of the organisation pushed back: they hadn't seen enough of the work.",
    theirSide:
      "The VP's concern was fair. Leadership operated at a very high level, and a promotion has to rest on evidence, not on one manager's word. The best of that work happened in design sessions and delivery teams, far from the rooms where the decision was being made.",
    whatIDid: [
      "Rather than argue harder, I built the evidence. I gathered feedback from peers and collaborators across teams, so the case came from the people who worked with them, not just from me.",
      "Then I invited them to present the initiative they were leading to its steering committee, so senior leaders could see their skills first-hand.",
    ],
    whatChanged: [
      "The steering committee valued their thinking, the promotion followed, and they stayed with the company.",
      "It changed how I lead, too: I now see it as my job to give my team a platform to be seen, not to wait for a promotion case to make it happen.",
    ],
    lesson: "Visibility isn't only the employee's job. It's their manager's job too.",
  },
  {
    id: "trusted",
    theme: "Turning a team around",
    title: "From blamed to trusted",
    teaser: "I inherited a demoralised team that was blamed for every missed delivery. I started by listening — to both sides.",
    situation:
      "I inherited a team carrying heavy technical debt, with low morale. They worked hard, but nobody recognised it. Instead they were blamed for missed deliveries by a demanding business team that had lost confidence in them.",
    theirSide:
      "Both sides had reason to be frustrated. The business had watched deliveries slip and needed new capabilities to compete. The team was working against technical debt they hadn't created, and felt nobody was listening to them either.",
    whatIDid: [
      "With the business, I listened first. I treated every concern as real and came back with a solution, not an explanation. I set up a regular meeting with their VP and shared a weekly action log, so progress was visible.",
      "With the team, I worked alongside them. I helped them prioritise, and I took on the job of delivering bad or difficult news to the business myself, so they didn't have to.",
    ],
    whatChanged: [
      "Within six months, both sides trusted us. That let me streamline the engineering process and agree a roadmap to deliver the capabilities the business wanted, at scale.",
      "In my first year, the team delivered more than in the previous two years combined. Nobody left or asked to move: everyone chose to stay. The business director thanked me personally for my part.",
    ],
    lesson: "A team can't fix its delivery while it's busy defending itself. Win trust on both sides first, and delivery follows.",
  },
  {
    id: "premature-move",
    theme: "Judgement under pressure",
    title: "Stopping a premature move",
    teaser: "A platform move was 120 days from going ahead with no requirements behind it. I stopped it with evidence.",
    situation:
      "As part of a platform consolidation, a ServiceNow application was due to move to an in-house platform within 120 days, before its licence came up for renewal. The decision had been made before I looked at it closely. When I did, I found no requirements documents and no clear description of what the application actually did.",
    theirSide:
      "The goal made sense. Consolidation was about cutting duplicate platforms and cost, and the renewal date created real pressure to act. Nobody wanted to pay for a platform they planned to retire.",
    whatIDid: [
      "With no requirements to work from, I asked my team to reverse-engineer the application and recover its high-level requirements. Comparing those with the in-house platform showed more than 15 functional gaps, and a compliance risk if the rebuild wasn't finished in time.",
      "That meant asking the Investment Council for budget to keep an extra ServiceNow instance: the opposite of the saving they expected. It took several presentations before the evidence won the argument.",
    ],
    whatChanged: [
      "The premature move was stopped, and the application stayed on ServiceNow.",
      "The business avoided a compliance risk, and more than 15 gaps that would otherwise have surfaced only after the switch.",
    ],
    lesson: "A saving that creates a compliance risk isn't a saving. When a decision has been made without evidence, the answer is evidence, not opinion.",
  },
  {
    id: "said-no",
    theme: "Owning a mistake",
    title: "Saying no too quickly",
    teaser: "We won $6.5M of a $10M airline bid. The $3.5M I chose not to bid for taught me more.",
    situation: [
      "We were responding to a $10M RFP from an airline. About $3.5M of it was business process management (BPM) across the entire airline, an area where we had neither the capacity nor the skills.",
      "I argued strongly for a no-go on that part. I pushed the sales team to agree with the customer that we would respond to the rest of the RFP and leave the BPM work out. The customer agreed, and we won the remaining $6.5M.",
    ],
    theirSide:
      "It looked like the responsible call. Promising work we couldn't deliver would have put the client and our reputation at risk, and saying no protected both. Winning the rest seemed to prove it.",
    whatIDid: [
      "Looking back, I treated a gap in our capability as a reason to walk away rather than a problem to solve. We could have bid the full scope with a partner who had the BPM expertise. We'd have competed for the whole contract and built BPM skills inside our organisation along the way, an edge over competitors in every future bid. I missed it because I was looking at what we could do then, not at what we needed to become.",
      "When I saw it, I put my hand up and said plainly that it was the wrong decision: a lack of vision on my part at that stage.",
    ],
    whatChanged: [
      "Now, before I say no, I ask myself why, and whether we could do it differently: with a partner, in phases, or by building the capability as we go.",
    ],
    lesson: "A capability gap is a reason to look for a partner, not a reason to walk away.",
    labels: { theirSide: "Why it seemed right", whatIDid: "Why it was a mistake" },
  },
];
