import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  {
    quote:
      "They shipped in three weeks what our previous agency scoped at three months — and the quality was genuinely better.",
    name: "Sarah Chen",
    role: "Founder, Nimbus Analytics",
  },
  {
    quote:
      "The design direction landed on the first pass. Every detail, right down to the typography, felt deliberate.",
    name: "Marcus Webb",
    role: "Creative Director, Atlas Studio",
  },
  {
    quote:
      "We described the product in a call and had a working prototype the same week. That changed how we raise money.",
    name: "Priya Raman",
    role: "CEO, Ledgerly",
  },
];

export function Testimonials() {
  return (
    <section className="relative border-y border-mist-100/10 bg-ink-900/40 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Words"
          title={
            <>
              Teams keep coming{" "}
              <span className="italic text-brand-400">back.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-px bg-mist-100/10 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col gap-8 bg-ink-950 p-8 lg:p-10">
                <blockquote className="flex-1 font-display text-2xl leading-snug tracking-tight text-mist-100 italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="font-mono text-[11px] tracking-[0.16em] text-mist-500 uppercase">
                  {t.name} — {t.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
