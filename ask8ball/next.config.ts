import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    loader: 'default',
    path: '/_next/image',
    disableStaticImages: true,
  }
};

export default nextConfig;
