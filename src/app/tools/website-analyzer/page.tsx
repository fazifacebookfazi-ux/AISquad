import type { Metadata } from "next";
import { AnalyzerTool } from "@/components/tools/analyzer-tool";

export const metadata: Metadata = {
  title: "Website Speed & SEO Analyzer",
  description:
    "Free website speed and SEO analyzer: check any URL for HTTPS, page speed, title, meta description, headings, image alt text and links — with plain-language fixes.",
  alternates: { canonical: "/tools/website-analyzer" },
};

export default function WebsiteAnalyzerPage() {
  return <AnalyzerTool />;
}
