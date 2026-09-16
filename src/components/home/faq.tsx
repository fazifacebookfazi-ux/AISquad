"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "@/lib/faqs";
import { cn } from "@/lib/utils";

function Item({ item, index }: { item: (typeof faqs)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-6 text-left"
      >
        <span className="font-mono text-xs text-mute tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-lg font-semibold tracking-[-0.01em] text-ink">
          {item.q}
        </span>
        <span
          className={cn(
            "grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300",
            open ? "rotate-45 bg-accent text-white" : "bg-ink/5 text-ink",
          )}
        >
          <Plus className="size-4" />
        </span>
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-400 ease-out-expo",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 pl-[3.4rem] leading-relaxed text-ink-soft/75">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)] text-ink">
                Asked, <span className="text-accent">answered.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-sm leading-relaxed text-ink-soft/70">
                Still unsure? Send a note — we reply within one business day.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05} y={20}>
                <Item item={item} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
