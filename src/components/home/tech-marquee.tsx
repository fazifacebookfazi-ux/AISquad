"use client";

import { useGsap } from "@/components/motion/use-gsap";
import { gsap } from "@/components/motion/gsap";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "PyTorch",
  "FFmpeg",
  "PostgreSQL",
  "Stripe",
  "Tailwind CSS",
  "Vercel",
  "Figma",
];

export function TechMarquee() {
  const ref = useGsap<HTMLElement>((root) => {
    const track = "[data-marquee-track]";
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 36,
      repeat: -1,
    });
    const pause = () => tween.pause();
    const play = () => tween.play();
    root?.addEventListener("mouseenter", pause);
    root?.addEventListener("mouseleave", play);
    return () => {
      root?.removeEventListener("mouseenter", pause);
      root?.removeEventListener("mouseleave", play);
    };
  });

  const row = [...stack, ...stack];

  return (
    <section
      ref={ref}
      aria-label="Technologies we work with"
      className="overflow-hidden border-y border-mist-100/10 py-5"
    >
      <div data-marquee-track className="flex w-max items-center">
        {row.map((item, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= stack.length}>
            <span className="px-7 font-mono text-[11px] tracking-[0.22em] whitespace-nowrap text-mist-500 uppercase">
              {item}
            </span>
            <span className="size-1 rounded-full bg-brand-400/60" />
          </span>
        ))}
      </div>
    </section>
  );
}
