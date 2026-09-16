import { cn } from "@/lib/utils";

const items = [
  "Web development",
  "SaaS builds",
  "AI integration",
  "Vibe coding",
  "UI/UX design",
  "Next.js",
];

/** Full-bleed blue marquee divider. */
export function MarqueeBand({ className }: { className?: string }) {
  const row = [...items, ...items];
  return (
    <section
      aria-hidden
      className={cn("overflow-hidden bg-accent py-5", className)}
    >
      <div className="marquee-track fast items-center gap-10 pr-10">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-xl font-semibold tracking-[-0.01em] whitespace-nowrap text-white">
                  {item}
                </span>
                <span className="size-2 rounded-full bg-white/60" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
