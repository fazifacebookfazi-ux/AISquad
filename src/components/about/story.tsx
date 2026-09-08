import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

const numbers = [
  { value: "40+", label: "Products shipped" },
  { value: "3 wks", label: "Average MVP launch" },
  { value: "100%", label: "Client retention" },
  { value: "< 1 day", label: "Reply time" },
];

export function Story() {
  return (
    <section className="relative py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Our story</Eyebrow>
          </Reveal>

          <div className="flex flex-col gap-7">
            <Reveal delay={0.05}>
              <p className="font-display text-[1.6rem] leading-[1.35] font-medium tracking-[-0.02em] text-balance-pretty text-mist-100 sm:text-[2rem] sm:leading-[1.3]">
                Most agencies are slow because of how they&apos;re shaped, not
                how hard they work.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="leading-relaxed text-mist-400">
                Briefs pass from account manager to designer to developer, and
                something is lost at every handoff. Three months later you get
                back something close to what you asked for, but not quite. We
                started AISquadX because that model made no sense to us — and
                because AI tooling finally made a different one possible.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="leading-relaxed text-mist-400">
                We work as a small squad that designs and builds in the same
                room. AI handles the repetitive engineering, which means the
                hours go into the parts that actually matter: how the product
                feels, how quickly it responds, whether the words on the page
                convince anyone. A site that used to take a quarter takes a few
                weeks, and it&apos;s better, because we spent that time on
                craft instead of coordination.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="leading-relaxed text-mist-400">
                We&apos;re deliberately small. A handful of projects at a time,
                each one something we&apos;d be happy to put in the portfolio.
                That&apos;s the whole business model.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] lg:grid-cols-4">
            {numbers.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-2 bg-ink-950 p-8"
              >
                <dd className="font-display text-3xl font-semibold tracking-[-0.03em] text-mist-100 sm:text-4xl">
                  {item.value}
                </dd>
                <dt className="font-mono text-[10px] tracking-[0.16em] text-mist-500 uppercase">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
