import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

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
              The agency model,{" "}
              <span className="italic text-brand-400">
                rearranged
              </span>
            </>
          }
          description="Same deliverables, a fundamentally different way of getting there."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden border-2 border-mist-100/15">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="border-b-2 border-mist-100/15 bg-ink-900/60 p-6 sm:border-r-2 sm:border-b-0">
                <h3 className="font-mono text-[10px] font-black tracking-[0.2em] text-mist-500 uppercase">
                  The usual way
                </h3>
              </div>
              <div className="bg-brand-400 p-6">
                <h3 className="font-mono text-[10px] font-black tracking-[0.2em] text-ink-950 uppercase">
                  With AISquadX
                </h3>
              </div>
            </div>

            {rows.map((row) => (
              <div
                key={row.ours}
                className="grid grid-cols-1 border-t-2 border-mist-100/15 sm:grid-cols-2"
              >
                <div className="flex items-start gap-3 bg-ink-900/30 p-6 sm:border-r-2 sm:border-mist-100/15">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-mist-500"
                    strokeWidth={3}
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-mist-500">
                    {row.old}
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-brand-400/8 p-6">
                  <span
                    className="mt-0.5 grid size-5 shrink-0 place-items-center bg-brand-400 text-ink-950"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <p className="text-sm leading-relaxed font-medium text-mist-100">
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
