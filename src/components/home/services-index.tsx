"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { registerGsap, prefersReducedMotion } from "@/components/motion/gsap-setup";
import { serviceDetails } from "@/lib/services";
import { cn } from "@/lib/utils";

const tileTints = [
  "linear-gradient(135deg,#2e3bff,#7a86ff)",
  "linear-gradient(135deg,#141412,#4a4a44)",
  "linear-gradient(135deg,#5b63f5,#22c1cf)",
  "linear-gradient(135deg,#2e3bff,#141412)",
  "linear-gradient(135deg,#7c5cff,#2e3bff)",
  "linear-gradient(135deg,#3b82f6,#22c1cf)",
];

export function ServicesIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview || prefersReducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const { gsap } = registerGsap();

    const xTo = gsap.quickTo(preview, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const preview = previewRef.current;
    if (!preview || prefersReducedMotion()) return;
    const { gsap } = registerGsap();
    gsap.to(preview, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.85 : 1,
      rotate: active === null ? -6 : 0,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <section ref={sectionRef} id="services" className="relative scroll-mt-24 py-24 lg:py-36">
      {/* Floating cursor preview (desktop) */}
      <div
        ref={previewRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 hidden opacity-0 lg:block"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="relative h-56 w-72 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-2xl">
          {serviceDetails.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "absolute inset-0 grid place-items-center transition-opacity duration-300",
                active === i ? "opacity-100" : "opacity-0",
              )}
              style={{ background: tileTints[i % tileTints.length] }}
            >
              <s.icon className="size-16 text-white/90" strokeWidth={1.2} />
              <span className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.18em] text-white/80 uppercase">
                {s.timeline}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-5 max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)] text-ink">
                Six ways to <span className="text-accent">ship.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link href="/services" className="link-sweep font-display text-base font-semibold text-ink">
              All services, in detail
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-ink/12">
          {serviceDetails.map((service, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={service.id} y={24}>
                <div
                  className="group border-b border-ink/12"
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center gap-5 py-7 text-left sm:gap-8"
                  >
                    <span className="font-mono text-xs text-mute tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="display block text-[clamp(1.6rem,3.6vw,2.8rem)] text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent">
                        {service.title}
                      </span>
                      <span className="mt-1.5 block text-[15px] text-ink-soft/65">
                        {service.tagline}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-300",
                        "group-hover:border-accent group-hover:bg-accent group-hover:text-white",
                        isOpen && "rotate-45 border-accent bg-accent text-white",
                      )}
                    >
                      <Plus className="size-5" />
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-6 pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
                        <p className="max-w-2xl leading-relaxed text-ink-soft/75">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                          <span className="font-mono text-[11px] tracking-[0.14em] text-mute uppercase">
                            {service.timeline}
                          </span>
                          <Link
                            href={`/services#${service.id}`}
                            className="inline-flex items-center gap-1.5 font-display text-[15px] font-semibold text-accent"
                          >
                            Full details
                            <ArrowUpRight className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
