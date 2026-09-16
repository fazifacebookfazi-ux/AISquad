import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

/* Copy is frozen — FAQPage schema depends on these exact strings. */
export const faqs = [
  {
    q: "What exactly is “vibe coding”?",
    a: "It’s our AI-assisted build process. You describe the product in plain language, we translate that into working software in tight loops — often with something clickable on day one. The engineering rigour stays; only the slow parts disappear.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends entirely on scope, so we quote per project rather than publishing a price list. Tell us what you have in mind and you'll get a fixed number — plus what's included and what isn't — within a day. Nothing starts until you've agreed to it.",
  },
  {
    q: "How long until I see something real?",
    a: "You get a live preview link in the first week. Most marketing sites launch in 2–3 weeks and MVPs in 4–6, depending on scope.",
  },
  {
    q: "Do I own the code?",
    a: "Completely. Everything ships to your GitHub organisation and your hosting account, with no lock-in and no licensing strings attached.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Yes. We regularly inherit half-finished projects — we start with an audit, tell you honestly what’s salvageable, then get it to production.",
  },
  {
    q: "What happens after launch?",
    a: "We can stay on for maintenance, performance work and new features, or hand over full documentation so your team runs with it.",
  },
];

/** Bold FAQ — thick-bordered accordion rows with lime plus tiles. */
export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 border-t-2 border-mist-100/10 py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Questions, <span className="italic text-brand-400">answered.</span>
                </>
              }
              description="Still unsure? Send a note — we reply within one business day."
            />
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details className="group border-2 border-mist-100/12 bg-ink-900 transition-colors duration-300 open:border-brand-400 hover:border-mist-100/30">
                  <summary className="flex cursor-pointer list-none items-center gap-5 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                    <span className="font-mono text-xs font-black text-brand-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-lg font-bold tracking-tight text-mist-100 sm:text-xl">
                      {item.q}
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center bg-brand-400 text-ink-950 transition-transform duration-300 group-open:rotate-45">
                      <Plus className="size-5" strokeWidth={3} aria-hidden />
                    </span>
                  </summary>
                  <p className="border-t-2 border-mist-100/10 px-5 py-5 text-[15px] leading-relaxed text-mist-300 sm:px-6 sm:pl-[4.25rem]">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
