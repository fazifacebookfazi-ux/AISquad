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
      <Container>
        <SectionHeading
          eyebrow="Method"
          title={
            <>
              Four stages. No{" "}
              <span className="italic text-brand-400">theatre.</span>
            </>
          }
          description="Visible progress from the first week — not a six-week discovery deck."
        />

        <ol className="relative mt-16 border-l border-brand-400/40 pl-8 sm:pl-12">
          {steps.map((item, i) => (
            <Reveal
              key={item.step}
              as="li"
              delay={i * 0.08}
              className="relative pb-12 last:pb-0"
            >
              <span className="absolute top-1.5 -left-[2.15rem] size-2.5 bg-brand-400 sm:-left-[3.15rem]" />
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-[11px] tracking-[0.22em] text-brand-400">
                  {item.step}
                </span>
                <h3 className="font-display text-3xl tracking-tight text-mist-100 italic">
                  {item.title}
                </h3>
                <span className="font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
                  {item.duration}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-400 sm:text-[15px]">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
