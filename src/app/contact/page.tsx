import type { Metadata } from "next";
import { ArrowUpRight, CalendarClock, Mail, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { FAQ } from "@/components/home/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start Your Project",
  description:
    "Tell us about your project and get a plan, a timeline and a fixed quote within one business day. Web development, SaaS and AI integration studio.",
  alternates: { canonical: "/contact" },
};

const steps = [
  {
    icon: MessageSquare,
    title: "You send the brief",
    description:
      "Even a rough one. A couple of paragraphs is enough to start a useful conversation.",
  },
  {
    icon: Mail,
    title: "We reply within a day",
    description:
      "With first thoughts, any questions we have, and whether we're the right fit.",
  },
  {
    icon: CalendarClock,
    title: "A 30-minute call",
    description:
      "We agree on scope, then send a fixed quote and timeline. No obligation to proceed.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Tell us what you&apos;re <span className="text-accent">building.</span>
          </>
        }
        description="Share a few details below and you'll hear back within one business day — from a person, not an autoresponder."
      />

      <Container className="pb-24 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:gap-16">
          <Reveal>
            <div className="card p-8 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.08}>
              <div className="flex flex-col gap-3">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  Prefer email?
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 font-display text-xl font-bold tracking-[-0.01em] text-ink"
                >
                  <span className="link-sweep">{site.email}</span>
                  <ArrowUpRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-col gap-6">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mute uppercase">
                  What happens next
                </h2>
                <ol className="flex flex-col gap-2">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex gap-5 py-4 border-b border-ink/10 last:border-0">
                      <span className="display text-2xl text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex flex-col gap-1.5">
                        <span className="font-display text-base font-bold tracking-[-0.01em] text-ink">
                          {step.title}
                        </span>
                        <span className="text-[15px] leading-relaxed text-ink-soft/70">
                          {step.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="card flex flex-col gap-3 p-7">
                <span className="flex items-center gap-2.5 font-display text-[15px] font-semibold text-ink">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
                  </span>
                  Taking on new projects
                </span>
                <p className="text-[15px] leading-relaxed text-ink-soft/70">
                  We keep a small number of projects running at once so each one
                  gets proper attention. Current availability starts this
                  quarter.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      <FAQ />
    </>
  );
}
