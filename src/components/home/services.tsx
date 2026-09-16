"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useGsap } from "@/components/motion/use-gsap";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { serviceDetails } from "@/lib/services";

export function Services() {
  const ref = useGsap<HTMLElement>(() => {
    gsap.set("[data-service-row]", { y: 36, opacity: 0 });
    ScrollTrigger.batch("[data-service-row]", {
      start: "top 90%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.09,
          ease: "expo.out",
          overwrite: true,
        }),
    });
  });

  return (
    <section
      ref={ref}
      id="services"
      className="relative scroll-mt-24 py-24 lg:py-36"
    >
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                Design and code,{" "}
                <span className="text-brand-400 italic">same desk.</span>
              </>
            }
            description="Strategy, interface and engineering in one studio — so the look is never an afterthought on a backlog."
          />
          <p className="max-w-xs shrink-0 font-mono text-[11px] leading-relaxed tracking-[0.14em] text-mist-500 uppercase lg:pb-2 lg:text-right">
            Six offerings.
            <br />
            Fixed prices, clear timelines.
          </p>
        </div>

        <ul className="mt-14 border-t border-mist-100/12 lg:mt-20">
          {serviceDetails.map((service, i) => (
            <li key={service.id} data-service-row>
              <Link
                href={`/services#${service.id}`}
                className="group grid gap-3 border-b border-mist-100/12 py-8 transition-colors duration-300 hover:bg-mist-100/[0.025] sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-10 sm:py-10 lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)_auto]"
              >
                <span className="font-mono text-[11px] tracking-[0.24em] text-brand-400">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="block">
                  <span className="block font-display text-[1.9rem] leading-[1.05] font-medium tracking-[-0.03em] text-mist-100 italic transition-transform duration-500 ease-out-expo group-hover:translate-x-2 sm:text-4xl lg:text-[2.6rem]">
                    {service.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-sm leading-relaxed text-mist-400">
                    {service.tagline} — {service.timeline.toLowerCase()},{" "}
                    {service.engagement.toLowerCase()}.
                  </span>
                </span>

                <span className="hidden flex-col gap-1.5 lg:flex">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-mist-500 uppercase">
                    {service.stack.slice(0, 3).join(" · ")}
                  </span>
                </span>

                <span className="grid size-12 place-items-center border border-mist-100/15 transition-all duration-300 ease-out-expo group-hover:border-brand-400 group-hover:bg-brand-400">
                  <ArrowUpRight className="size-5 text-mist-300 transition-all duration-300 ease-out-expo group-hover:text-ink-950" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
