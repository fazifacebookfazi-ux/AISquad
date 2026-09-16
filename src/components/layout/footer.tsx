import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web development", href: "/services#web" },
      { label: "SaaS product build", href: "/services#saas" },
      { label: "Vibe coding sprints", href: "/services#vibe" },
      { label: "AI integration", href: "/services#ai" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "About", href: "/about" },
      { label: "Process", href: "/#process" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      {/* Giant CTA */}
      <Container className="pt-24 pb-16 lg:pt-32">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.22em] text-paper/50 uppercase">
            Got a project in mind?
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Link href="/contact" className="group mt-6 block">
            <span className="display block text-[clamp(3rem,10vw,8.5rem)] text-paper transition-colors duration-300">
              Let&apos;s build it{" "}
              <span className="inline-flex items-center justify-center rounded-full bg-accent align-middle transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                <ArrowUpRight
                  className="size-[clamp(2rem,6vw,5rem)] p-[0.6em] text-white"
                  strokeWidth={2}
                />
              </span>
            </span>
          </Link>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-8 max-w-md text-base leading-relaxed text-paper/60">
            A plan, a timeline and a fixed price within a day. Nothing starts
            until you agree to it.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-8">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-display text-base font-semibold text-white transition-colors duration-300 hover:bg-accent-deep"
              >
                Start a project
                <ArrowUpRight className="size-4" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </Container>

      {/* Link columns */}
      <Container className="pb-10">
        <div className="grid gap-12 border-t border-paper/15 pt-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo light />
            <p className="max-w-xs text-sm leading-relaxed text-paper/55">
              {site.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-paper/20 px-4 py-1.5 font-mono text-[11px] tracking-[0.14em] text-paper/60 uppercase transition-colors hover:border-accent hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] tracking-[0.18em] text-paper/45 uppercase">
                {col.title}
              </h3>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="link-sweep text-[15px] text-paper/70 hover:text-paper"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[11px] tracking-[0.18em] text-paper/45 uppercase">
              Get in touch
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-1.5 font-display text-xl font-semibold tracking-[-0.02em] text-paper"
            >
              {site.email}
              <ArrowUpRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-sm leading-relaxed text-paper/55">
              Currently taking on new projects for the next quarter.
            </p>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark */}
      <div aria-hidden className="select-none overflow-hidden px-2">
        <p className="display -mb-[0.16em] text-center text-[clamp(4rem,17.5vw,17rem)] whitespace-nowrap text-paper/[0.07]">
          AISquadX
        </p>
      </div>

      <Container className="border-t border-paper/15 py-6">
        <div className="flex flex-col gap-2 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.domain}
          </p>
          <p>
            Set in Space Grotesk, Archivo &amp; Space Mono.
          </p>
        </div>
      </Container>
    </footer>
  );
}
