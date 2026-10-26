import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileDown, Gauge, ReceiptText } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Free Tools",
  description:
    "Free tools from AISquadX: a website speed and SEO analyzer, in-browser PDF and image tools, and an invoice and quote generator in PKR or USD. No sign-up.",
  alternates: { canonical: "/tools" },
};

const TOOLS = [
  {
    href: "/tools/website-analyzer",
    icon: Gauge,
    title: "Website Speed & SEO Analyzer",
    benefit:
      "Paste any URL and get a real, measured audit — speed, HTTPS, titles, headings, images and links — with plain-language fixes.",
  },
  {
    href: "/tools/file-tools",
    icon: FileDown,
    title: "Free File Tools",
    benefit:
      "Merge, split and optimise PDFs; compress, resize and convert images. Everything runs in your browser — nothing is ever uploaded.",
  },
  {
    href: "/tools/invoice-generator",
    icon: ReceiptText,
    title: "Invoice & Quote Generator",
    benefit:
      "Build a professional invoice or quote in PKR or USD, preview it live, and save it as a PDF. No account, no watermark.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free tools"
        title={
          <>
            Useful tools,{" "}
            <span className="italic text-brand-400">free forever</span>
          </>
        }
        description="Small, sharp tools we built for everyone — no sign-up, no paywall, no catch. If one of them saves you an hour, it did its job."
      />
      <Container className="pb-24">
        <div className="grid gap-5 md:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="surface crop-marks group flex flex-col rounded-2xl p-6 transition hover:border-brand-400/50"
            >
              <tool.icon className="h-9 w-9 text-brand-400" />
              <h2 className="mt-5 font-display text-2xl leading-tight text-mist-100">
                {tool.title}
              </h2>
              <p className="mt-2 flex-1 leading-relaxed text-mist-400">
                {tool.benefit}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium text-mist-100 transition group-hover:text-brand-300">
                Open tool
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
