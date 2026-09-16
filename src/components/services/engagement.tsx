import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { engagementTiers } from "@/lib/services";
import { cn } from "@/lib/utils";

export function Engagement() {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 border-y-2 border-mist-100/10 bg-ink-900/60 py-24 lg:py-32"
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

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-3">
          {engagementTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col border-2 p-8 transition-all duration-300 hover:-translate-y-1.5",
                  tier.featured
                    ? "border-ink-950 bg-brand-400 shadow-[10px_10px_0_0_rgba(212,255,58,0.25)] lg:-mt-4 lg:pt-12"
                    : "border-mist-100/15 bg-ink-950 hover:border-brand-400",
                )}
              >
                {tier.featured ? (
                  <span className="absolute -top-4 right-6 -rotate-2 border-2 border-ink-950 bg-ink-950 px-3 py-1 font-mono text-[10px] font-black tracking-[0.14em] text-brand-400 uppercase">
                    Most popular
                  </span>
                ) : null}

                <div className="relative">
                  <h3
                    className={cn(
                      "font-display text-lg font-black tracking-tight",
                      tier.featured ? "text-ink-950" : "text-mist-100",
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-5 font-display text-3xl font-black tracking-[-0.03em]",
                      tier.featured ? "text-ink-950" : "text-mist-100",
                    )}
                  >
                    {tier.duration}
                  </p>
                  <p
                    className={cn(
                      "mt-2 font-mono text-[11px] font-bold tracking-[0.12em] uppercase",
                      tier.featured ? "text-ink-950/70" : "text-mist-500",
                    )}
                  >
                    {tier.terms}
                  </p>
                  <p
                    className={cn(
                      "mt-5 text-sm leading-relaxed",
                      tier.featured ? "text-ink-950/75" : "text-mist-400",
                    )}
                  >
                    {tier.summary}
                  </p>

                  <ul
                    className={cn(
                      "mt-8 flex flex-col gap-3.5 border-t-2 pt-8",
                      tier.featured ? "border-ink-950/20" : "border-mist-100/10",
                    )}
                  >
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className={cn(
                            "mt-0.5 grid size-5 shrink-0 place-items-center",
                            tier.featured
                              ? "bg-ink-950 text-brand-400"
                              : "bg-brand-400 text-ink-950",
                          )}
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span
                          className={cn(
                            "text-sm leading-relaxed",
                            tier.featured ? "text-ink-950/85" : "text-mist-300",
                          )}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative mt-auto pt-9">
                  <ButtonLink
                    href="/contact"
                    variant={tier.featured ? "ink" : "secondary"}
                    className={cn(
                      "w-full",
                      !tier.featured && "border-mist-100/20 text-mist-100 hover:border-brand-400",
                    )}
                  >
                    Get a quote
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
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
              className="text-mist-300 underline decoration-brand-400 decoration-2 underline-offset-4 transition-colors hover:text-brand-400"
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
