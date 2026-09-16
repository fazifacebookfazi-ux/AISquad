import {
  Accessibility,
  GitBranch,
  Rocket,
  Search,
  Smartphone,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";

const included = [
  {
    icon: Zap,
    title: "Genuinely fast",
    description:
      "Green Core Web Vitals as a requirement, not an afterthought we get to later.",
  },
  {
    icon: Smartphone,
    title: "Every screen size",
    description:
      "Designed and tested from small phones up to ultrawide monitors.",
  },
  {
    icon: Search,
    title: "Search-ready",
    description:
      "Semantic markup, metadata, sitemaps and structured data on every page.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description:
      "Keyboard navigation, sensible contrast and screen-reader support to WCAG AA.",
  },
  {
    icon: GitBranch,
    title: "Yours to keep",
    description:
      "Clean code in your GitHub organisation. No lock-in, no licence fees.",
  },
  {
    icon: Rocket,
    title: "Launched properly",
    description:
      "Hosting, domain, SSL and analytics configured and handed over working.",
  },
];

export function AlwaysIncluded() {
  return (
    <section className="bg-paper-deep/60 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Included as standard"
          title={
            <>
              The baseline is <span className="text-accent">never optional.</span>
            </>
          }
          description="These aren't line items on a quote. They come with everything we build."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="h-full">
              <div className="card group flex h-full flex-col gap-4 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-24px_rgba(20,20,18,0.35)]">
                <span className="grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <item.icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-ink-soft/70">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
