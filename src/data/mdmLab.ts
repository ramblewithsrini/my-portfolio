// Content and sample data for the MDM playground (/lab/mdm).
// Every person and address here is fictional.

import type { SourceRecord, Survivorship, Thresholds, Weights } from "@/lib/mdm";

// Drafts are visible only in local development; set to true to put the page live.
export const mdmLabPublished = false;

export const sampleRecords: SourceRecord[] = [
  { id: "P1", source: "Policy", name: "Jonathan Smith", dob: "1980-03-12", address: "14 Oak Lane, Leeds, LS1 4AB", email: "jon.smith@example.com", updated: "2016-01-10" },
  { id: "C1", source: "Claims", name: "Jon Smith", dob: "12/03/1980", address: "14 Oak Ln, Leeds LS1 4AB", email: "", updated: "2017-06-02" },
  { id: "W1", source: "Web", name: "J. Smyth", dob: "12-03-1980", address: "14 Oak Lane LS14AB", email: "jon.smith@example.com", updated: "2017-09-15" },
  { id: "P2", source: "Policy", name: "Sarah Smith", dob: "1982-09-05", address: "14 Oak Lane, Leeds, LS1 4AB", email: "sarah.smith@example.com", updated: "2016-01-10" },
  { id: "W2", source: "Web", name: "Sarah Smith", dob: "05/09/1982", address: "22 Elm Road, Leeds, LS2 7QT", email: "sarah.smith@example.com", updated: "2017-11-20" },
  { id: "P3", source: "Policy", name: "Priya Patel", dob: "1975-07-21", address: "3 Mill Street, York, YO1 6AA", email: "priya.patel@example.com", updated: "2015-04-18" },
  { id: "C2", source: "Claims", name: "Priya Patell", dob: "21/07/1975", address: "3 Mill St, York YO1 6AA", email: "", updated: "2016-08-30" },
  { id: "P4", source: "Policy", name: "Ravi Patel", dob: "1974-02-14", address: "3 Mill Street, York, YO1 6AA", email: "ravi.patel@example.com", updated: "2015-04-18" },
  { id: "W3", source: "Web", name: "Daniel Evans", dob: "30/11/1990", address: "8 Station Road, Bath, BA1 1AA", email: "dan.evans@example.com", updated: "2017-02-11" },
  { id: "C3", source: "Claims", name: "Danielle Evans", dob: "1991-11-30", address: "8 Station Rd, Bath BA1 1AA", email: "", updated: "2017-05-07" },
];

export const defaultWeights: Weights = { name: 35, dob: 30, address: 20, email: 15 };
export const defaultThresholds: Thresholds = { review: 70, auto: 85 };
export const defaultSurvivorship: Survivorship = { name: "most-complete", address: "most-recent" };

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
