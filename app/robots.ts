import type { MetadataRoute } from "next";

// Everyone welcome — including AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
// Google-Extended…), so AI assistants can read and cite the site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://quantumslate.in/sitemap.xml",
  };
}
