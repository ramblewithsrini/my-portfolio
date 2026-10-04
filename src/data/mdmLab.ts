// Content and sample data for the MDM playground (/lab/mdm).
// Every person and address here is fictional.

import type { SourceRecord, Survivorship, Thresholds, Weights } from "@/lib/mdm";
import sample from "./mdm-sample.json";

// Drafts are visible only in local development; set to true to put the page live.
export const mdmLabPublished = false;

// The sample records and default settings live in a JSON file shared with the
// Python engine (python/mdm.py), so both implementations read the same data.
export const sampleRecords = sample.records as SourceRecord[];
export const defaultWeights: Weights = sample.defaults.weights;
export const defaultThresholds: Thresholds = sample.defaults.thresholds;
export const defaultSurvivorship = sample.defaults.survivorship as Survivorship;

export const labIntro = {
  eyebrow: "Lab · Master data management",
  title: "Who is who?",
  titleAccent: "MDM, in your browser.",
  lead: "The same customer often appears in several systems — spelt differently, with dates in different formats, and addresses that disagree. Master data management finds the matches, builds one trusted 'golden record' per customer, and groups customers into households. Move the sliders and watch every decision change.",
  disclaimer: "A simplified illustration with fictional data. It shows the concepts — probabilistic matching, survivorship and householding — not any employer's algorithm.",
};

export const steps = [
  { n: "01", title: "Messy source data", body: "Ten records from three systems: policy, claims and web sign-ups." },
  { n: "02", title: "Matching", body: "Every pair is scored field by field. High scores merge, the grey zone goes to a person, low scores stay apart." },
  { n: "03", title: "Survivorship", body: "Matched records become one golden record, with rules deciding which source wins each field." },
  { n: "04", title: "Households", body: "Golden records at the same address are grouped into households." },
];
