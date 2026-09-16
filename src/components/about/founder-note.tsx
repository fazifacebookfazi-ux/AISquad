import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function FounderNote() {
  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-ink p-10 text-paper sm:p-14 lg:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-accent/30 blur-[120px]"
            />
            <div className="relative flex max-w-3xl flex-col gap-8">
              <span className="font-mono text-[11px] tracking-[0.22em] text-paper/50 uppercase">
                A note from the founder
              </span>

              <p className="display max-w-3xl text-[clamp(1.4rem,2.8vw,2rem)] text-paper">
                &ldquo;I started this studio because I kept watching good ideas
                die in a queue. The tools exist now to build properly and build
                quickly — most people just haven&apos;t rewired how they work
                around them yet. That&apos;s the whole opportunity, and
                it&apos;s what we do here every day.&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 border-t border-paper/15 pt-8">
                <span className="grid size-12 place-items-center rounded-full bg-accent font-display text-sm font-bold text-white">
                  {site.founder.initials}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-base font-bold tracking-[-0.01em] text-paper">
                    {site.founder.name}
                  </span>
                  <span className="text-sm text-paper/55">
                    {site.founder.role}, {site.name}
                  </span>
                </span>

                <a
                  href={`mailto:${site.email}`}
                  className="group ml-auto inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-paper"
                >
                  <span className="link-sweep">Say hello</span>
                  <ArrowUpRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
