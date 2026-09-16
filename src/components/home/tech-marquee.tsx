const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "PyTorch",
  "FFmpeg",
  "Vercel",
];

/**
 * Full-bleed lime marquee band — the signature divider.
 * Slightly rotated for energy, thick ink borders.
 */
export function TechMarquee() {
  const row = [...stack, ...stack];

  return (
    <section aria-label="Technologies we use" className="relative z-10 -my-5 overflow-hidden">
      <div className="-mx-4 -rotate-1 border-y-4 border-ink-950 bg-brand-400 py-4">
        <div className="marquee-paused overflow-hidden">
          <ul className="animate-marquee-fast flex w-max items-center gap-10 pr-10">
            {row.map((item, i) => (
              <li
                key={`${item}-${i}`}
                className="flex items-center gap-10 font-mono text-sm font-black tracking-[0.18em] whitespace-nowrap text-ink-950 uppercase"
              >
                {item}
                <span aria-hidden className="inline-block size-2.5 rotate-45 bg-ink-950" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
