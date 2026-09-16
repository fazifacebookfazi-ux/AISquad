import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { serviceDetails } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServiceSections() {
  return (
    <div>
      {serviceDetails.map((service, index) => {
        const flipped = index % 2 === 1;

        return (
          <section
            key={service.id}
            id={service.id}
            className={cn(
              "relative scroll-mt-24 border-t-2 border-mist-100/10 py-20 lg:py-28",
              index % 2 === 1 && "bg-ink-900/60",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-8 font-display text-[9rem] leading-none font-black tracking-tight text-stroke-faint select-none",
                flipped ? "right-4" : "left-4",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <Container className="relative">
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Narrative column */}
                <div className={cn("flex flex-col", flipped && "lg:order-2")}>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="grid size-13 place-items-center border-2 border-ink-950 bg-brand-400 text-ink-950">
                        <service.icon className="size-6" strokeWidth={2} />
                      </span>
                      <span className="font-mono text-xs font-bold tracking-[0.18em] text-mist-500 uppercase">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(serviceDetails.length).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <h2 className="mt-7 font-display text-4xl leading-[1.02] font-black tracking-[-0.03em] text-mist-100 sm:text-5xl">
                      {service.title}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.08}>
                    <p className="mt-3 font-display text-xl text-brand-400 italic">
                      {service.tagline}
                    </p>
                  </Reveal>

                  <Reveal delay={0.12}>
                    <p className="mt-6 max-w-xl leading-relaxed text-mist-300">
                      {service.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <p className="mt-6 border-l-4 border-brand-400 pl-4 text-sm leading-relaxed text-mist-300">
                      <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-mist-500 uppercase">
                        Best for
                      </span>
                      <br />
                      {service.bestFor}
                    </p>
                  </Reveal>

                  <Reveal delay={0.2}>
                    <div className="mt-9 flex flex-wrap gap-1.5">
                      {service.stack.map((tech) => (
                        <span
                          key={tech}
                          className="border border-mist-100/15 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wide text-mist-500 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>

                {/* Spec card */}
                <Reveal delay={0.1} className={cn(flipped && "lg:order-1", "h-full")}>
                  <div className="flex h-full flex-col overflow-hidden border-2 border-brand-400/60 bg-ink-950">
                    <div className="grid grid-cols-2 divide-x-2 divide-mist-100/10 border-b-2 border-brand-400/60">
                      <div className="flex flex-col gap-1 p-6">
                        <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-mist-500 uppercase">
                          Timeline
                        </span>
                        <span className="font-display text-lg font-bold tracking-tight text-mist-100">
                          {service.timeline}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 p-6">
                        <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-mist-500 uppercase">
                          Engagement
                        </span>
                        <span className="font-display text-lg font-bold tracking-tight text-mist-100">
                          {service.engagement}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <h3 className="font-mono text-[10px] font-black tracking-[0.2em] text-brand-400 uppercase">
                        What you get
                      </h3>
                      <ul className="mt-5 flex flex-1 flex-col gap-3.5">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-brand-400 text-ink-950">
                              <Check className="size-3" strokeWidth={3} />
                            </span>
                            <span className="text-sm leading-relaxed text-mist-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <ButtonLink
                        href="/contact"
                        size="sm"
                        className="mt-8 w-full"
                      >
                        Enquire about {service.title.toLowerCase()}
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </ButtonLink>
                    </div>
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}
    </div>
  );
}
