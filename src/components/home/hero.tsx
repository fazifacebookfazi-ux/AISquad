"use client";

import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { useGsap } from "@/components/motion/use-gsap";
import { gsap } from "@/components/motion/gsap";

const meta = [
  { label: "Studio", value: "Pakistan — working worldwide" },
  { label: "Focus", value: "Web · SaaS · AI integration" },
  { label: "Status", value: "Taking on new projects", accent: true },
];

export function Hero() {
  const ref = useGsap<HTMLElement>((root) => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from("[data-hero-eyebrow]", { y: 18, opacity: 0, duration: 0.9 }, 0.15)
      .from(
        "[data-hero-line] > span",
        { yPercent: 118, duration: 1.15, stagger: 0.13 },
        0.25,
      )
      .from("[data-hero-sub]", { y: 26, opacity: 0, duration: 1 }, 0.7)
      .from(
        "[data-hero-cta]",
        { y: 26, opacity: 0, duration: 1, stagger: 0.1 },
        0.82,
      )
      .from(
        "[data-hero-meta] > div",
        { y: 14, opacity: 0, duration: 0.8, stagger: 0.08 },
        1,
      );

    // Gentle parallax: backdrop drifts, content lifts and fades on scroll.
    gsap.to("[data-hero-bg]", {
      yPercent: 22,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    gsap.to("[data-hero-content]", {
      yPercent: -10,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Backdrop — restrained: construction grid, two soft glows. */}
      <div data-hero-bg aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_35%,black,transparent)]" />
        <div className="absolute -top-40 right-[-12%] size-[44rem] rounded-full bg-brand-500/10 blur-[160px]" />
        <div className="absolute bottom-[-25%] left-[-12%] size-[38rem] rounded-full bg-accent-500/[0.07] blur-[160px]" />
      </div>

      <Container className="relative">
        <div
          data-hero-content
          className="flex min-h-svh flex-col justify-center pt-32 pb-14"
        >
          <p
            data-hero-eyebrow
            className="flex items-center gap-4 font-mono text-[11px] tracking-[0.3em] text-mist-400 uppercase"
          >
            <span className="h-px w-10 bg-brand-400" />
            Design-led engineering studio
          </p>

          <h1 className="mt-9 font-display text-[clamp(3.2rem,9.5vw,8rem)] leading-[0.94] font-medium tracking-[-0.045em] text-balance text-mist-100">
            <span
              data-hero-line
              className="-mb-[0.1em] block overflow-hidden pb-[0.1em]"
            >
              <span className="block">Serious software,</span>
            </span>
            <span
              data-hero-line
              className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
            >
              <span className="block">
                <em className="text-brand-400">beautifully</em> built.
              </span>
            </span>
          </h1>

          <p
            data-hero-sub
            className="mt-9 max-w-[44ch] text-[1.05rem] leading-[1.7] text-mist-400"
          >
            AISquadX designs and ships websites, SaaS products and AI
            integrations for clients in the USA and Pakistan. Fixed prices,
            clear timelines — no theatre.
          </p>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink data-hero-cta href="/contact" size="lg">
              Start a project
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink data-hero-cta href="#work" size="lg" variant="secondary">
              Selected work
            </ButtonLink>
          </div>

          <dl
            data-hero-meta
            className="mt-16 grid grid-cols-1 gap-6 border-t border-mist-100/10 pt-7 sm:grid-cols-3 sm:gap-8"
          >
            {meta.map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <dt className="font-mono text-[10px] tracking-[0.24em] text-mist-500 uppercase">
                  {item.label}
                </dt>
                <dd
                  className={
                    item.accent
                      ? "text-sm font-medium text-brand-400"
                      : "text-sm text-mist-300"
                  }
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
