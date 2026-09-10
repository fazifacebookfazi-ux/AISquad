const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind",
  "Python",
  "PyTorch",
  "FFmpeg",
  "FastAPI",
  "PostgreSQL",
  "Vercel",
];

export function TechMarquee() {
  return (
    <section className="overflow-hidden border-y border-mist-100/10 py-6">
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex w-max gap-10 pr-10">
          {[...stack, ...stack].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="font-display text-4xl tracking-tight text-mist-100/25 italic sm:text-5xl"
            >
              {item}
              <span className="ml-10 text-brand-400/50">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
