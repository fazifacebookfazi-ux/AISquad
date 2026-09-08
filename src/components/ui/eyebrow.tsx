import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-mist-100/10 bg-mist-100/[0.04] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-300",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-accent-400 shadow-[0_0_10px_2px_rgba(79,214,224,0.6)]" />
      {children}
    </span>
  );
}
