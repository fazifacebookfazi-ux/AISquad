import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  Bot,
  Gauge,
  LayoutTemplate,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    icon: LayoutTemplate,
    title: "Web development",
    description:
      "Marketing sites, landing pages and company platforms built on Next.js — fast, accessible and effortless to update.",
    tags: ["Next.js", "CMS", "SEO"],
    href: "/services#web",
    featured: true,
  },
  {
    icon: Blocks,
    title: "SaaS product build",
    description:
      "From auth and billing to dashboards and admin tooling — a complete, revenue-ready product.",
    tags: ["Auth", "Stripe", "Dashboards"],
    href: "/services#saas",
  },
  {
    icon: Wand2,
    title: "Vibe coding sprints",
    description:
      "Describe the vision, watch it materialise. Rapid AI-assisted sprints that turn ideas into working software in days.",
    tags: ["Prototyping", "MVP"],
    href: "/services#vibe",
  },
  {
    icon: Bot,
    title: "AI integration",
    description:
      "Chat assistants, RAG pipelines and automations woven into products people already use.",
    tags: ["LLMs", "RAG", "Agents"],
    href: "/services#ai",
  },
  {
    icon: Sparkles,
    title: "UI/UX design",
    description:
      "Design systems and interfaces that feel considered — typography, motion and hierarchy done properly.",
    tags: ["Design systems", "Motion"],
    href: "/services#design",
  },
  {
    icon: Gauge,
    title: "Performance & care",
    description:
      "Audits, Core Web Vitals work and ongoing maintenance so your product stays quick long after launch.",
    tags: ["Audits", "Support"],
    href: "/services#care",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything between{" "}
              <span className="font-serif italic text-brand-300">an idea</span>{" "}
              and a product in production
            </>
          }
          description="One team across strategy, design and engineering — so nothing gets lost in handoffs."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <Link
                href={service.href}
                className={[
                  "group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl surface p-7 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-brand-400/30",
                  service.featured ? "sm:col-span-2 lg:col-span-1" : "",
                ].join(" ")}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-brand-500/0 blur-3xl transition-colors duration-700 group-hover:bg-brand-500/20"
                />

                <div className="relative flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-mist-100/10 bg-mist-100/[0.05] text-brand-300 transition-colors duration-500 group-hover:border-brand-400/40 group-hover:text-accent-400">
                    <service.icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <ArrowUpRight className="size-4 text-mist-500 transition-all duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-mist-100" />
                </div>

                <h3 className="relative font-display text-lg font-semibold tracking-tight text-mist-100">
                  {service.title}
                </h3>
                <p className="relative flex-1 text-sm leading-relaxed text-mist-400">
                  {service.description}
                </p>

                <div className="relative flex flex-wrap gap-1.5 pt-1">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-mist-100/[0.05] px-2 py-1 font-mono text-[10px] tracking-wide text-mist-500 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
