import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    step: "01",
    title: "Discovery call",
    duration: "Day 1",
    description:
      "We dig into the problem, the audience and what success actually looks like. You leave with a clear scope and a fixed price — no vague estimates.",
  },
  {
    step: "02",
    title: "Design direction",
    duration: "Days 2–5",
    description:
      "Typography, colour, layout and motion come together into a direction you can see and react to before a single feature is built.",
  },
  {
    step: "03",
    title: "Build sprints",
    duration: "Weeks 1–3",
    description:
      "AI-assisted sprints with a live preview link from day one. You watch the product take shape and steer it as it goes.",
  },
  {
    step: "04",
    title: "Launch & care",
    duration: "Ongoing",
    description:
      "We handle deployment, domains, analytics and performance — then stay on for iterations once real users arrive.",
  },
];

/** Bold process — numbered blocks with giant lime numerals. */
export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Method"
          title={
            <>
              Four stages. No <span className="italic text-brand-400">theatre.</span>
            </>
          }
          description="Visible progress from the first week — not a six-week discovery deck."
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <Reveal key={item.step} as="li" delay={i * 0.08} className="h-full">
              <div className="group flex h-full flex-col border-2 border-mist-100/12 bg-ink-900 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400">
                <span className="font-display text-6xl font-black tracking-tight text-brand-400">
                  {item.step}
                </span>
                <h3 className="mt-6 font-display text-xl font-black tracking-tight text-mist-100">
                  {item.title}
                </h3>
                <span className="mt-2 inline-flex w-fit border border-brand-400/50 px-2 py-0.5 font-mono text-[10px] font-bold tracking-[0.16em] text-brand-300 uppercase">
                  {item.duration}
                </span>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-mist-400">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
