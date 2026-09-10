import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="AISquadX home"
      className={cn("group inline-flex items-baseline gap-2", className)}
    >
      <span className="font-mono text-[11px] tracking-[0.22em] text-brand-400">
        AX
      </span>
      <span className="font-display text-[1.35rem] leading-none tracking-tight text-mist-100 italic">
        AISquadX
      </span>
    </Link>
  );
}
