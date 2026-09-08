"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

const stats = [
  { value: "40+", label: "Products shipped" },
  { value: "3 wks", label: "Average MVP launch" },
  { value: "100%", label: "Client retention" },
];

export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 lg:pt-52 lg:pb-28">
      {/* Ambient backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        <div className="animate-aurora absolute -top-52 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-brand-500/22 blur-[150px]" />
        <div className="animate-aurora absolute -top-24 right-[8%] size-[26rem] rounded-full bg-accent-500/14 blur-[130px] [animation-delay:-6s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <Container className="relative">
        <div className="flex flex-col items-center text-center">
          <motion.div {...rise(0)}>
            <a
              href="#services"
              className="group inline-flex items-center gap-2.5 rounded-full border border-mist-100/10 bg-mist-100/[0.04] py-1.5 pr-2 pl-3 text-[13px] text-mist-300 backdrop-blur transition-colors hover:border-brand-400/40 hover:text-mist-100"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent-400" />
              </span>
              Available for new projects
              <span className="rounded-full bg-mist-100/[0.07] px-2 py-0.5 font-mono text-[11px] tracking-wide text-mist-400 transition-colors group-hover:text-mist-100">
                Q3
              </span>
            </a>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-8 max-w-4xl font-display text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.04em] text-balance-pretty sm:text-6xl lg:text-[4.5rem]"
          >
            <span className="text-mist-100">We build the web</span>
            <br />
            <span className="text-gradient">your idea deserves</span>
            <span className="font-serif text-brand-300 italic">.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-2xl text-base leading-relaxed text-balance-pretty text-mist-400 sm:text-lg"
          >
            AISquadX is an AI-native development studio. We turn rough ideas
            into polished websites, SaaS platforms and internal tools —
            engineered fast, designed beautifully, shipped without drama.
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
          >
            <ButtonLink
              href="/contact"
              size="lg"
              className="w-full sm:w-auto"
            >
              Start a project
              <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink
              href="/projects"
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Sparkles className="size-4 text-brand-300" />
              View our work
            </ButtonLink>
          </motion.div>

          <motion.dl
            {...rise(0.34)}
            className="mt-16 grid w-full max-w-2xl grid-cols-3 divide-x divide-mist-100/[0.07] rounded-2xl surface py-6"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1.5">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold tracking-tight text-mist-100 sm:text-3xl">
                  {s.value}
                </dd>
                <p className="px-2 text-center text-[11px] tracking-wide text-mist-500 uppercase sm:text-xs">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>
      </Container>
    </section>
  );
}
