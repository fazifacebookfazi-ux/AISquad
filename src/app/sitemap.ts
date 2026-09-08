import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
