import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { CATEGORIES, getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date("2026-09-10");

  const pages = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const caseStudies = projects.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
  }));

  const posts = await getAllPosts();
  const articles = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
    lastModified: new Date(post.date),
  }));

  const categories = CATEGORIES.map((category) => ({
    path: `/blog/category/${category.slug}`,
    priority: 0.5,
    changeFrequency: "monthly" as const,
  }));

  return [
    ...pages.map(({ path, priority, changeFrequency }) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...caseStudies.map(({ path, priority, changeFrequency }) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...articles.map(({ path, priority, changeFrequency, lastModified }) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...categories.map(({ path, priority, changeFrequency }) => ({
      url: `${site.url}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
  ];
}
