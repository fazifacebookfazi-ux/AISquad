import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BlogCover } from "@/components/blog/blog-cover";
import { BlogCard, formatDate } from "@/components/blog/blog-card";
import { ShareButtons } from "@/components/blog/share-buttons";
import { CTA } from "@/components/home/cta";
import { ArticleJsonLd, FaqJsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import {
  getAllSlugs,
  getPost,
  getPostComponent,
  getRelatedPosts,
} from "@/lib/blog";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  const url = `/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags: post.keywords,
      locale: "en_GB",
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const Article = await getPostComponent(slug);
  const related = await getRelatedPosts(post);
  const url = `${site.url}/blog/${slug}`;

  return (
    <>
      <ArticleJsonLd post={post} url={url} />
      {post.faq && post.faq.length > 0 ? <FaqJsonLd faqs={post.faq} /> : null}

      <article className="relative overflow-hidden pt-28 sm:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-40" />
        </div>

        <Container className="relative">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-mist-400 uppercase transition-colors hover:text-brand-300"
          >
            <ArrowLeft className="size-3.5" />
            All articles
          </Link>

          <div className="mt-8 max-w-4xl">
            <Eyebrow>{post.category}</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-mist-100 text-balance-pretty">
              {post.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-400">
              {post.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-mist-100/10 py-5 font-mono text-[11px] tracking-[0.1em] text-mist-500 uppercase">
              <span>By {post.author}</span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {post.readingTime} min read
              </span>
            </div>
          </div>

          <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-lg border border-mist-100/12">
            {post.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <BlogCover post={post} />
            )}
          </div>

          <div className="mx-auto mt-12 max-w-[46rem]">
            <Article />
          </div>

          <div className="mx-auto mt-12 max-w-[46rem] border-t border-mist-100/10 pt-8">
            <p className="mb-4 font-mono text-[11px] tracking-[0.22em] text-mist-500 uppercase">
              Share this article
            </p>
            <ShareButtons title={post.title} />
          </div>
        </Container>

        {related.length > 0 ? (
          <Container className="mt-20 lg:mt-28">
            <div className="mb-8 flex items-end justify-between">
              <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-mist-100 sm:text-4xl">
                Keep <span className="italic text-brand-400">reading</span>
              </h2>
              <Link
                href="/blog"
                className="font-mono text-[11px] tracking-[0.18em] text-mist-400 uppercase transition-colors hover:text-brand-300"
              >
                All articles
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.slug} post={item} />
              ))}
            </div>
          </Container>
        ) : null}

        <div className="mt-20 lg:mt-28">
          <CTA />
        </div>
      </article>
    </>
  );
}
