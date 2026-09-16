import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/lib/site";

/**
 * Full-bleed lime CTA — the loudest moment on every page.
 */
export function CTA() {
  return (
    <section className="relative overflow-hidden border-y-4 border-ink-950 bg-brand-400">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-dark opacity-60" />
        <span className="absolute -bottom-10 left-0 font-display text-[22vw] leading-none font-black tracking-tight whitespace-nowrap text-ink-950/[0.06] select-none">
          LET&apos;S BUILD
        </span>
      </div>
      <Container className="relative py-20 lg:py-28">
        <div className="flex flex-col items-start gap-8">
          <Reveal>
            <Eyebrow tone="ink">Next step</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="max-w-4xl font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] font-black tracking-[-0.03em] text-balance-pretty text-ink-950">
              Tell us what you&apos;re building.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="max-w-xl text-base leading-relaxed font-medium text-ink-950/75 sm:text-lg">
              A plan, a timeline and a fixed price within a day. Nothing
              starts until you agree to it.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/contact" size="lg" variant="ink">
                Start a project
                <ArrowUpRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href={`mailto:${site.email}`}
                size="lg"
                variant="secondary"
                className="border-ink-950/30 text-ink-950 hover:border-ink-950 after:bg-ink-950 hover:text-brand-400"
              >
                {site.email}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
