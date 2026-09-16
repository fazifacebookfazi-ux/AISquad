import { cn } from "@/lib/utils";

/** Small mono label with a blue dot — the section kicker. */
export function Eyebrow({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase",
        light ? "text-paper/70" : "text-mute",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </p>
  );
}
