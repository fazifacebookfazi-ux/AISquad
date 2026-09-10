import type { Metadata } from "next";
import { ArrowUpRight, CalendarClock, Mail, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { FAQ } from "@/components/home/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project and get a plan, a timeline and a fixed quote within one business day.",
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
            Tell us what you&apos;re{" "}
            <span className="italic text-brand-400">building</span>
          </>
        }
        description="Share a few details below and you'll hear back within one business day — from a person, not an autoresponder."
      />

      <Container className="pb-24 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_0.85fr] lg:gap-20">
          <Reveal>
            <div className="rounded-2xl surface p-8 sm:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <div className="flex flex-col gap-10 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.1}>
              <div className="flex flex-col gap-3">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
                  Prefer email?
                </h2>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 font-display text-xl tracking-tight text-mist-100"
                >
                  {site.email}
                  <ArrowUpRight className="size-4 text-brand-300 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex flex-col gap-6">
                <h2 className="font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
                  What happens next
                </h2>
                <ol className="flex flex-col gap-6">
                  {steps.map((step, i) => (
                    <li key={step.title} className="flex gap-4">
                      <span className="relative flex flex-col items-center">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-mist-100/10 bg-mist-100/[0.04] text-brand-300">
                          <step.icon className="size-4" strokeWidth={1.6} />
                        </span>
                        {i < steps.length - 1 ? (
                          <span
                            aria-hidden
                            className="mt-2 w-px flex-1 bg-gradient-to-b from-mist-100/12 to-transparent"
                          />
                        ) : null}
                      </span>
                      <span className="flex flex-col gap-1.5 pb-1">
                        <span className="font-display text-[15px] font-semibold tracking-tight text-mist-100">
                          {step.title}
                        </span>
                        <span className="text-sm leading-relaxed text-mist-400">
                          {step.description}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex flex-col gap-3 rounded-2xl border border-mist-100/[0.07] bg-mist-100/[0.02] p-6">
                <span className="flex items-center gap-2 text-sm text-mist-300">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent-400" />
                  </span>
                  Taking on new projects
                </span>
                <p className="text-sm leading-relaxed text-mist-400">
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
