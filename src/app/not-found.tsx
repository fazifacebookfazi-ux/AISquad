import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center gap-7 overflow-hidden px-6 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[38vw] leading-none font-black tracking-tight text-stroke-faint select-none sm:text-[26vw]"
      >
        404
      </span>
      <p className="relative inline-block -rotate-2 border-2 border-ink-950 bg-brand-400 px-3 py-1 font-mono text-[11px] font-black tracking-[0.22em] text-ink-950 uppercase">
        404
      </p>
      <h1 className="relative font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-black tracking-[-0.03em] text-mist-100">
        That page is not here.
      </h1>
      <p className="relative max-w-md text-mist-400">
        It may have moved, or the link is wrong. The work is still on the
        projects page.
      </p>
      <div className="relative flex flex-wrap justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          Projects
        </ButtonLink>
      </div>
      <Link
        href="/contact"
        className="relative text-sm font-bold text-mist-500 underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:text-brand-400"
      >
        Contact
      </Link>
    </div>
  );
}
