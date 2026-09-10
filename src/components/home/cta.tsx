import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="border-t border-mist-100/10">
      <Container className="py-24 lg:py-32">
        <Reveal>
          <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <p className="font-mono text-[11px] tracking-[0.22em] text-mist-500 uppercase">
                Next
              </p>
              <h2 className="mt-6 max-w-3xl font-display text-[12vw] leading-[0.9] tracking-[-0.04em] text-mist-100 sm:text-7xl lg:text-[5rem]">
                Tell us what you&apos;re{" "}
                <span className="italic text-brand-400">building.</span>
              </h2>
              <p className="mt-8 max-w-[42ch] text-base leading-relaxed text-mist-400">
                A plan, a timeline and a fixed price within a day. Nothing
                starts until you agree to it.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href="/contact" size="lg" className="w-full">
                Start a project
                <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href={`mailto:${site.email}`}
                size="lg"
                variant="secondary"
                className="w-full"
              >
                {site.email}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
