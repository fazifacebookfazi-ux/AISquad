import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
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

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-ink py-24 text-paper lg:py-36">
      <Container>
        <Reveal>
          <Eyebrow light>How we work</Eyebrow>
        </Reveal>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <Reveal delay={0.06}>
            <h2 className="display max-w-2xl text-[clamp(2.4rem,5.5vw,4.5rem)] text-paper">
              Four stages. <span className="text-stroke-paper">No theatre.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm leading-relaxed text-paper/60">
              Visible progress from the first week — not a six-week discovery
              deck.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.07} className="h-full">
              <div className="group flex h-full flex-col gap-6 bg-ink p-8 transition-colors duration-500 hover:bg-accent lg:p-9">
                <span className="display text-5xl text-paper/25 transition-colors duration-500 group-hover:text-white/40">
                  {item.step}
                </span>
                <div className="mt-auto flex flex-col gap-3">
                  <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-paper">
                    {item.title}
                  </h3>
                  <p className="font-mono text-[11px] tracking-[0.18em] text-paper/45 uppercase transition-colors duration-500 group-hover:text-white/70">
                    {item.duration}
                  </p>
                  <p className="text-sm leading-relaxed text-paper/60 transition-colors duration-500 group-hover:text-white/85">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
