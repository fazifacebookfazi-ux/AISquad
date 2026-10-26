"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Globe,
  Loader2,
  Search,
  XCircle,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import type { AnalyzeResult } from "@/app/api/analyze/route";

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function scoreLabel(score: number) {
  if (score >= 90) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Needs work";
  return "Poor";
}

export function AnalyzerTool() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    const value = url.trim();
    if (!value) {
      setError("Enter a website URL first.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "The analysis failed. Try again.");
        return;
      }
      setResult(data as AnalyzeResult);
    } catch {
      setError("Something went wrong reaching the analyzer. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const passed = result?.checks.filter((c) => c.passed).length ?? 0;

  return (
    <>
      <PageHeader
        eyebrow="Free tool"
        title={
          <>
            Website speed &{" "}
            <span className="italic text-brand-400">SEO analyzer</span>
          </>
        }
        description="Paste any website address and get a real, measured audit: speed, HTTPS, titles, headings, images and links — plus plain-language fixes. Free, no sign-up."
      />
      <Container className="pb-24">
        <form
          onSubmit={run}
          className="surface crop-marks flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:p-5"
        >
          <label htmlFor="analyze-url" className="sr-only">
            Website URL
          </label>
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-mist-100/15 bg-ink-950/60 px-4 py-3">
            <Globe className="h-5 w-5 shrink-0 text-mist-400" />
            <input
              id="analyze-url"
              type="text"
              inputMode="url"
              autoComplete="off"
              placeholder="example.com or https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent text-base text-mist-100 outline-none placeholder:text-mist-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-400 px-6 py-3 font-medium text-ink-950 transition hover:bg-brand-300 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            {loading ? "Analysing…" : "Analyse site"}
          </button>
        </form>

        {error ? (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent-500/40 bg-accent-500/10 p-5">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
            <p className="text-mist-100">{error}</p>
          </div>
        ) : null}

        {loading ? (
          <div className="mt-10 flex flex-col items-center gap-4 py-16 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-brand-400" />
            <p className="text-mist-400">
              Fetching the page and running the checks… this usually takes a
              few seconds.
            </p>
          </div>
        ) : null}

        {result ? (
          <div className="mt-10 space-y-10">
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <div className="surface rounded-2xl p-6 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mist-400">
                  Overall score
                </p>
                <p className="mt-3 font-display text-7xl leading-none text-mist-100">
                  {result.score}
                  <span className="text-3xl text-mist-400">/100</span>
                </p>
                <p className="mt-2 font-medium text-brand-400">
                  {scoreLabel(result.score)}
                </p>
                <p className="mt-3 text-sm text-mist-400">
                  {passed} of {result.checks.length} checks passed. The score is
                  simply the share of checks passed — nothing is estimated.
                </p>
              </div>
              <div className="surface grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
                {[
                  { label: "HTTP status", value: String(result.status) },
                  { label: "Time to first byte", value: `${result.ttfbMs} ms` },
                  { label: "HTML size", value: formatBytes(result.sizeBytes) },
                  { label: "Images", value: `${result.imageCount}` },
                  { label: "H1 headings", value: `${result.h1Count}` },
                  {
                    label: "Images missing alt",
                    value: `${result.imagesMissingAlt}`,
                  },
                  { label: "Internal links", value: `${result.internalLinks}` },
                  { label: "External links", value: `${result.externalLinks}` },
                ].map((s) => (
                  <div key={s.label} className="bg-ink-900/60 p-5">
                    <p className="text-sm text-mist-400">{s.label}</p>
                    <p className="mt-1 font-display text-2xl text-mist-100">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="break-all text-sm text-mist-400">
                Analysed: {result.finalUrl}
                {result.finalUrl !== result.url ? ` (redirected from ${result.url})` : ""}
              </p>
              {result.noindex ? (
                <p className="mt-2 flex items-start gap-2 text-sm text-accent-400">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  This page carries a robots noindex tag, so search engines are
                  told not to index it.
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {result.checks.map((check) => (
                <div key={check.id} className="surface rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    {check.passed ? (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                    )}
                    <div>
                      <p className="font-medium text-mist-100">{check.label}</p>
                      <p className="mt-1 text-sm text-mist-400">{check.detail}</p>
                      {!check.passed ? (
                        <p className="mt-2 text-sm leading-relaxed text-mist-300">
                          <span className="font-medium text-mist-100">Fix: </span>
                          {check.fix}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-mist-500">
              Note: this audit reads the page HTML only. It does not measure
              images, scripts or stylesheets, so real-world load time may differ
              from the HTML size shown here.
            </p>
          </div>
        ) : null}
      </Container>
    </>
  );
}
