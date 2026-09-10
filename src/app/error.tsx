"use client";

import { ButtonLink } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.22em] text-mist-500 uppercase">
        Error
      </p>
      <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-mist-100">
        Something failed on our side.
      </h1>
      <p className="max-w-md text-mist-400">
        Try again in a moment. If it keeps happening, email hello@aisquadx.tech.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center bg-brand-400 px-6 font-mono text-[11px] tracking-[0.18em] text-ink-950 uppercase"
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
