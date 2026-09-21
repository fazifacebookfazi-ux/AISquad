"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "./blog-card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { Post } from "@/lib/blog";

export function CategoryFilter({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>("all");

  const categories = useMemo(() => {
    const seen = new Map<string, string>();
    for (const post of posts) {
      if (!seen.has(post.categorySlug)) seen.set(post.categorySlug, post.category);
    }
    return [...seen.entries()];
  }, [posts]);

  const visible =
    active === "all"
      ? posts
      : posts.filter((p) => p.categorySlug === active);

  const chip = (slug: string, label: string) => (
    <button
      key={slug}
      type="button"
      onClick={() => setActive(slug)}
      aria-pressed={active === slug}
      className={cn(
        "rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors",
        active === slug
          ? "border-brand-400 bg-brand-400 text-ink-950"
          : "border-mist-100/15 text-mist-400 hover:border-mist-100/35 hover:text-mist-100",
      )}
    >
      {label}
    </button>
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by category">
        {chip("all", "All")}
        {categories.map(([slug, label]) => chip(slug, label))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, i) => (
          <Reveal key={post.slug} delay={Math.min(i % 3, 2) * 0.08}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-mist-400">
          Nothing here yet — check back soon.
        </p>
      ) : null}
    </div>
  );
}
