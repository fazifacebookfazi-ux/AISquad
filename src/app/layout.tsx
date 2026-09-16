import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.seoTitle}`,
    template: `%s — ${site.name}`,
  },
  description: site.seoDescription,
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#080706" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="scroll-pt-24"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} antialiased`}
      >
        <ThemeProvider>
          <JsonLd />
          <a
            href="#main"
            className="bg-brand-400 text-ink-950 focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 sr-only focus:not-sr-only"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
