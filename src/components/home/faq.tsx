import { Plus } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

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

export function FAQ() {
  return (
    <section
      id="faq"
      className="relative scroll-mt-24 border-t border-mist-100/10 py-24 lg:py-36"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="FAQ"
              title={
                <>
                  Questions,{" "}
                  <span className="text-brand-400 italic">answered.</span>
                </>
              }
              description={
                <>
                  Still unsure?{" "}
                  <Link
                    href="/contact"
                    className="text-mist-100 underline decoration-brand-400/60 decoration-1 underline-offset-4 transition-colors hover:text-brand-300"
                  >
                    Send a note
                  </Link>{" "}
                  — we reply within one business day.
                </>
              }
            />
          </div>

          <div>
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 0.04}>
                <details className="group border-t border-mist-100/12 last:border-b">
                  <summary className="flex cursor-pointer list-none items-center gap-5 py-6 transition-colors duration-300 hover:bg-mist-100/[0.02] sm:gap-8 sm:py-7 [&::-webkit-details-marker]:hidden">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-mist-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-xl font-medium tracking-[-0.02em] text-mist-100 sm:text-2xl">
                      {item.q}
                    </span>
                    <Plus
                      aria-hidden
                      className="size-5 shrink-0 text-brand-400 transition-transform duration-500 ease-out-expo group-open:rotate-45"
                    />
                  </summary>
                  <p className="max-w-2xl pb-7 pl-9 text-[15px] leading-relaxed text-mist-400 sm:pl-12">
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
