import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/** Set GITHUB_PAGES=true when building for GitHub Pages project site. */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "shadcn-theme-builder";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  turbopack: {
    root: rootDir,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
