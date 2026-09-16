import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
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
    <footer className="relative overflow-hidden border-t border-mist-100/10 bg-ink-900">
      <Container className="relative pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-mist-400">
              {site.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-mist-100/12 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-mist-400 uppercase transition-colors hover:border-brand-400 hover:text-brand-400"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-mist-400 transition-colors hover:text-mist-100"
                    >
                      <span className="h-px w-0 bg-brand-400 transition-all duration-300 ease-out-expo group-hover:w-4" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500">
              Get in touch
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-1.5 font-display text-xl tracking-tight text-mist-100 italic"
            >
              {site.email}
              <ArrowUpRight className="size-4 text-brand-300 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-sm text-mist-400">
              Currently taking on new projects for the next quarter.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-mist-100/10 pt-8 text-[11px] leading-relaxed text-mist-500 sm:flex-row sm:items-end">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.domain}
          </p>
          <p className="max-w-sm sm:text-right">
            Colophon: Fraunces for display, Inter for text, JetBrains Mono for
            figures. Palette in oklab.
          </p>
        </div>

        {/* Oversized wordmark — the studio sign-off. */}
        <div aria-hidden className="pointer-events-none mt-10 select-none">
          <p className="bg-gradient-to-b from-mist-100/[0.09] to-mist-100/[0.015] bg-clip-text text-center font-display text-[clamp(4.5rem,18.5vw,17rem)] leading-[0.82] font-medium tracking-[-0.05em] text-transparent whitespace-nowrap italic">
            AISquadX
          </p>
        </div>
      </Container>
    </footer>
  );
}
