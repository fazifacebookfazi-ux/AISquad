import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    n: "01",
    title: "Web development",
    description:
      "Marketing sites and company platforms that refuse the default look. Next.js, considered type, motion that earns its keep.",
    href: "/services#web",
  },
  {
    n: "02",
    title: "SaaS product build",
    description:
      "Auth, billing, dashboards, admin — a complete product, designed as one piece rather than a pile of screens.",
    href: "/services#saas",
  },
  {
    n: "03",
    title: "Vibe coding sprints",
    description:
      "Describe the vision. Watch a working thing appear in days, then steer it in the open until it is yours.",
    href: "/services#vibe",
  },
  {
    n: "04",
    title: "AI integration",
    description:
      "Assistants, RAG and automations that live inside the product people already use — not a chatbot bolted on.",
    href: "/services#ai",
  },
  {
    n: "05",
    title: "UI / UX design",
    description:
      "The part most agencies outsource. Type, colour, hierarchy and interaction invented for this product, not borrowed.",
    href: "/services#design",
  },
  {
    n: "06",
    title: "Performance & care",
    description:
      "Audits, Core Web Vitals and ongoing work so the thing stays as sharp as the day it launched.",
    href: "/services#care",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Design and code,{" "}
              <span className="italic text-brand-400">same desk.</span>
            </>
          }
          description="Strategy, interface and engineering in one studio — so the look is not an afterthought on a backlog."
        />

        <ul className="mt-16 border-t border-mist-100/12">
          {services.map((service, i) => (
            <Reveal key={service.n} as="li" delay={i * 0.04}>
              <Link
                href={service.href}
                className="group grid gap-4 border-b border-mist-100/12 py-7 transition-colors hover:bg-mist-100/[0.03] sm:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)_auto] sm:items-baseline sm:gap-8 sm:py-9"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-brand-400">
                  {service.n}
                </span>
                <h3 className="font-display text-3xl tracking-tight text-mist-100 italic sm:text-4xl">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-mist-400 sm:text-[15px]">
                  {service.description}
                </p>
                <ArrowUpRight className="hidden size-5 text-mist-500 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-400 sm:block" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
