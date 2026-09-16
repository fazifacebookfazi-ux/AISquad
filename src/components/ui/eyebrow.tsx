import { cn } from "@/lib/utils";

/**
 * Sticker badge — the signature kicker. Slightly rotated, high contrast.
 */
export function Eyebrow({
  children,
  className,
  tone = "lime",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "lime" | "ink" | "punch";
}) {
  return (
    <span
      className={cn(
        "inline-flex -rotate-1 items-center border-2 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em]",
        tone === "lime" && "border-ink-950 bg-brand-400 text-ink-950",
        tone === "ink" && "border-brand-400 bg-ink-950 text-brand-400",
        tone === "punch" && "border-ink-950 bg-punch-400 text-ink-950",
        className,
      )}
    >
      {children}
    </span>
  );
}
