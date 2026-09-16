import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-mist-100/10">
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.07] blur-[180px]"
      />
      <Container className="relative py-28 lg:py-44">
        <Reveal className="flex flex-col items-center text-center">
          <p className="font-mono text-[11px] tracking-[0.3em] text-mist-400 uppercase">
            <span className="mr-4 inline-block h-px w-10 bg-brand-400 align-middle" />
            Next
            <span className="ml-4 inline-block h-px w-10 bg-brand-400 align-middle" />
          </p>
          <h2 className="mt-8 max-w-5xl font-display text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.96] font-medium tracking-[-0.045em] text-balance text-mist-100">
            Tell us what you&apos;re{" "}
            <span className="text-brand-400 italic">building.</span>
          </h2>
          <p className="mt-8 max-w-[46ch] text-base leading-relaxed text-mist-400 lg:text-lg">
            A plan, a timeline and a fixed price within a day. Nothing starts
            until you agree to it.
          </p>
          <div className="mt-11 flex w-full flex-col gap-3 sm:w-auto sm:min-w-[22rem]">
            <ButtonLink href="/contact" size="lg" className="w-full">
              Start a project
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.email}`}
              size="lg"
              variant="secondary"
              className="w-full"
            >
              {site.email}
              <ArrowUpRight className="size-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
