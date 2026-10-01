// All site content lives here. Edit this file to update your portfolio —
// no layout code needs to change.

export const profile = {
  name: "Your Name",
  initials: "YN",
  headline: "Software Engineer",
  tagline: "I build fast, thoughtful products for the web.",
  bio: "Replace this with 2–3 sentences about you: what you do, what you care about, and what you're looking for next. Keep it specific — mention a domain, a kind of problem you love, or an impact you're proud of.",
  location: "City, Country",
  availability: "Open to new opportunities",
  email: "you@example.com",
  resumeUrl: "/resume.pdf", // put your PDF at public/resume.pdf
  socials: [
    { label: "GitHub", href: "https://github.com/your-username" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username" },
  ],
};

export const stats = [
  { value: "5+", label: "Years experience" },
  { value: "20+", label: "Projects shipped" },
  { value: "3", label: "Companies" },
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
    role: "Senior Software Engineer",
    company: "Company One",
    start: "2023",
    end: "Present",
    highlights: [
      "Led a project that improved a key metric by 40% — say what and how.",
      "Mentored engineers and set technical direction for the team.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Company Two",
    start: "2020",
    end: "2023",
    highlights: [
      "Built and launched a feature used by thousands of customers.",
      "Cut page load time in half by reworking the data layer.",
    ],
  },
  {
    role: "Junior Developer",
    company: "Company Three",
    start: "2019",
    end: "2020",
    highlights: ["Shipped internal tools that saved the team hours each week."],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "Project Alpha",
    description:
      "One line on what it does and why it matters. Mention a result if you can.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "https://example.com",
    repo: "https://github.com/your-username/project-alpha",
  },
  {
    title: "Project Beta",
    description: "A tool that solves a specific problem for a specific audience.",
    tech: ["React", "Node.js", "AWS"],
    repo: "https://github.com/your-username/project-beta",
  },
  {
    title: "Project Gamma",
    description: "Something you built for fun that shows off a skill you enjoy.",
    tech: ["Python", "FastAPI"],
    href: "https://example.com",
  },
  {
    title: "Project Delta",
    description: "An open-source contribution or side project with real users.",
    tech: ["Go", "Docker", "Kubernetes"],
    repo: "https://github.com/your-username/project-delta",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Accessibility"],
  },
  {
    group: "Backend & Cloud",
    items: ["Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    group: "Practices",
    items: ["System design", "Testing", "CI/CD", "Mentoring"],
  },
];
