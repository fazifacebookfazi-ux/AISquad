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
    <footer className="relative overflow-hidden border-t-4 border-brand-400 bg-ink-900">
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col items-start gap-5">
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
                  className="border-2 border-mist-100/15 px-3.5 py-1.5 font-mono text-[11px] font-bold tracking-[0.14em] text-mist-400 uppercase transition-colors hover:border-brand-400 hover:bg-brand-400 hover:text-ink-950"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-4">
              <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
                {col.title}
              </h2>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm font-medium text-mist-300 transition-colors hover:text-brand-400"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="flex flex-col items-start gap-4">
            <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brand-400">
              Get in touch
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-1.5 font-display text-xl font-bold tracking-tight text-mist-100"
            >
              {site.email}
              <ArrowUpRight className="size-4 text-brand-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="border-l-4 border-brand-400 pl-4 text-sm leading-relaxed text-mist-400">
              Currently taking on new projects for the next quarter.
            </p>
          </div>
        </div>
      </Container>

      {/* Oversized wordmark sign-off */}
      <div aria-hidden className="relative select-none">
        <Container>
          <p className="font-display text-[18.5vw] leading-[0.8] font-black tracking-[-0.04em] text-mist-100/[0.07] lg:text-[13rem]">
            AISquadX
          </p>
        </Container>
        <div className="border-t-2 border-mist-100/10">
          <Container className="flex flex-col gap-2 py-6 font-mono text-[11px] tracking-[0.08em] text-mist-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {site.name} — {site.domain}
            </p>
            <p>Designed & engineered in Pakistan. Serving the USA & Pakistan.</p>
          </Container>
        </div>
      </div>
    </footer>
  );
}
