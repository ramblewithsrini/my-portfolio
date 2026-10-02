import { experience, type Job } from "@/data/portfolio";
import { stories, type Story } from "@/data/stories";
import { relationshipLabels, testimonials } from "@/data/testimonials";

/** Months since year 0 for a "YYYY-MM" string. */
export function toMonths(date: string) {
  const [y, m] = date.split("-").map(Number);
  return y * 12 + (m - 1);
}

/** Inclusive duration, LinkedIn-style: "3 yrs 4 mos". */
export function formatDuration(job: Job) {
  const total = toMonths(job.endDate) - toMonths(job.startDate) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  return [yrs && `${yrs} yr${yrs > 1 ? "s" : ""}`, mos && `${mos} mo${mos > 1 ? "s" : ""}`]
    .filter(Boolean)
    .join(" ");
}

/** Compact duration for tight spaces: "3y 4m". */
export function formatDurationShort(job: Job) {
  const total = toMonths(job.endDate) - toMonths(job.startDate) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  return [yrs && `${yrs}y`, mos && `${mos}m`].filter(Boolean).join(" ");
}

export function getRole(slug: string) {
  const index = experience.findIndex((j) => j.slug === slug);
  if (index < 0) return undefined;
  return {
    job: experience[index],
    story: (stories[slug] ?? {}) as Story,
    // experience is newest first, so "newer" is the previous entry.
    newer: experience[index - 1],
    older: experience[index + 1],
  };
}

const normalise = (s: string) => s.replace(/\s+/g, " ").trim();

/** Attribute a verbatim excerpt to its recommendation; throws if not found. */
export function attributeQuote(excerpt: string) {
  const t = testimonials.find(
    (t) => !t.hidden && normalise(t.paragraphs.join(" ")).includes(normalise(excerpt)),
  );
  if (!t) throw new Error(`Quote is not a verbatim excerpt of any testimonial: "${excerpt}"`);
  return { excerpt, title: t.title, company: t.company, relationship: relationshipLabels[t.relationship] };
}
