"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    const text = `${title} — AISquadX`;
    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
        return;
      } catch {
        // User dismissed the sheet — fall through to copy.
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const url =
    typeof window === "undefined" ? "" : encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`${title} — AISquadX`);

  const links = [
    {
      label: "Post on X",
      href: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${text}%20${url}`,
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center gap-2 rounded-full border border-mist-100/15 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-mist-300 uppercase transition-colors hover:border-brand-400 hover:text-brand-300"
      >
        {copied ? <Check className="size-3.5" /> : <Link2 className="size-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-mist-100/15 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-mist-400 uppercase transition-colors hover:border-mist-100/35 hover:text-mist-100"
        >
          {link.label}
        </a>
      ))}
      <a
        href={`mailto:?subject=${text}&body=${url}`}
        aria-label="Share by email"
        className="inline-flex items-center gap-2 rounded-full border border-mist-100/15 px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-mist-400 uppercase transition-colors hover:border-mist-100/35 hover:text-mist-100"
      >
        <Mail className="size-3.5" />
        Email
      </a>
    </div>
  );
}
