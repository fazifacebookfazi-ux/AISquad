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
        "inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-mist-400",
        className,
      )}
    >
      <span className="h-px w-8 bg-brand-400" />
      {children}
    </span>
  );
}
