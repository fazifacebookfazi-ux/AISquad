import { Container } from "@/components/ui/container";

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Supabase",
  "PostgreSQL",
  "Stripe",
  "OpenAI",
  "Vercel",
  "Framer Motion",
  "Prisma",
];

export function TechMarquee() {
  return (
    <section className="border-y border-mist-100/[0.07] bg-ink-900/60 py-10">
      <Container>
        <p className="text-center font-mono text-[11px] tracking-[0.2em] text-mist-500 uppercase">
          Built with a modern, production-grade stack
        </p>
      </Container>

      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-4 pr-4">
          {[...stack, ...stack].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="rounded-full border border-mist-100/[0.08] bg-mist-100/[0.03] px-5 py-2.5 text-sm whitespace-nowrap text-mist-300"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
