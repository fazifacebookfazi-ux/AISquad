import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { serviceDetails } from "@/lib/services";
import { cn } from "@/lib/utils";

export function ServiceSections() {
  return (
    <div className="divide-y divide-mist-100/[0.07]">
      {serviceDetails.map((service, index) => {
        const flipped = index % 2 === 1;

        return (
          <section
            key={service.id}
            id={service.id}
            className="relative scroll-mt-24 py-20 lg:py-28"
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute top-1/4 size-[30rem] rounded-full bg-brand-500/8 blur-[150px]",
                flipped ? "right-0" : "left-0",
              )}
            />

            <Container className="relative">
              <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
                {/* Narrative column */}
                <div className={cn("flex flex-col", flipped && "lg:order-2")}>
                  <Reveal>
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-xl border border-mist-100/10 bg-mist-100/[0.05] text-brand-300">
                        <service.icon className="size-5" strokeWidth={1.6} />
                      </span>
                      <span className="font-mono text-xs tracking-[0.18em] text-mist-500 uppercase">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(serviceDetails.length).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={0.05}>
                    <h2 className="mt-7 font-display text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.03em] text-mist-100 sm:text-4xl">
                      {service.title}
                    </h2>
                  </Reveal>

                  <Reveal delay={0.08}>
                    <p className="mt-3 font-display text-xl text-brand-400 italic">
                      {service.tagline}
                    </p>
                  </Reveal>

                  <Reveal delay={0.12}>
                    <p className="mt-6 max-w-xl leading-relaxed text-mist-400">
                      {service.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.16}>
                    <p className="mt-6 border-l-2 border-brand-400/40 pl-4 text-sm leading-relaxed text-mist-300">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
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
                          className="rounded-md bg-mist-100/[0.05] px-2.5 py-1 font-mono text-[10px] tracking-wide text-mist-500 uppercase"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>

                {/* Spec card */}
                <Reveal delay={0.1} className={cn(flipped && "lg:order-1")}>
                  <div className="overflow-hidden rounded-2xl surface">
                    <div className="grid grid-cols-2 divide-x divide-mist-100/[0.07] border-b border-mist-100/[0.07]">
                      <div className="flex flex-col gap-1 p-6">
                        <span className="font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
                          Timeline
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight text-mist-100">
                          {service.timeline}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 p-6">
                        <span className="font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
                          Engagement
                        </span>
                        <span className="font-display text-lg font-semibold tracking-tight text-mist-100">
                          {service.engagement}
                        </span>
                      </div>
                    </div>

                    <div className="p-7">
                      <h3 className="font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
                        What you get
                      </h3>
                      <ul className="mt-5 flex flex-col gap-3.5">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-brand-300">
                              <Check className="size-3" strokeWidth={2.5} />
                            </span>
                            <span className="text-sm leading-relaxed text-mist-300">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <ButtonLink
                        href="/contact"
                        variant="secondary"
                        size="sm"
                        className="mt-8 w-full"
                      >
                        Enquire about {service.title.toLowerCase()}
                        <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
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
