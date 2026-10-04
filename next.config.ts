import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires an explicit allowlist of image qualities.
    qualities: [75],
  },
  async redirects() {
    return [
      // The article's figure was corrected from 3,200% to 360%; keep old shared links working.
      {
        source: "/insights/absorbing-a-3200-percent-surge",
        destination: "/insights/absorbing-a-360-percent-surge",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
