import type { Metadata } from "next";
import { FileTools } from "@/components/tools/file-tools";

export const metadata: Metadata = {
  title: "Free File Tools — PDF & Image Tools",
  description:
    "Free PDF and image tools that run entirely in your browser: merge, split and optimise PDFs, and compress, resize and convert images. Nothing is uploaded anywhere.",
  alternates: { canonical: "/tools/file-tools" },
};

export default function FileToolsPage() {
  return <FileTools />;
}
