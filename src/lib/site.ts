// The site's public base URL, used for social cards, the sitemap and
// structured data. Set NEXT_PUBLIC_SITE_URL once a custom domain is live;
// on Vercel it otherwise falls back to the project's production domain.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
