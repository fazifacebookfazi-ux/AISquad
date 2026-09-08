import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  {
    quote:
      "They shipped in three weeks what our previous agency scoped at three months — and the quality was genuinely better.",
    name: "Sarah Chen",
    role: "Founder, Nimbus Analytics",
    initials: "SC",
  },
  {
    quote:
      "The design direction landed on the first pass. Every detail, right down to the typography, felt deliberate.",
    name: "Marcus Webb",
    role: "Creative Director, Atlas Studio",
    initials: "MW",
  },
  {
    quote:
      "We described the product in a call and had a working prototype the same week. That changed how we raise money.",
    name: "Priya Raman",
    role: "CEO, Ledgerly",
    initials: "PR",
  },
];

export function Testimonials() {
  return (
    <section className="relative border-y border-mist-100/[0.07] bg-ink-900/40 py-24 lg:py-32">
      <Container>
        <SectionHeading
          align="center"
          className="mx-auto items-center"
          eyebrow="Client words"
          title={
            <>
              Teams keep coming{" "}
              <span className="font-serif italic text-brand-300">back</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-6 rounded-2xl surface p-8 transition-colors duration-500 hover:border-brand-400/25">
                <Quote
                  className="size-6 text-brand-400/70"
                  strokeWidth={1.6}
                  aria-hidden
                />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-mist-300">
                  “{t.quote}”
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-mist-100/[0.07] pt-5">
                  <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-accent-500 font-display text-xs font-semibold text-ink-950">
                    {t.initials}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-mist-100">
                      {t.name}
                    </span>
                    <span className="text-xs text-mist-500">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
