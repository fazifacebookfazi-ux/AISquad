import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Archivo, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/json-ld";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { site } from "@/lib/site";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grot",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-arch",
  display: "swap",
  weight: ["400", "500", "600"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-spacemono",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.seoTitle}`,
    template: `%s — ${site.name}`,
  },
  description: site.seoDescription,
  verification: {
    google: "Utz1p0hrRwGZ8p8cxRdXNZEwKMUwLJ-ybkS0mMqp-DQ",
  },
  keywords: [
    "web development studio",
    "web development agency",
    "AI integration services",
    "SaaS development",
    "Next.js development",
    "software house Pakistan",
    "web development company USA",
    "AI-assisted engineering",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.seoTitle}`,
    description: site.seoDescription,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.seoTitle}`,
    description: site.seoDescription,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-pt-24">
      <body
        className={`${grotesk.variable} ${archivo.variable} ${spaceMono.variable} antialiased`}
      >
        <SmoothScroll />
        <JsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
