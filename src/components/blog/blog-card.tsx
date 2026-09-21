import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { BlogCover } from "./blog-cover";
import type { Post } from "@/lib/blog";

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group surface flex flex-col overflow-hidden transition-transform duration-300 ease-out-expo hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
          />
        ) : (
          <BlogCover
            post={post}
            className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-[1.35rem] leading-[1.15] font-semibold tracking-[-0.02em] text-mist-100 text-balance">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-[0.95rem] leading-relaxed text-mist-400">
          {post.description}
        </p>
        <div className="mt-auto flex items-center gap-4 pt-2 font-mono text-[11px] tracking-[0.08em] text-mist-500 uppercase">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {post.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}
