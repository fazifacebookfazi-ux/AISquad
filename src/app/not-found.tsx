import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[75vh] flex-col items-start justify-center gap-6 py-24">
      <p className="font-mono text-[11px] tracking-[0.22em] text-mute uppercase">
        404 — Not found
      </p>
      <h1 className="display max-w-3xl text-[clamp(3rem,8vw,6.5rem)] text-ink">
        That page <span className="text-stroke">isn&apos;t here.</span>
      </h1>
      <p className="max-w-md text-lg leading-relaxed text-ink-soft/70">
        It may have moved, or the link is wrong. The work is still on the
        projects page.
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/projects" variant="dark">
          Projects
        </ButtonLink>
      </div>
      <Link href="/contact" className="link-sweep text-[15px] font-medium text-ink-soft/70">
        Or just say hello
      </Link>
    </Container>
  );
}
