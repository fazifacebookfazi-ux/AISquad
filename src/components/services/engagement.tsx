import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { engagementTiers } from "@/lib/services";
import { cn } from "@/lib/utils";

export function Engagement() {
  return (
    <section id="pricing" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto items-center text-center"
          eyebrow="Ways to work together"
          title={
            <>
              Three shapes of <span className="text-accent">collaboration.</span>
            </>
          }
          description="Every engagement starts with a call and ends with a fixed quote you agree to before we write a line of code."
        />

        <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
          {engagementTiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-[28px] p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10",
                  tier.featured
                    ? "bg-ink text-paper shadow-[0_30px_80px_-30px_rgba(20,20,18,0.5)]"
                    : "card",
                )}
              >
                {tier.featured ? (
                  <span className="absolute top-6 right-6 rounded-full bg-accent px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-white uppercase">
                    Most popular
                  </span>
                ) : null}

                <h3
                  className={cn(
                    "font-display text-xl font-bold tracking-[-0.02em]",
                    tier.featured ? "text-paper" : "text-ink",
                  )}
                >
                  {tier.name}
                </h3>
                <p
                  className={cn(
                    "display mt-4 text-4xl",
                    tier.featured ? "text-paper" : "text-ink",
                  )}
                >
                  {tier.duration}
                </p>
                <p
                  className={cn(
                    "mt-2 font-mono text-[11px] tracking-[0.14em] uppercase",
                    tier.featured ? "text-paper/50" : "text-mute",
                  )}
                >
                  {tier.terms}
                </p>
                <p
                  className={cn(
                    "mt-5 text-[15px] leading-relaxed",
                    tier.featured ? "text-paper/65" : "text-ink-soft/70",
                  )}
                >
                  {tier.summary}
                </p>

                <ul
                  className={cn(
                    "mt-8 flex flex-col gap-3.5 border-t pt-8",
                    tier.featured ? "border-paper/15" : "border-ink/10",
                  )}
                >
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          tier.featured
                            ? "bg-accent text-white"
                            : "bg-accent/10 text-accent",
                        )}
                      >
                        <Check className="size-3" strokeWidth={2.5} />
                      </span>
                      <span
                        className={cn(
                          "text-[15px] leading-relaxed",
                          tier.featured ? "text-paper/75" : "text-ink-soft/80",
                        )}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-9">
                  <Link
                    href="/contact"
                    className={cn(
                      "group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display text-[15px] font-semibold transition-colors duration-300",
                      tier.featured
                        ? "bg-accent text-white hover:bg-accent-deep"
                        : "bg-ink text-paper hover:bg-accent",
                    )}
                  >
                    Get a quote
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-[15px] text-ink-soft/65">
            Not sure which fits?{" "}
            <Link href="/contact" className="font-semibold text-accent link-sweep">
              Describe the project
            </Link>{" "}
            and we&apos;ll recommend the right shape.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
