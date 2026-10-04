import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 requires an explicit allowlist of image qualities.
    qualities: [75],
  },
};

export default nextConfig;
