import { Container } from "@/components/ui/container";
import { Counter } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";

const stats = [
  { value: 40, suffix: "+", label: "Products shipped" },
  { value: 100, suffix: "+", label: "Free tools live on StartupAI" },
  { value: 30, suffix: "", label: "Clips from a single upload" },
  { value: 12, suffix: "", label: "Caption styles in EzClipper" },
];

/** Bold stat band — animated counters on thick-bordered cells. */
export function Stats() {
  return (
    <section className="relative border-y-2 border-mist-100/10 bg-ink-900 py-20 lg:py-24">
      <Container>
        <dl className="grid grid-cols-2 gap-px overflow-hidden border-2 border-mist-100/15 bg-mist-100/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="group bg-ink-950 p-8 transition-colors duration-300 hover:bg-brand-400 lg:p-10"
            >
              <div className="flex flex-col gap-3">
                <dd className="font-display text-5xl font-black tracking-[-0.03em] text-brand-400 transition-colors duration-300 group-hover:text-ink-950 lg:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="font-mono text-[11px] font-bold tracking-[0.16em] text-mist-400 uppercase transition-colors duration-300 group-hover:text-ink-950/70">
                  {s.label}
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
