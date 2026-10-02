import type { MetadataRoute } from "next";
import { experience } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/what-i-bring", "/experience", "/testimonials"].map((path, i) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: i === 0 ? 1 : 0.8,
  }));
  const roles = experience.map((j) => ({
    url: `${siteUrl}/experience/${j.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...roles];
}
