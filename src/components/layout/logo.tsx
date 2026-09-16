import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="AISquadX home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span className="grid size-9 place-items-center bg-brand-400 font-mono text-[12px] font-black tracking-tight text-ink-950 transition-transform duration-300 group-hover:-rotate-6">
        AX
      </span>
      <span className="font-display text-[1.4rem] leading-none font-black tracking-tight text-mist-100">
        AISquadX
      </span>
    </Link>
  );
}
