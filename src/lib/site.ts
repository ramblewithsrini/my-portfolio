// The site's public base URL, used for social cards, the sitemap and
// structured data. Deployed builds on Vercel use the custom domain (the bare
// srinivankeepuram.co.uk redirects to www); local builds use localhost.
// NEXT_PUBLIC_SITE_URL overrides both if it is ever set.
const productionUrl = "https://www.srinivankeepuram.co.uk";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL ? productionUrl : "http://localhost:3000");
