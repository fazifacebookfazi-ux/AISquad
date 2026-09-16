import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Manifesto } from "@/components/motion/text-fx";

const numbers = [
  { value: "40+", label: "Products shipped" },
  { value: "3 wks", label: "Average MVP launch" },
  { value: "100%", label: "Client retention" },
  { value: "< 1 day", label: "Reply time" },
];

export function Story() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Our story</Eyebrow>
          </Reveal>

          <div className="flex flex-col gap-7">
            <Manifesto className="display max-w-3xl text-[clamp(1.7rem,3.4vw,2.6rem)] text-ink">
              Most agencies are slow because of how they&rsquo;re shaped, not how hard they work.
            </Manifesto>

            <Reveal delay={0.05}>
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft/80">
                Briefs pass from account manager to designer to developer, and
                something is lost at every handoff. Three months later you get
                back something close to what you asked for, but not quite. We
                started AISquadX because that model made no sense to us — and
                because AI tooling finally made a different one possible.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="max-w-2xl leading-relaxed text-ink-soft/75">
                We work as a small squad that designs and builds in the same
                room. AI handles the repetitive engineering, which means the
                hours go into the parts that actually matter: how the product
                feels, how quickly it responds, whether the words on the page
                convince anyone. A site that used to take a quarter takes a few
                weeks, and it&apos;s better, because we spent that time on
                craft instead of coordination.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="max-w-2xl leading-relaxed text-ink-soft/75">
                We&apos;re deliberately small. A handful of projects at a time,
                each one something we&apos;d be happy to put in the portfolio.
                That&apos;s the whole business model.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-ink/10 bg-ink/10 lg:grid-cols-4">
          {numbers.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col gap-2 bg-paper p-8">
                <span className="display text-4xl text-ink sm:text-5xl">
                  {item.value}
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-mute uppercase">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
