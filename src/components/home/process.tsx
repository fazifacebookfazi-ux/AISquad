import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

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
    <section id="process" className="relative scroll-mt-24 py-24 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand-500/8 blur-[160px]"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A process built for{" "}
              <span className="font-serif italic text-brand-300">momentum</span>
            </>
          }
          description="No endless discovery phases or status meetings. Four clear stages, visible progress from the first week."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-mist-100/[0.07] bg-mist-100/[0.06] md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <Reveal
              key={item.step}
              as="li"
              delay={i * 0.08}
              className="group relative flex flex-col gap-4 bg-ink-950 p-8 transition-colors duration-500 hover:bg-ink-850"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-semibold tracking-tight text-mist-100/12 transition-colors duration-500 group-hover:text-brand-400/50">
                  {item.step}
                </span>
                <span className="rounded-full border border-mist-100/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-mist-500 uppercase">
                  {item.duration}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-mist-100">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-mist-400">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
