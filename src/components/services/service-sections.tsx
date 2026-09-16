import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { serviceDetails } from "@/lib/services";

export function ServiceSections() {
  return (
    <div>
      {serviceDetails.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className="scroll-mt-24 border-t border-ink/12 py-20 lg:py-28"
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
              <div>
                <Reveal>
                  <div className="flex items-center gap-5">
                    <span className="grid size-14 place-items-center rounded-2xl bg-accent-soft text-accent">
                      <service.icon className="size-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-xs tracking-[0.18em] text-mute uppercase">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(serviceDetails.length).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.06}>
                  <h2 className="display mt-7 text-[clamp(2rem,4vw,3.2rem)] text-ink">
                    {service.title}
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-3 font-display text-xl font-medium tracking-[-0.01em] text-accent">
                    {service.tagline}
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft/80">
                    {service.description}
                  </p>
                </Reveal>
                <Reveal delay={0.18}>
                  <p className="mt-8 max-w-xl border-l-2 border-accent pl-5 text-[15px] leading-relaxed text-ink-soft/75">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                      Best for
                    </span>
                    <br />
                    {service.bestFor}
                  </p>
                </Reveal>
                <Reveal delay={0.22}>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-ink/[0.05] px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-ink-soft uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.12} className="lg:sticky lg:top-28 lg:self-start">
                <div className="card overflow-hidden">
                  <div className="grid grid-cols-2 divide-x divide-ink/10 border-b border-ink/10">
                    <div className="flex flex-col gap-1.5 p-6">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                        Timeline
                      </span>
                      <span className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
                        {service.timeline}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5 p-6">
                      <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                        Engagement
                      </span>
                      <span className="font-display text-lg font-bold tracking-[-0.01em] text-ink">
                        {service.engagement}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-8">
                    <h3 className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                      What you get
                    </h3>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                            <Check className="size-3" strokeWidth={2.5} />
                          </span>
                          <span className="text-[15px] leading-relaxed text-ink-soft/85">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-[15px] font-semibold text-paper transition-colors duration-300 hover:bg-accent"
                    >
                      Enquire about {service.title.toLowerCase()}
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      ))}
    </div>
  );
}

export function ServiceQuickNav() {
  return (
    <div className="border-b border-ink/12 bg-paper/80 backdrop-blur">
      <Container>
        <nav
          aria-label="Services"
          className="scrollbar-none flex gap-2 overflow-x-auto py-4"
        >
          {serviceDetails.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
