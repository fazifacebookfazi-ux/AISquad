import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function FounderNote() {
  return (
    <section className="border-y border-mist-100/[0.07] bg-ink-900/40 py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl surface p-10 sm:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 -right-20 size-96 rounded-full bg-brand-500/12 blur-[120px]"
            />

            <div className="relative flex max-w-3xl flex-col gap-8">
              <span className="font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">
                A note from the founder
              </span>

              <p className="font-display text-xl leading-[1.5] font-medium tracking-[-0.02em] text-balance-pretty text-mist-100 sm:text-2xl sm:leading-[1.45]">
                &ldquo;I started this studio because I kept watching good ideas
                die in a queue. The tools exist now to build properly and build
                quickly — most people just haven&apos;t rewired how they work
                around them yet. That&apos;s the whole opportunity, and
                it&apos;s what we do here every day.&rdquo;
              </p>

              <div className="flex flex-wrap items-center gap-4 border-t border-mist-100/[0.07] pt-8">
                <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-accent-500 font-display text-sm font-semibold text-ink-950">
                  {site.founder.initials}
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-[15px] font-semibold tracking-tight text-mist-100">
                    {site.founder.name}
                  </span>
                  <span className="text-xs text-mist-500">
                    {site.founder.role}, {site.name}
                  </span>
                </span>

                <a
                  href={`mailto:${site.email}`}
                  className="group ml-auto inline-flex items-center gap-1.5 text-sm text-mist-400 transition-colors hover:text-mist-100"
                >
                  Say hello
                  <ArrowUpRight className="size-4 text-brand-300 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
