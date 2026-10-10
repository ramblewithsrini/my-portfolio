import type { MetadataRoute } from "next";
import { articles } from "@/data/insights";
import { mdmLabPublished } from "@/data/mdmLab";
import { experience } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/what-i-bring", "/experience", "/testimonials", "/leadership", "/under-the-hood"].map((path, i) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly" as const,
    priority: i === 0 ? 1 : 0.8,
  }));
  const roles = experience.map((j) => ({
    url: `${siteUrl}/experience/${j.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const published = articles.filter((a) => a.status === "published");
  const insights = published.length
    ? [
        { url: `${siteUrl}/insights`, changeFrequency: "monthly" as const, priority: 0.7 },
        ...published.map((a) => ({
          url: `${siteUrl}/insights/${a.slug}`,
          lastModified: a.date,
          changeFrequency: "yearly" as const,
          priority: 0.6,
        })),
      ]
    : [];
  const lab = mdmLabPublished
    ? ["/lab", "/lab/mdm", "/lab/mdm/two-ways", "/lab/research-graph"].map((path) => ({
        url: `${siteUrl}${path}`,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }))
    : [];
  return [...pages, ...roles, ...insights, ...lab];
}
