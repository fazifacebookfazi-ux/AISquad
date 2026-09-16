import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const rows = [
  {
    old: "Discovery phase billed by the hour",
    ours: "One call, then a fixed scope and quote",
  },
  {
    old: "Static mockups signed off in isolation",
    ours: "A live preview link you can click from week one",
  },
  {
    old: "Your brief relayed through an account manager",
    ours: "You talk directly to the person building it",
  },
  {
    old: "Change requests reopened as new contracts",
    ours: "Iteration is how the sprint works, not an upsell",
  },
  {
    old: "Handover as a zip file and good luck",
    ours: "Your GitHub, your hosting, documented",
  },
  {
    old: "Silence until launch day",
    ours: "Weekly demos and a roadmap you can see",
  },
];

export function Difference() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why us"
          title={
            <>
              The agency model, <span className="text-accent">rearranged.</span>
            </>
          }
          description="Same deliverables, a fundamentally different way of getting there."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-[24px] border border-ink/10">
            <div className="grid sm:grid-cols-2">
              <div className="bg-paper-deep/70 px-7 py-5">
                <h3 className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  The usual way
                </h3>
              </div>
              <div className="bg-accent px-7 py-5">
                <h3 className="font-mono text-[11px] tracking-[0.18em] text-white uppercase">
                  With AISquadX
                </h3>
              </div>
            </div>

            {rows.map((row, i) => (
              <div
                key={row.ours}
                className={cn(
                  "grid border-t border-ink/10 sm:grid-cols-2",
                  i % 2 === 1 && "bg-paper-deep/40",
                )}
              >
                <div className="flex items-start gap-3 px-7 py-6">
                  <X className="mt-1 size-4 shrink-0 text-faint" strokeWidth={2} aria-hidden />
                  <p className="text-[15px] leading-relaxed text-ink-soft/60">
                    {row.old}
                  </p>
                </div>
                <div className="flex items-start gap-3 border-t border-ink/10 px-7 py-6 sm:border-t-0 sm:border-l sm:border-ink/10">
                  <span
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-white"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  <p className="text-[15px] leading-relaxed font-medium text-ink">
                    {row.ours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
