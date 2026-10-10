import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for optimised Docker images.
  // With this enabled, `npm run build` produces a self-contained `.next/standalone`
  // directory that does not require node_modules to be present at runtime.
  // Reference: https://nextjs.org/docs/app/api-reference/config/next-config-js/output
  output: "standalone",
};

export default nextConfig;
