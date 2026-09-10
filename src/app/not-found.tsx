import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-[11px] tracking-[0.22em] text-mist-500 uppercase">
        404
      </p>
      <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] tracking-tight text-mist-100">
        That page is not here.
      </h1>
      <p className="max-w-md text-mist-400">
        It may have moved, or the link is wrong. The work is still on the
        projects page.
      </p>
      <div className="flex gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          Projects
        </ButtonLink>
      </div>
      <Link href="/contact" className="text-sm text-mist-500 hover:text-mist-100">
        Contact
      </Link>
    </div>
  );
}
