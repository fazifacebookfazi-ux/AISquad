import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";

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

/**
 * Bold service cards — full lime inversion on hover.
 */
export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                Design and code, <span className="italic text-brand-400">same desk.</span>
              </>
            }
            description="Strategy, interface and engineering in one studio — so the look is not an afterthought on a backlog."
          />
          <Reveal delay={0.15}>
            <ButtonLink href="/services" variant="secondary">
              All services
              <ArrowRight className="size-4" />
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.n} as="li" delay={(i % 3) * 0.07}>
              <Link
                href={service.href}
                className="group flex h-full flex-col gap-5 border-2 border-mist-100/12 bg-ink-900 p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-400 hover:bg-brand-400 lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl font-black tracking-tight text-brand-400 transition-colors duration-300 group-hover:text-ink-950">
                    {service.n}
                  </span>
                  <ArrowUpRight className="size-6 text-mist-500 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink-950" />
                </div>
                <h3 className="font-display text-2xl font-black tracking-tight text-mist-100 transition-colors duration-300 group-hover:text-ink-950">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-mist-400 transition-colors duration-300 group-hover:text-ink-950/75">
                  {service.description}
                </p>
                <span className="font-mono text-[11px] font-bold tracking-[0.18em] text-brand-400 uppercase transition-colors duration-300 group-hover:text-ink-950">
                  Explore →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
