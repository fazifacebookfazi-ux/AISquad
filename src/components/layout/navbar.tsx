"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 320 && y > lastY.current && !open);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [open ]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out-expo",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "transition-all duration-300",
          scrolled && !open
            ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {navLinks.map((link) => {
              const active =
                link.href.startsWith("/") &&
                !link.href.includes("#") &&
                pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "link-sweep text-[15px] font-medium",
                    active ? "text-ink" : "text-ink/60 hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 font-display text-[15px] font-semibold text-paper transition-colors duration-300 hover:bg-accent md:inline-flex"
            >
              Start a project
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden bg-paper transition-[max-height,opacity] duration-500 ease-out-expo md:hidden",
          open ? "max-h-[30rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <Container className="flex flex-col gap-1 border-b border-ink/10 py-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 py-3"
            >
              <span className="font-mono text-xs text-mute">
                0{i + 1}
              </span>
              <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-ink">
                {link.label}
              </span>
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-display text-base font-semibold text-white"
          >
            Start a project
            <ArrowUpRight className="size-4" />
          </Link>
        </Container>
      </div>
    </header>
  );
}
