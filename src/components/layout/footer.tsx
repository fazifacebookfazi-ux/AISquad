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
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-mist-100/[0.07] bg-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand-500/12 blur-[140px]"
      />
      <Container className="relative py-16 lg:py-20">
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
                  className="rounded-full border border-mist-100/10 px-3.5 py-1.5 text-xs text-mist-400 transition-colors hover:border-brand-400/40 hover:text-mist-100"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-mist-400 transition-colors hover:text-mist-100"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist-500">
              Get in touch
            </h3>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-center gap-1.5 font-display text-lg tracking-tight text-mist-100"
            >
              {site.email}
              <ArrowUpRight className="size-4 text-brand-300 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="text-sm text-mist-400">
              Currently taking on new projects for the next quarter.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-mist-100/[0.07] pt-8 text-xs text-mist-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-[0.12em] uppercase">{site.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
