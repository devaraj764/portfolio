import type { MetadataRoute } from "next";

import { getAllPosts, getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, priority: 1.0 },
    { url: `${site.url}/projects`, priority: 0.9 },
    { url: `${site.url}/blog`, priority: 0.9 },
    { url: `${site.url}/experience`, priority: 0.8 },
    { url: `${site.url}/contact`, priority: 0.7 },
  ];

  return [
    ...staticRoutes,
    ...getAllProjects().map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      priority: 0.8,
    })),
    ...getAllPosts().map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date || undefined,
      priority: 0.8,
    })),
  ];
}
