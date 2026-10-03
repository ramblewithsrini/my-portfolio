// "Under the hood" page (/under-the-hood): the engineering decisions behind
// this site, written as lightweight architecture decision records.
// Code snippets are copied from the real source — keep them in sync if the
// code they quote changes.

export const sourceUrl = "https://github.com/ramblewithsrini/my-portfolio";

export const hoodIntro = {
  eyebrow: "Under the hood",
  title: "How this site is built —",
  titleAccent: "and why.",
  lead: "I built this site with Claude Code as my pair programmer. I set the architecture, made the calls and reviewed every change; Claude Code wrote the code. These are the decisions behind it — the same way I'd document a production system.",
};

export const hoodStats = [
  { value: "100", label: "Lighthouse accessibility, best practices and SEO" },
  { value: "0", label: "Servers to patch — every page is pre-built" },
  { value: "26", label: "Testimonials verified verbatim at build time" },
  { value: "1", label: "Data file per kind of content — pages are templates" },
];

export const workingMethod = {
  title: "How I worked with Claude Code",
  points: [
    "I set the direction, the information architecture and the design principles.",
    "Claude Code wrote the code; I reviewed every change before it was committed.",
    "Every change was checked in a real browser, on desktop and on a phone, before it shipped.",
    "Every commit message explains why, not just what — the history reads like a design log.",
  ],
};

export type Decision = {
  title: string;
  context: string;
  decision: string;
  consequence: string;
  code?: { file: string; snippet: string };
};

export const decisions: Decision[] = [
  {
    title: "Content as typed data, pages as templates",
    context: "During a job search the content changes almost daily — new numbers, reworded stories, extra roles.",
    decision: "All content lives in typed TypeScript data files (profile, case studies, testimonials, role value, articles). Pages are templates that read from them.",
    consequence: "Changing a sentence never touches layout, and the compiler catches a missing field before it reaches the site.",
  },
  {
    title: "Trust, enforced by the build",
    context: "Testimonial quotes appear on several pages. A paraphrased quote presented as verbatim would undermine everything else.",
    decision: "Every quote is looked up in the recommendation data when the site is built. If it isn't an exact excerpt, the build fails.",
    consequence: "A misquote can never be published — and attribution (title, company, relationship) is filled in automatically.",
    code: {
      file: "src/lib/career.ts",
      snippet: [
        "/** Attribute a verbatim excerpt to its recommendation; throws if not found. */",
        "export function attributeQuote(excerpt: string) {",
        "  const t = testimonials.find(",
        "    (t) => !t.hidden && normalise(t.paragraphs.join(\" \")).includes(normalise(excerpt)),",
        "  );",
        "  if (!t) throw new Error(`Quote is not a verbatim excerpt of any testimonial: \"${excerpt}\"`);",
        "  return { excerpt, title: t.title, company: t.company, relationship: relationshipLabels[t.relationship] };",
        "}",
      ].join("\n"),
    },
  },
  {
    title: "Privacy by design",
    context: "The LinkedIn export of recommendations includes every recommender's name.",
    decision: "A script generates the testimonial data without names. The source file is git-ignored, and when it was once committed, the repository history was cleaned before the repo went public.",
    consequence: "No recommender's name exists anywhere in the public code or on the site.",
  },
  {
    title: "Everything pre-built, nothing left to chance",
    context: "A portfolio needs to be fast, cheap to run and impossible to break at 2am.",
    decision: "Every page — including each case study — is generated at build time. Unknown URLs return a 404 instead of being rendered on demand.",
    consequence: "Pages load instantly from the edge, there is no server to patch, and there is nothing to exploit at runtime.",
    code: {
      file: "src/app/experience/[slug]/page.tsx",
      snippet: [
        "// Only the roles listed in portfolio.ts exist; anything else is a 404.",
        "export const dynamicParams = false;",
        "",
        "export function generateStaticParams() {",
        "  return experience.map((j) => ({ slug: j.slug }));",
        "}",
      ].join("\n"),
    },
  },
  {
    title: "Drafts that can't leak",
    context: "Articles need a draft stage with editor's notes, but a half-finished draft must never reach the live site.",
    decision: "Drafts are visible only in local development. Production builds exclude them from pages, the sitemap and the navigation.",
    consequence: "I can draft in public code without publishing — and an article goes live only when I deliberately mark it published.",
    code: {
      file: "src/data/insights.ts",
      snippet: [
        "export const showDrafts = process.env.NODE_ENV !== \"production\";",
        "",
        "export const visibleArticles = articles",
        "  .filter((a) => a.status === \"published\" || showDrafts)",
        "  .sort((a, b) => b.date.localeCompare(a.date));",
      ].join("\n"),
    },
  },
  {
    title: "Accessibility as an acceptance criterion",
    context: "A site about leadership should work for everyone — including people using screen readers or keyboards.",
    decision: "Every page was audited with Google Lighthouse, and the build was not considered done until the findings were fixed: list semantics, accessible names, colour contrast and link styling.",
    consequence: "Lighthouse scores of 100 for accessibility, best practices and SEO across the main pages.",
  },
  {
    title: "Brand assets generated in code",
    context: "Links shared on LinkedIn, Teams or WhatsApp should show a branded preview, not a bare URL.",
    decision: "The social preview card and the site icons are generated in code at build time, with the site's own typeface bundled from an npm package rather than fetched over the network.",
    consequence: "Every share looks polished, and the build never depends on a third-party font service being up.",
  },
];

export const stack = [
  "Next.js 16 (App Router)",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "next/og",
  "Vercel",
  "GitHub",
  "Claude Code",
];
