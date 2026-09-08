import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

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
              <span className="font-serif italic text-brand-300">
                rearranged
              </span>
            </>
          }
          description="Same deliverables, a fundamentally different way of getting there."
        />

        <Reveal delay={0.1}>
          <div className="mt-14 overflow-hidden rounded-2xl border border-mist-100/[0.07]">
            <div className="grid grid-cols-1 divide-y divide-mist-100/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="bg-ink-900/60 p-7">
                <h3 className="font-mono text-[10px] tracking-[0.18em] text-mist-500 uppercase">
                  The usual way
                </h3>
              </div>
              <div className="relative bg-brand-500/8 p-7">
                <h3 className="font-mono text-[10px] tracking-[0.18em] text-brand-300 uppercase">
                  With AISquadX
                </h3>
              </div>
            </div>

            {rows.map((row) => (
              <div
                key={row.ours}
                className="grid grid-cols-1 divide-y divide-mist-100/[0.07] border-t border-mist-100/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0"
              >
                <div className="flex items-start gap-3 bg-ink-900/30 p-7">
                  <X
                    className="mt-0.5 size-4 shrink-0 text-mist-500"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <p className="text-sm leading-relaxed text-mist-500">
                    {row.old}
                  </p>
                </div>
                <div className="flex items-start gap-3 bg-brand-500/4 p-7">
                  <span
                    className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-brand-300"
                    aria-hidden
                  >
                    <Check className="size-3" strokeWidth={2.5} />
                  </span>
                  <p className="text-sm leading-relaxed text-mist-300">
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
