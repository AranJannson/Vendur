import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ["dummyimage.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    allowedDevOrigins: ['http://localhost:3000', 'https://www.vendur.shop', 'https://vendur.shop', 'http://localhost:8000', 'http://localhost:8002' , 'http://localhost:8003'],
};

export default nextConfig;
