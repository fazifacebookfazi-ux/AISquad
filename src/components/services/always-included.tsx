import { Accessibility, GitBranch, Rocket, Search, Smartphone, Zap } from "lucide-react";
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
    <section className="border-t-2 border-mist-100/10 py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Included as standard"
          title={
            <>
              The baseline is{" "}
              <span className="italic text-brand-400">
                never optional
              </span>
            </>
          }
          description="These aren't line items on a quote. They come with everything we build."
        />

        <div className="mt-14 grid gap-px overflow-hidden border-2 border-mist-100/15 bg-mist-100/10 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 3) * 0.06}
              className="group flex flex-col gap-4 bg-ink-950 p-8 transition-colors duration-300 hover:bg-brand-400"
            >
              <item.icon
                className="size-6 text-brand-400 transition-colors duration-300 group-hover:text-ink-950"
                strokeWidth={2}
              />
              <h3 className="font-display text-lg font-black tracking-tight text-mist-100 transition-colors duration-300 group-hover:text-ink-950">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-mist-400 transition-colors duration-300 group-hover:text-ink-950/75">
                {item.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
