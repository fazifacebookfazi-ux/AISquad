import type { Metadata } from "next";
import { InvoiceGenerator } from "@/components/tools/invoice-generator";

export const metadata: Metadata = {
  title: "Invoice & Quote Generator — Free",
  description:
    "Free invoice and quote generator in PKR or USD: add line items, tax and discount, preview instantly, and download as PDF via Print. No sign-up.",
  alternates: { canonical: "/tools/invoice-generator" },
};

export default function InvoiceGeneratorPage() {
  return <InvoiceGenerator />;
}
