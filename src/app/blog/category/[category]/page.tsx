import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/ui/reveal";
import { CTA } from "@/components/home/cta";
import {
  CATEGORIES,
  categoryLabel,
  getPostsByCategory,
} from "@/lib/blog";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const entry = CATEGORIES.find((c) => c.slug === category);
  if (!entry) notFound();

  return {
    title: `${entry.label} Articles`,
    description: entry.description,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const entry = CATEGORIES.find((c) => c.slug === category);
  if (!entry) notFound();

  const posts = await getPostsByCategory(category);

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            {categoryLabel(category).split(" ").slice(0, -1).join(" ")}{" "}
            <span className="italic text-brand-400">
              {categoryLabel(category).split(" ").slice(-1)}
            </span>
          </>
        }
        description={entry.description}
      />

      <Container className="pb-24 lg:pb-32">
        <Link
          href="/blog"
          className="mb-10 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-mist-400 uppercase transition-colors hover:text-brand-300"
        >
          <ArrowLeft className="size-3.5" />
          All articles
        </Link>

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i % 3, 2) * 0.08}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="max-w-xl text-lg leading-relaxed text-mist-400">
            Nothing published in {entry.label} yet — we are writing it now.
            Check back soon.
          </p>
        )}
      </Container>

      <CTA />
    </>
  );
}
