"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { projects } from "@/lib/projects";

const meta = [
  { k: "Base", v: "Pakistan" },
  { k: "Serving", v: "USA & Pakistan" },
  { k: "Reply time", v: "< 1 day" },
];

/**
 * Bold hero — one vibrant gradient moment, giant statement headline,
 * staged GSAP entrance, parallax drift on scroll.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(
        "[data-hero='bg']",
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6 },
        0,
      )
        .fromTo(
          "[data-hero='sticker']",
          { scale: 0, rotate: -18 },
          { scale: 1, rotate: -2, duration: 0.7, ease: "back.out(1.8)" },
          0.15,
        )
        .fromTo(
          "[data-hero='line']",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, stagger: 0.12 },
          0.25,
        )
        .fromTo(
          "[data-hero='fade']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          0.7,
        );

      // Parallax drift as you scroll away.
      gsap.to("[data-hero='bg']", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero='content']", {
        yPercent: -10,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative flex min-h-svh flex-col overflow-hidden">
      {/* Vibrant gradient moment */}
      <div aria-hidden data-hero="bg" className="absolute inset-0">
        <div className="absolute inset-0 bg-ink-950" />
        <div className="absolute -top-[20%] left-[8%] size-[55vmax] rounded-full bg-brand-500/45 blur-[110px]" />
        <div className="absolute top-[30%] right-[-10%] size-[48vmax] rounded-full bg-punch-500/35 blur-[120px]" />
        <div className="absolute bottom-[-25%] left-[30%] size-[50vmax] rounded-full bg-[#5b63f5]/30 blur-[130px]" />
        <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-transparent to-ink-950" />
      </div>

      <Container className="relative flex flex-1 flex-col justify-center pt-36 pb-16">
        <div data-hero="content" className="flex flex-col items-start gap-8">
          <span data-hero="sticker">
            <Eyebrow tone="lime">
              <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-ink-950" />
              Available for new projects
            </Eyebrow>
          </span>

          <h1 className="max-w-6xl font-display text-[clamp(3.2rem,10vw,9rem)] leading-[0.92] font-black tracking-[-0.035em] text-balance-pretty text-mist-50">
            <span className="block overflow-hidden pb-1">
              <span data-hero="line" className="block">
                We build <em className="text-brand-400 not-italic underline decoration-brand-400/60 decoration-[0.06em] underline-offset-[0.12em]">bold</em>
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero="line" className="block">
                software that <span className="italic text-brand-300">ships.</span>
              </span>
            </span>
          </h1>

          <p
            data-hero="fade"
            className="max-w-xl border-l-4 border-brand-400 pl-5 text-base leading-relaxed text-mist-100/85 sm:text-lg"
          >
            AISquadX is a design-led engineering studio crafting websites,
            SaaS products and AI integrations for clients in the USA and
            Pakistan — fixed prices, clear timelines.
          </p>

          <div data-hero="fade" className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Start a project
              <ArrowUpRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/projects" size="lg" variant="secondary">
              See the work
            </ButtonLink>
          </div>

          <dl
            data-hero="fade"
            className="mt-4 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden border-2 border-mist-100/15 bg-mist-100/10"
          >
            {meta.map((m) => (
              <div key={m.k} className="flex flex-col gap-1 bg-ink-950/80 px-5 py-4 backdrop-blur-sm">
                <dt className="font-mono text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                  {m.k}
                </dt>
                <dd className="font-display text-base font-bold tracking-tight text-mist-100 sm:text-lg">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* Scroll cue + featured strip */}
      <div className="relative border-t-2 border-mist-100/10 bg-ink-950/70 backdrop-blur-sm">
        <Container className="flex items-center justify-between py-4">
          <span className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-[0.18em] text-mist-500 uppercase">
            <ArrowDown className="size-4 animate-bounce text-brand-400" />
            Scroll
          </span>
          <p className="hidden font-mono text-[11px] tracking-[0.14em] text-mist-500 uppercase sm:block">
            Featured —{" "}
            {projects
              .filter((p) => p.featured)
              .map((p) => p.title)
              .join(" · ")}
          </p>
          <Link
            href="#work"
            className="font-mono text-[11px] font-bold tracking-[0.18em] text-brand-400 uppercase hover:text-brand-300"
          >
            The work ↓
          </Link>
        </Container>
      </div>
    </section>
  );
}
