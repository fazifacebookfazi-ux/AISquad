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

export function TechMarquee() {
  return (
    <section className="border-y border-mist-100/10 py-5">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 font-mono text-[11px] tracking-[0.16em] text-mist-500 uppercase">
        {stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
