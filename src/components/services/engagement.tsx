import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { engagementTiers } from "@/lib/services";
import { cn } from "@/lib/utils";

export function Engagement() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 border-y border-mist-100/[0.07] bg-ink-900/40 py-24 lg:py-32"
    >
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto items-center"
          eyebrow="Ways to work together"
          title={
            <>
              Three shapes of{" "}
              <span className="italic text-brand-400">
                collaboration
              </span>
            </>
          }
          description="Every engagement starts with a call and ends with a fixed quote you agree to before we write a line of code."
        />

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {engagementTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-all duration-500 ease-out-expo hover:-translate-y-1",
                  tier.featured
                    ? "border border-brand-400/30 bg-ink-850 shadow-[0_30px_80px_-40px_rgba(91,99,245,0.7)] lg:-mt-4 lg:pt-12"
                    : "surface hover:border-mist-100/15",
                )}
              >
                {tier.featured ? (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-32 left-1/2 size-80 -translate-x-1/2 rounded-full bg-brand-500/20 blur-[100px]"
                    />
                    <span className="absolute top-5 right-5 rounded-full bg-brand-500/20 px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-brand-300 uppercase">
                      Most popular
                    </span>
                  </>
                ) : null}

                <div className="relative">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-mist-100">
                    {tier.name}
                  </h3>
                  <p className="mt-5 font-display text-3xl font-semibold tracking-[-0.03em] text-mist-100">
                    {tier.duration}
                  </p>
                  <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-mist-500 uppercase">
                    {tier.terms}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-mist-400">
                    {tier.summary}
                  </p>

                  <ul className="mt-8 flex flex-col gap-3.5 border-t border-mist-100/[0.07] pt-8">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                          <Check className="size-3" strokeWidth={2.5} />
                        </span>
                        <span className="text-sm leading-relaxed text-mist-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-auto pt-9">
                  <ButtonLink
                    href="/contact"
                    variant={tier.featured ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Get a quote
                    <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-mist-500">
            Not sure which fits?{" "}
            <a
              href="/contact"
              className="text-mist-300 underline decoration-mist-100/20 underline-offset-4 transition-colors hover:text-mist-100 hover:decoration-brand-400"
            >
              Describe the project
            </a>{" "}
            and we&apos;ll recommend the right shape.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
