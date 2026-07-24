import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Pin the workspace root so a lockfile in a parent folder can't confuse
  // Next's file tracing (harmless warning otherwise).
  outputFileTracingRoot: path.resolve(__dirname),
};

export default nextConfig;
