import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ["dummyimage.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
