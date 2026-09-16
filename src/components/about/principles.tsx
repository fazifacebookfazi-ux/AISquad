import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const principles = [
  {
    title: "Ship, then refine",
    description:
      "Something real and imperfect in week one beats something perfect in month three. Momentum is the feature nobody puts on the roadmap.",
  },
  {
    title: "Craft is not decoration",
    description:
      "Typography, spacing and motion are how a product earns trust before anyone reads a word. We treat them as engineering problems.",
  },
  {
    title: "Say the honest thing",
    description:
      "If your idea has a hole in it, or the budget doesn't match the scope, you'll hear it on the first call rather than in week six.",
  },
  {
    title: "Speed with receipts",
    description:
      "Fast doesn't mean sloppy. Typed code, reviewed changes, measured performance — the AI accelerates the work, it doesn't excuse it.",
  },
  {
    title: "You own everything",
    description:
      "Code in your GitHub, hosting in your account, no proprietary layer holding you hostage. Leaving should always be easy.",
  },
  {
    title: "Small on purpose",
    description:
      "We take a few projects at a time. Growth for its own sake is how studios start producing work they're not proud of.",
  },
];

export function Principles() {
  return (
    <section className="border-y border-ink/12 bg-paper-deep/60 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="How we think"
          title={
            <>
              Six things we <span className="text-accent">actually believe.</span>
            </>
          }
          description="Not values on a wall. These are the arguments we've already had, settled into how we work."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="h-full">
              <div className="card flex h-full flex-col gap-4 p-8">
                <span className="display text-3xl text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-soft/70">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
