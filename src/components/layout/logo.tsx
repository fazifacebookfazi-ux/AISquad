import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="AISquadX home"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span
        aria-hidden
        className="grid size-8 place-items-center rounded-lg bg-accent font-display text-sm font-bold text-white transition-transform duration-300 ease-out-expo group-hover:rotate-[-8deg]"
      >
        A
      </span>
      <span
        className={cn(
          "font-display text-xl font-bold tracking-[-0.03em]",
          light ? "text-paper" : "text-ink",
        )}
      >
        AISquadX
      </span>
    </Link>
  );
}
