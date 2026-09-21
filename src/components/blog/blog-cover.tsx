import { cn } from "@/lib/utils";
import type { Post } from "@/lib/blog";

const STYLES: Record<string, { from: string; to: string; mark: string }> = {
  "web-development": { from: "#1d3307", to: "#060905", mark: "</>" },
  "ai-automation": { from: "#2e0f42", to: "#080510", mark: "AI" },
  "saas-startups": { from: "#0b2a4a", to: "#05080e", mark: "SaaS" },
  "ui-ux-design": { from: "#3d1c08", to: "#0d0705", mark: "Aa" },
  "tech-news": { from: "#3a1030", to: "#0d050b", mark: "01" },
  "digital-growth": { from: "#083a2c", to: "#040c09", mark: "%" },
};

const FALLBACK = { from: "#1c1a17", to: "#080706", mark: "✳" };

/**
 * Pure CSS/SVG cover art — no external images, no hotlinking.
 * Decorative only: the surrounding card/page owns the real heading.
 */
export function BlogCover({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  const style = STYLES[post.categorySlug] ?? FALLBACK;

  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(140deg, ${style.from} 0%, ${style.to} 78%)`,
        }}
      />
      <div
        className="absolute -top-1/4 -right-1/5 size-[65%] rounded-full opacity-45 blur-3xl"
        style={{ backgroundColor: style.from }}
      />
      <div className="absolute inset-0 bg-grid opacity-25 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

      {/* Oversized typographic mark */}
      <span className="absolute -right-3 -bottom-8 font-display text-[9rem] leading-none font-semibold tracking-tight text-white/[0.09] select-none sm:text-[11rem]">
        {style.mark}
      </span>

      {/* Foreground copy */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-white/85 uppercase backdrop-blur-sm">
            {post.category}
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase">
            AISquadX
          </span>
        </div>
        <div>
          <span className="block max-w-[26ch] font-display text-[1.45rem] leading-[1.08] font-semibold tracking-[-0.03em] text-white text-balance sm:text-[1.9rem]">
            {post.title}
          </span>
          <span className="mt-3 block font-mono text-[11px] tracking-[0.14em] text-white/55 uppercase">
            {post.readingTime} min read
          </span>
        </div>
      </div>
    </div>
  );
}
