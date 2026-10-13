import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Allow the preview sandbox origin to access dev resources without
  // triggering "Cross origin request detected" warnings.
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
