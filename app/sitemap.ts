import type { MetadataRoute } from "next";

const BASE = "https://quantumslate.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/workshops/drones`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/workshops/rc-planes`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/workshops/rockets`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/defence`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/competitions`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified, changeFrequency: "yearly", priority: 0.6 },
  ];
}
