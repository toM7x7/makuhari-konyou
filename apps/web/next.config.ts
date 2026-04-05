import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@makuhari/shared-types",
    "@makuhari/preset-engine",
    "@makuhari/prompt-builder",
    "@makuhari/analytics",
  ],
};

export default nextConfig;
