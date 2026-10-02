// Recommendations received on LinkedIn, reproduced verbatim. Names are
// deliberately omitted — only each recommender's current title and company.
// Generated from Recommendations_Received.csv (which is git-ignored).
//
// relationship: "managed"  = they managed Srini
//               "reported" = they reported to Srini
//               "worked"   = they worked alongside Srini
// featured: shown large at the top of the page, tied to a leadership pillar.
// hidden: kept here but not shown on the site.

export type Relationship = "managed" | "reported" | "worked";

export type Testimonial = {
  title: string;
  company: string;
  relationship: Relationship;
  date: string; // YYYY-MM
  paragraphs: string[];
  featured?: { pillar: string; excerpt: string };
  teaser?: string;
  hidden?: boolean;
};

export const relationshipLabels: Record<Relationship, string> = {
  managed: "Managed Srini",
  reported: "Reported to Srini",
  worked: "Worked with Srini",
};

export const linkedInRecommendationsUrl =
  "https://www.linkedin.com/in/srinvs/details/recommendations/";

export const testimonials: Testimonial[] = [
  {
    "title": "Payment Product Management",
    "company": "Discover",
    "relationship": "worked",
    "date": "2026-08",
    "paragraphs": [
      "I had the pleasure of working alongside Srini at Discover/Capital One. As a head architect, he excels at turning complex engineering problems into clear, scalable roadmap solutions. He leads his team with high technical standards and a genuinely collaborative approach to achieving his strategic vision. I really enjoyed working with Srini and would highly recommend him for any team seeking a top-tier architecture leader."
    ]
  },
  {
    "title": "Sr. Manager - GPN - Partner Experience",
    "company": "Capital One",
    "relationship": "worked",
    "date": "2026-08",
    "paragraphs": [
      "Srini is one of those rare professionals whose technical abilities and architectural thinking immediately inspire confidence. He has an exceptional talent for understanding the big picture while still diving deep into the details that matter. Whether designing a new system or troubleshooting a critical issue, Srini consistently delivers clarity, structure, and well‑crafted solutions. His ability to translate business needs into robust technical solutions makes him a strategic asset to any organization.",
      "Working with him has been a pleasure, and his contributions have strengthened every project we’ve collaborated on. I highly recommend Srini for any role requiring strong technical leadership and architectural excellence."
    ]
  },
  {
    "title": "Director Application Development",
    "company": "Capital One",
    "relationship": "worked",
    "date": "2026-08",
    "paragraphs": [
      "I had the opportunity to work with Srini at Discover/Capital One. Srini was a valued and trusted Technical Architecture partner for me and the entire Partner Experience product area. Srini provides a strong technical background with an excellent understanding of the platforms he supports. Srini does an excellent job of balancing the requirements of the business with the optimal technical solution. Srini was a strong team leader who ensured that his team understood the needs of the business and were continually focused on the highest priority work. Srini is focused on the needs of his team and the organization and is always willing to step in and solve the problems at hand. Srini would be a great addition to any team and organization."
    ]
  },
  {
    "title": "Manager, Project Management",
    "company": "Capital One",
    "relationship": "worked",
    "date": "2026-08",
    "paragraphs": [
      "I had the pleasure of working with Srini, and he is one of the best architects I have had the opportunity to work with in my career.",
      "Srini has a remarkable ability to design complex architectures and, equally importantly, articulate them in a way that makes them easy for everyone on the team to understand. His technical expertise, combined with his ability to simplify complex concepts, makes him a tremendous asset to any team.",
      "As a leader, Srini is highly supportive of his team and is always willing to jump in and help when needed. I worked closely with him on convergence initiatives as well as large programs across multiple product families, and it was a great experience.",
      "Although Srini was based in the UK and I was in the US, our collaboration was seamless. He was always accessible, approachable, and ready to work through challenges with a smile. He also has a great ability to clearly articulate what is needed and align everyone toward moving forward.",
      "Srini is not only a strong architect but also a collaborative and dependable leader. It was truly a pleasure working with him, and I would highly recommend him to any organization looking for a talented architect and people leader."
    ],
    "featured": {
      "pillar": "Clarity next",
      "excerpt": "Srini has a remarkable ability to design complex architectures and, equally importantly, articulate them in a way that makes them easy for everyone on the team to understand."
    }
  },
  {
    "title": "Vice President of Product Management, Network Product & Platforms",
    "company": "Capital One",
    "relationship": "worked",
    "date": "2026-08",
    "paragraphs": [
      "I had the pleasure of working with Srini as my technical architect, and he was a wonderful partner. He was highly collaborative, transparent, and enthusiastic about exploring new ways of working as I ramped up on the team. As a people leader, he was also very effective at guiding his team to consistent results.",
      "Beyond the work itself, Srini is a kind and patient person who brings a positive attitude day in and day out!"
    ]
  },
  {
    "title": "Director - Application Architecture",
    "company": "Discover Financial Services",
    "relationship": "managed",
    "date": "2026-08",
    "paragraphs": [
      "I had the opportunity to hire and work closely with Srini several years ago as a key member of my technology leadership team. He stepped into a highly challenging leadership role, where he was responsible for building his own technology organization to support a newly formed business product area. This included defining the technology strategy and architecture for a fragmented portfolio of applications that were delivering a disjointed and suboptimal customer experience.",
      "In addition to these responsibilities, Srini partnered with a newly established and relatively inexperienced product team, helping guide them through both the domain and the process of delivering a cohesive product vision. He did an exceptional job balancing these demands—building and leading a strong technology team while collaborating effectively with product leadership.",
      "Srini led the development of a comprehensive vision for a consolidated customer portal that unified the customer experience, eliminated friction points, and significantly improved overall customer satisfaction. I was particularly impressed with his ability to navigate complex stakeholder relationships, align product leadership around a shared vision, and translate that vision into actionable architecture delivered by his team in close partnership with engineering.",
      "Srini is a highly capable, ethical, and compassionate leader. He brings out the best in his team and earns the trust of his business partners through his integrity and high personal standards. I feel fortunate to have had him on my leadership team and would welcome the opportunity to work with him again."
    ],
    "teaser": "Srini is a highly capable, ethical, and compassionate leader. He brings out the best in his team and earns the trust of his business partners through his integrity and high personal standards."
  },
  {
    "title": "Senior Software Engineering Manager",
    "company": "Capital One",
    "relationship": "worked",
    "date": "2026-07",
    "paragraphs": [
      "I worked closely with Srinivas while he led the architectural modernization and strategy of our payment systems — a complex, high-stakes program spanning multiple platforms. Srini set clear technical direction and consistently brought the right issues to leadership’s attention, influencing decisions with sound judgment rather than just executing instructions. That combination of technical credibility and the confidence to push back when it mattered made him someone I trusted implicitly.",
      "He was equally invested in the engineering teams — mentoring, unblocking, and creating an environment where people felt ownership of what they built. That’s a rare balance, and it’s a big part of why this transformation succeeded.",
      "I’d welcome the chance to work with Srini again."
    ]
  },
  {
    "title": "Principal application architect",
    "company": "Discover Financial Services",
    "relationship": "reported",
    "date": "2026-07",
    "paragraphs": [
      "I had the pleasure of working with Srini, and I can confidently say he is one of the best managers I've worked with.",
      "He is approachable, transparent, and genuinely supportive of his team. No matter how challenging the situation, he remains cool and helps the team focus on finding the right solution rather than assigning blame.",
      "As a Technical Architect, he has strong technical knowledge and is always willing to share it. He encourages open discussions, values different opinions, and creates an environment where people feel comfortable asking questions and learning.",
      "What I appreciate most is that he always stands by his team. He trusts people, motivates them to do their best, and is always available when guidance or support is needed.",
      "I would highly recommend him to anyone looking for a technical leader who combines strong architectural expertise with excellent people management skills."
    ]
  },
  {
    "title": "Senior Director, Network Partner Identity & Data Products",
    "company": "Capital One",
    "relationship": "worked",
    "date": "2026-06",
    "paragraphs": [
      "Srinivasan is one of those people everyone seems to turn to when they needed a thoughtful solution to a complex technical challenge. As a product leader, I appreciated how approachable and collaborative he was. He had a rare ability to translate complicated architectural decisions into practical discussions, making him an outstanding partner to Product Management. Beyond his deep technical expertise, he was incredibly supportive, dependable, and genuinely invested in helping the team succeed. Working with him made me better at my job, and I would love a chance to partner with him again."
    ]
  },
  {
    "title": "Expert Application Architect",
    "company": "Capital One",
    "relationship": "reported",
    "date": "2026-06",
    "paragraphs": [
      "I worked under Srini for over 3 years as an Expert Application Architect, while he served as our Technical Architecture Manager.",
      "What stood out most about Srini is that he leads with a team-first mentality in a way that's rare to find. High-demand work tends to route through a manager first, and instead of passing that pressure down, he absorbed it himself. He consistently shielded us from the noise and urgency so we could stay focused on what actually mattered. That's not a small thing. It takes a genuinely selfless leader to take the hit so the team doesn't have to.",
      "That same empathy showed up in how he treated our work. When I led our PCI 4.0 compliance effort and the OCP migration, he didn't just acknowledge it internally. He advocated for it and made sure it had visibility beyond our immediate team. He paid attention to what people on his team were doing and made sure they got seen for it, which says a lot about how much he genuinely cares about the people he leads, not just the output.",
      "Srini is a true servant leader. He puts his people first, consistently and without needing recognition for it, and the team's performance reflects that. I feel fortunate to have had the privilege of working with him, and I have no doubt that future colleagues will benefit greatly from his leadership."
    ],
    "featured": {
      "pillar": "People first",
      "excerpt": "Srini is a true servant leader. He puts his people first, consistently and without needing recognition for it, and the team's performance reflects that."
    }
  },
  {
    "title": "Senior Manager, Product - Global Payment Network",
    "company": "Capital One",
    "relationship": "worked",
    "date": "2026-06",
    "paragraphs": [
      "Srini is an exceptional technology leader. His architectural expertise combined with a strong business mindset, helps teams navigate complex challenges while driving scalable, long-term solutions. His technical recommendations help elevate decision-making and supports defining the technical direction of products. Srini is a trusted partner and amazingly collaborative teammate that consistently elevates the people he works with."
    ]
  },
  {
    "title": "Director of Application Architecture",
    "company": "Discover Financial Services",
    "relationship": "managed",
    "date": "2026-06",
    "paragraphs": [
      "Srini is an excellent technical resource. He has that rare breed of great technical ability and experience alongside team leading and stakeholder management skills. He is excellent in a technical lead role across a large domain covering architecture and engineering responsibilities."
    ]
  },
  {
    "title": "Senior Manager Expert Application Architect",
    "company": "Capital One",
    "relationship": "reported",
    "date": "2026-06",
    "paragraphs": [
      "Srini is an emotionally-intelligent people leader who cares deeply about his team. At all times he seeks to balance the welfare of the team with delivering on multiple fronts in a challenging environment. Srini epitomises the very best of servant leadership and is often found with his sleeves rolled up, unblocking process x or moving a particularly stubborn problem y forward. Srini is a player coach - as well as expending considerable effort to diligently help others he works as an individual contributor and engages in requirements analysis, problem elicitation and the creation of strawman solutions. He takes feedback seriously, he is open-minded and is always keen to think about a problem from a different angle.",
      "Srini proactively partners with stakeholders and demonstrates care, patience and understanding even when the ask is not yet fully formed. Srini is doing a great job in an area that underpins the entire Global Payment Network."
    ]
  },
  {
    "title": "Principal Application Architect",
    "company": "Capital One",
    "relationship": "reported",
    "date": "2026-04",
    "paragraphs": [
      "Srini has been a pleasure to work with and what stands out most is his commitment to his team. He consistently puts people first, taking the time to support, develop, and advocate for those around him.",
      "He has also adapted quickly to a demanding and complex product area whilst still providing clear technical direction. His combination of people focused leadership and technical depth makes him a highly effective manager in software architecture."
    ]
  },
  {
    "title": "Retired Director of Professional Services",
    "company": "Freelance | Self-Employed",
    "relationship": "managed",
    "date": "2020-07",
    "paragraphs": [
      "I worked with Srini for a year and found him a delight to work with He is incredibly knowledgeable, happy to share his knowledge and mentor team members - but is also a great person to help clients understand and surface their requirements and support them in developing their architecture and strategy"
    ]
  },
  {
    "title": "Sr Director Professional Services",
    "company": "Manhattan Associates",
    "relationship": "managed",
    "date": "2020-03",
    "paragraphs": [
      "It’s rare that you come across a dedicated hard worker like Srini.",
      "I hired Srini as a Solutions Architect in 2018 after seeing his credentials on digital transformation, he has supported our pre-sales activity over the last 2 years and completed multiple proposals for me since then.",
      "I was particularly impressed by Srini's ability to handle even the toughest clients. That skill often takes years to develop among Professional Services people, but it seemed to come perfectly naturally to him.",
      "Any employee would be lucky to have Srini in their team."
    ]
  },
  {
    "title": "Delivery Project Executive",
    "company": "Independent Consultant",
    "relationship": "worked",
    "date": "2017-03",
    "paragraphs": [
      "Srini was the MDM Solution Architect working at Allianz. My role was TCS Engagement Manager working on the same MDM implementation. This was a two year project and Srini joined half way through. He soon established himself as very knowledgeable plus a good team player. During a complex design phase around Java services he was a leading light but also very supportive to my team. Not only this he was very supportive to me personally and gave me helpful insights to solve hurdles outside of my immediate radar. Socially, Srini is a great guy and I would recommend him without reservation."
    ]
  },
  {
    "title": "Associate Cloud Data Architect",
    "company": "Allianz UK",
    "relationship": "worked",
    "date": "2017-03",
    "paragraphs": [
      "I had the pleasure of working with Srini for the last one year at Allianz Guildford, UK. Srini helped me to develop my technical skills by constantly giving tips to improve and innovate. He is a very competent Solution Architect as he has good technical skills, good solution/design skills, understands the importance of putting himself in the business/customer shoes and has strong presentation skills. Srini would be a great asset for any IT company and comes with my heartfelt recommendation."
    ]
  },
  {
    "title": "Senior Solutions Architect",
    "company": "HCLTech",
    "relationship": "worked",
    "date": "2012-10",
    "paragraphs": [
      "Srini is a a highly motivated Individual. He possesses excellent technical capabilities. He thinks out of the box and provides simplified solutions to long standing problems. Amicable, approachable and a team player. A quick thinker, which makes him versatile in the portfolio he handles.",
      "I have learnt quite a few things from him."
    ]
  },
  {
    "title": "Senior Software Engineer",
    "company": "Global Relay",
    "relationship": "worked",
    "date": "2012-09",
    "paragraphs": [
      "Srini joined SITA as a Solution Architect and brought a solution to the acute and long standing issues. He is a quick learner and a good team player. Srini possesses all the required soft skills required to be a solution architect. His out of the box thinking makes him great asset to the team he works for. I would definitely like to work with him future."
    ]
  },
  {
    "title": "Test Lead",
    "company": "Royal Botanic Gardens, Kew",
    "relationship": "worked",
    "date": "2011-10",
    "paragraphs": [
      "Having worked as Project Manager on a recent project with Srini, I greatly valued his technical knowledge, but even more, I appreciated his enthusiasm and his complete commitment to making the project a success."
    ]
  },
  {
    "title": "Project Delivery Manager",
    "company": "UST",
    "relationship": "worked",
    "date": "2011-10",
    "paragraphs": [
      "Srini, as we call him, worked with me on Repository project in BA SoA CofE. He was working with me as a technical architect. Srini is technically very strong and know the stuff he works in great detail. One of the qualities I liked about him is the way, he present things to the audience. He also knows how to convince people with his thought process and how to make people understand something very lucidly which they can’t. Srini is a very good asset for any project and I wish him all the best in his future works and life."
    ]
  },
  {
    "title": "Consulting, Strategy & Advisory Director",
    "company": "NTT DATA UK&I",
    "relationship": "worked",
    "date": "2011-06",
    "paragraphs": [
      "Srini is an extremely hard working Solution Architect. We worked together on implementing a content repository system for SOA services. This development/ deployment involved close working with a 3rd party Open source vendor in a different time zone. This relationship with the vendor was very difficult to manage being remote and created lots of challenges in enhancement/ changes to the application to meet company requirements Srini also worked as part of the team producing the design of the application and taking the design through various approval processes. Srini's dedication and enthusiasm has been clear to see on this project and he has no problem in going the extra mile in his approach to work."
    ]
  },
  {
    "title": "Chief Technology Officer, Life Sciences North America Business U",
    "company": "Tata Consultancy Services",
    "relationship": "managed",
    "date": "2010-06",
    "paragraphs": [
      "Vankeepuram Srinivasan was contributing a part of his time to my group as a Solutions Architect, in addition to his role in a large project. He is a self-driven individual with excellent technical skills. Yet what impressed me most about him were his self-confidence, hunger for challenging work, ability to get things done, and readiness to stretch himself to deliver on his commitments. He has a great future ahead."
    ]
  },
  {
    "title": "Technology Leader- Travel & Hospitality, EMEA",
    "company": "Amazon Web Services (AWS)",
    "relationship": "managed",
    "date": "2010-05",
    "paragraphs": [
      "Srini is a good architect strongly grounded on basic principles of software architecture and design. He clearly articulates his thoughts and is an active participant in technology discussions. Have seen him working focused and dedicated to meet client expectations not minding the physical strain & shortcomings. Was a dependable asset to the team and a good team player.I never had to give a second thought to the assignments given to him. He had it done."
    ]
  },
  {
    "title": "Senior Engineering Manager",
    "company": "Cognizant",
    "relationship": "managed",
    "date": "2010-05",
    "paragraphs": [
      "Vankeepuram Srinivasan is one of the smartest techies I've ever known. I managed him directly while working at TCS for a System Integration Program for a large airline client. Vankee has a sharp and intutitive mind. He was ideal for the role of a Solution Architect and I'm sure is well on the way to becoming an efficient Enterprise Architect. One should not be duped by his 'baby-face' looks. His fundamentals are extremely strong and He is able to grasp technical concepts at ease and within a very short span of time. He was able to impress the clients well and has always been a sought after Architect within multiple Service / Business Units at TCS. (Although he has worked with Telecom clients, my guess is he has worked more within the Airline Domain). His working style is unconventional. His mind is always racing with thoughts on what needs to be done next. Restless by nature but extremely smart. One can assign him a huge / complex task and be assured that it will get done within the deadline. After I first got to know Vankee, it took me a few months to get used to his working style, but once I got to know him better, I realized his potential was very very strong."
    ],
    "featured": {
      "pillar": "Delivery always",
      "excerpt": "One can assign him a huge / complex task and be assured that it will get done within the deadline."
    }
  }
];
