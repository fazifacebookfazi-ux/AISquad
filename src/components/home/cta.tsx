import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { site } from "@/lib/site";

export function CTA() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-900 px-8 py-20 text-center sm:px-16">
            <div aria-hidden className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
              <div className="animate-aurora absolute -bottom-40 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-brand-500/25 blur-[130px]" />
              <div className="animate-aurora absolute -top-32 right-1/4 size-[22rem] rounded-full bg-accent-500/15 blur-[120px] [animation-delay:-8s]" />
            </div>

            <div className="relative flex flex-col items-center">
              <Eyebrow>Let&apos;s build</Eyebrow>

              <h2 className="mt-7 max-w-3xl font-display text-[2.1rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance-pretty text-mist-100 sm:text-5xl lg:text-[3.5rem]">
                Have an idea? Let&apos;s turn it into{" "}
                <span className="text-gradient">something real</span>
                <span className="font-serif text-brand-300 italic">.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-balance-pretty text-mist-400">
                Tell us what you&apos;re building. We&apos;ll come back within a
                day with a plan, a timeline and a fixed price.
              </p>

              <div className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
                <ButtonLink href="/contact" size="lg" className="w-full sm:w-auto">
                  Start a project
                  <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${site.email}`}
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {site.email}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
