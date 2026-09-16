"use client";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center gap-6 py-24">
      <p className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
        Error
      </p>
      <h1 className="display max-w-3xl text-[clamp(2.6rem,6vw,5rem)] text-ink">
        Something failed <span className="text-accent">on our side.</span>
      </h1>
      <p className="max-w-md text-lg leading-relaxed text-ink-soft/70">
        Try again in a moment. If it keeps happening, email hello@aisquadx.tech.
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-13 items-center rounded-full bg-accent px-7 font-display text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep"
        >
          Try again
        </button>
        <ButtonLink href="/" variant="dark">
          Home
        </ButtonLink>
      </div>
    </Container>
  );
}
