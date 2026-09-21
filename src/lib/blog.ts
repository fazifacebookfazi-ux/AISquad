import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type Faq = { q: string; a: string };

export type PostMeta = {
  title: string;
  description: string;
  /** ISO date string, e.g. "2026-09-21" */
  date: string;
  /** Display label, e.g. "Web Development" */
  category: string;
  /** URL slug, e.g. "web-development" */
  categorySlug: string;
  keywords: string[];
  author: string;
  /** Optional generated cover image path, e.g. "/blog/my-post/cover.webp". Falls back to CSS cover art. */
  image?: string;
  /** Mirrors the article's FAQ section; used for FAQPage JSON-LD. */
  faq?: Faq[];
};

export type Post = PostMeta & {
  slug: string;
  readingTime: number;
};

export type Category = {
  slug: string;
  label: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "web-development",
    label: "Web Development",
    description:
      "Pricing guides, frameworks, performance and the craft of shipping websites that convert.",
  },
  {
    slug: "ai-automation",
    label: "AI & Automation",
    description:
      "Practical AI integration — chatbots, agents and workflows that earn their keep.",
  },
  {
    slug: "saas-startups",
    label: "SaaS & Startups",
    description:
      "Building software products: MVPs, pricing, and what actually gets startups to revenue.",
  },
  {
    slug: "ui-ux-design",
    label: "UI/UX Design",
    description:
      "Interfaces people enjoy using — typography, motion, and design systems that scale.",
  },
  {
    slug: "tech-news",
    label: "Tech News",
    description:
      "What changed this week in web tech, and what it means for your business.",
  },
  {
    slug: "digital-growth",
    label: "Digital Growth",
    description:
      "SEO, content and positioning for agencies and founders selling in the US and Pakistan.",
  },
];

export function categoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

function wordCount(source: string): number {
  // Strip the exported meta block and JSX/import lines before counting.
  const body = source
    .replace(/export const meta = \{[\s\S]*?\n\};?/, "")
    .replace(/^import .*$/gm, "");
  return body.split(/\s+/).filter(Boolean).length;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

async function readMeta(slug: string): Promise<PostMeta> {
  const mod = await import(`../../content/blog/${slug}.mdx`);
  return mod.meta as PostMeta;
}

/** The compiled MDX article body for a slug. */
export async function getPostComponent(
  slug: string,
): Promise<React.ComponentType> {
  const mod = await import(`../../content/blog/${slug}.mdx`);
  return mod.default as React.ComponentType;
}

export async function getPost(slug: string): Promise<Post> {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) notFound();
  const meta = await readMeta(slug);
  const raw = fs.readFileSync(file, "utf8");
  return {
    ...meta,
    slug,
    readingTime: Math.max(1, Math.round(wordCount(raw) / 200)),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getAllSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const meta = await readMeta(slug);
      const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      return {
        ...meta,
        slug,
        readingTime: Math.max(1, Math.round(wordCount(raw) / 200)),
      } satisfies Post;
    }),
  );
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.categorySlug === categorySlug);
}

export async function getRelatedPosts(
  post: Post,
  limit = 3,
): Promise<Post[]> {
  const posts = await getAllPosts();
  const others = posts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter(
    (p) => p.categorySlug === post.categorySlug,
  );
  const rest = others.filter((p) => p.categorySlug !== post.categorySlug);
  return [...sameCategory, ...rest].slice(0, limit);
}
