import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com",
      },
    ],
  },
  // Turbopack (Next.js 16 default) picks up /home/luiz/package.json as the
  // workspace root because there is a stray package.json/package-lock.json in
  // the home directory. Pinning the root here fixes tailwindcss resolution.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
