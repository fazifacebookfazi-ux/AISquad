"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/magnetic";
import { LineReveal } from "@/components/motion/text-fx";
import { registerGsap, prefersReducedMotion } from "@/components/motion/gsap-setup";
import { ProjectCover } from "@/components/project-cover";
import { projects } from "@/lib/projects";

function Chip({ index }: { index: number }) {
  const project = projects[index % projects.length];
  return (
    <span
      aria-hidden
      className="animate-float-y mx-[0.08em] inline-block h-[0.72em] w-[1.6em] overflow-hidden rounded-full align-[-0.06em]"
      style={{ animationDelay: `${index * 0.9}s` }}
    >
      <span className="relative block h-full w-full">
        <ProjectCover project={project} sizes="320px" />
      </span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      gsap.to("[data-hero-fade]", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-meta]", {
        y: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "45% top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 sm:pt-44">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_20%,black,transparent)]" />
      </div>

      <Container className="relative">
        <div data-hero-fade>
          <LineReveal>
            <h1 className="display text-[clamp(3.2rem,11vw,10rem)] text-ink">
              <span data-reveal-line>
                <span>
                  We make <Chip index={0} />
                </span>
              </span>
              <span data-reveal-line>
                <span>
                  software <Chip index={1} />
                </span>
              </span>
              <span data-reveal-line>
                <span>
                  you can <span className="text-accent">feel.</span>
                </span>
              </span>
            </h1>
          </LineReveal>
        </div>

        <div
          data-hero-meta
          className="mt-12 grid gap-10 border-t border-ink/12 pt-8 pb-20 sm:pb-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16"
        >
          <div>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink-soft/80">
              AISquadX is a small engineering studio. We typeset interfaces,
              write the code that runs them, and ship websites, SaaS and tools
              you can put in front of a customer.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-display text-base font-semibold text-paper transition-colors duration-300 hover:bg-accent"
                >
                  Start a project
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
              <Link
                href="/projects"
                className="link-sweep font-display text-base font-semibold text-ink"
              >
                See the work
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-6 lg:justify-items-end">
            {[
              { k: "Studio", v: "Pakistan" },
              { k: "Clients", v: "USA · PK" },
              { k: "Status", v: "Booking now" },
            ].map((item) => (
              <div key={item.k} className="flex flex-col gap-1.5">
                <dt className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  {item.k}
                </dt>
                <dd className="font-display text-lg font-semibold tracking-[-0.01em] text-ink">
                  {item.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <div aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
        <span className="flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink/60">
          <ArrowDown className="size-4 animate-bounce" />
        </span>
      </div>
    </section>
  );
}
