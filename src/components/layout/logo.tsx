import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="AISquadX home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-[11px] bg-gradient-to-br from-brand-400 via-brand-500 to-accent-500 shadow-[0_8px_24px_-8px_rgba(91,99,245,0.9)] transition-transform duration-500 ease-out-expo group-hover:scale-105">
        <span className="absolute inset-px rounded-[10px] bg-ink-950/85" />
        <span className="relative font-display text-[15px] font-bold tracking-tight text-mist-100">
          X
        </span>
      </span>
      <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-mist-100">
        AISquad<span className="text-brand-300">X</span>
      </span>
    </Link>
  );
}
