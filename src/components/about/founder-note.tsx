import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function FounderNote() {
  return (
    <section className="border-y-2 border-mist-100/10 bg-ink-900/60 py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden border-2 border-brand-400/60 bg-ink-950 p-10 sm:p-14">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 right-6 font-display text-[8rem] leading-none font-black text-brand-400/15 select-none"
            >
              &ldquo;
            </span>
            <div className="relative flex max-w-3xl flex-col gap-8">
              <span className="inline-flex w-fit -rotate-1 border-2 border-ink-950 bg-brand-400 px-3 py-1 font-mono text-[10px] font-black tracking-[0.18em] text-ink-950 uppercase">
                A note from the founder
              </span>

              <p className="font-display text-xl leading-[1.5] font-medium tracking-[-0.02em] text-balance-pretty text-mist-100 sm:text-2xl sm:leading-[1.45]">
                &ldquo;I started this studio because I kept watching good ideas
                die in a queue. The tools exist now to build properly and build
                quickly — most people just haven&apos;t rewired how they work
                around them yet. That&apos;s the whole opportunity, and
                it&apos;s what we do here every day.&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 border-t-2 border-mist-100/10 pt-8">
                <span className="grid size-12 place-items-center bg-brand-400 font-mono text-[11px] font-black tracking-[0.12em] text-ink-950">
                  {site.founder.initials}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[15px] font-bold tracking-tight text-mist-100">
                    {site.founder.name}
                  </span>
                  <span className="text-xs text-mist-500">
                    {site.founder.role}, {site.name}
                  </span>
                </span>

                <a
                  href={`mailto:${site.email}`}
                  className="group ml-auto inline-flex items-center gap-1.5 border-b-2 border-brand-400 pb-0.5 text-sm font-bold text-mist-100 transition-colors hover:text-brand-400"
                >
                  Say hello
                  <ArrowUpRight className="size-4 text-brand-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
