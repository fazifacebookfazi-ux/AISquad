"use client";

import { ButtonLink } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center gap-7 overflow-hidden px-6 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[30vw] leading-none font-black tracking-tight text-stroke-faint select-none sm:text-[20vw]"
      >
        !
      </span>
      <p className="relative inline-block -rotate-2 border-2 border-ink-950 bg-punch-400 px-3 py-1 font-mono text-[11px] font-black tracking-[0.22em] text-ink-950 uppercase">
        Error
      </p>
      <h1 className="relative font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-black tracking-[-0.03em] text-mist-100">
        Something failed on our side.
      </h1>
      <p className="relative max-w-md text-mist-400">
        Try again in a moment. If it keeps happening, email hello@aisquadx.tech.
      </p>
      <div className="relative flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center border-2 border-ink-950 bg-brand-400 px-6 font-mono text-[11px] font-black tracking-[0.18em] text-ink-950 uppercase transition-colors duration-300 hover:bg-brand-300"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="secondary">
          Home
        </ButtonLink>
      </div>
    </div>
  );
}
