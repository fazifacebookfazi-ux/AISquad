import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const faqs = [
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

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions,{" "}
                <span className="font-serif italic text-brand-300">
                  answered
                </span>
              </>
            }
            description="Still unsure about something? Send a note and you’ll hear back the same day."
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <div className="flex flex-col gap-3">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.05}>
                <details className="group rounded-2xl surface px-6 transition-colors duration-500 open:border-brand-400/25 hover:border-mist-100/15">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[15px] font-medium tracking-tight text-mist-100 [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      className="size-4 shrink-0 text-mist-500 transition-transform duration-300 ease-out-expo group-open:rotate-45 group-open:text-brand-300"
                      aria-hidden
                    />
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-mist-400">
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
