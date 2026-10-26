import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

export type AnalyzeCheck = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
  fix: string;
};

export type AnalyzeResult = {
  url: string;
  finalUrl: string;
  status: number;
  ttfbMs: number;
  sizeBytes: number;
  score: number;
  title: string | null;
  titleLength: number;
  description: string | null;
  descriptionLength: number;
  h1Count: number;
  headings: { h1: number; h2: number; h3: number; h4: number; h5: number; h6: number };
  imageCount: number;
  imagesMissingAlt: number;
  internalLinks: number;
  externalLinks: number;
  https: boolean;
  viewport: boolean;
  noindex: boolean;
  canonical: string | null;
  checks: AnalyzeCheck[];
};

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
}

function countTag(html: string, tag: string): number {
  const m = html.match(new RegExp(`<${tag}[\\s>]`, "gi"));
  return m ? m.length : 0;
}

export async function POST(req: NextRequest) {
  let input: string;
  try {
    const body = await req.json();
    input = String(body?.url ?? "").trim();
  } catch {
    return NextResponse.json({ error: "Send a JSON body with a url field." }, { status: 400 });
  }

  if (!input) {
    return NextResponse.json({ error: "Enter a website URL to analyse." }, { status: 400 });
  }
  if (!/^https?:\/\//i.test(input)) input = `https://${input}`;

  let target: URL;
  try {
    target = new URL(input);
  } catch {
    return NextResponse.json({ error: "That URL does not look valid. Check it and try again." }, { status: 400 });
  }
  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return NextResponse.json({ error: "Only http and https URLs can be analysed." }, { status: 400 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  const started = Date.now();
  let res: Response;
  try {
    res = await fetch(target.toString(), {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; AISquadX-Analyzer/1.0; +https://www.aisquadx.tech/tools/website-analyzer)",
        accept: "text/html,application/xhtml+xml",
      },
    });
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        error: isTimeout
          ? "The site took longer than 10 seconds to respond, so the analysis timed out."
          : "The site could not be reached. Check the URL, or the site may block automated requests.",
      },
      { status: 502 },
    );
  }
  const ttfbMs = Date.now() - started;
  clearTimeout(timer);

  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) {
    return NextResponse.json(
      { error: `That URL did not return a web page (content type: ${contentType || "unknown"}). Try a normal page URL.` },
      { status: 422 },
    );
  }

  let html: string;
  try {
    html = await res.text();
  } catch {
    return NextResponse.json({ error: "The page body could not be read." }, { status: 502 });
  }
  const sizeBytes = new TextEncoder().encode(html).length;
  const finalUrl = res.url || target.toString();
  let origin: URL;
  try {
    origin = new URL(finalUrl);
  } catch {
    origin = target;
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, "").trim() || null : null;

  const metaTags = [...html.matchAll(/<meta[^>]*>/gi)].map((m) => m[0]);
  let description: string | null = null;
  let viewport = false;
  let noindex = false;
  for (const tag of metaTags) {
    const name = (attr(tag, "name") ?? attr(tag, "property") ?? "").toLowerCase();
    if (name === "description" && description === null) description = attr(tag, "content");
    if (name === "viewport") viewport = true;
    if (name === "robots" && /noindex/i.test(attr(tag, "content") ?? "")) noindex = true;
  }

  const canonicalTag = [...html.matchAll(/<link[^>]*>/gi)]
    .map((m) => m[0])
    .find((t) => (attr(t, "rel") ?? "").toLowerCase() === "canonical");
  const canonical = canonicalTag ? attr(canonicalTag, "href") : null;

  const headings = {
    h1: countTag(html, "h1"),
    h2: countTag(html, "h2"),
    h3: countTag(html, "h3"),
    h4: countTag(html, "h4"),
    h5: countTag(html, "h5"),
    h6: countTag(html, "h6"),
  };

  const imgTags = [...html.matchAll(/<img[^>]*>/gi)].map((m) => m[0]);
  const imagesMissingAlt = imgTags.filter((t) => {
    const alt = attr(t, "alt");
    return alt === null || alt.trim() === "";
  }).length;

  let internalLinks = 0;
  let externalLinks = 0;
  for (const m of html.matchAll(/<a[^>]*href\s*=\s*["']([^"']+)["']/gi)) {
    const href = m[1].trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
    try {
      const u = new URL(href, origin);
      if (u.protocol !== "http:" && u.protocol !== "https:") continue;
      if (u.hostname === origin.hostname) internalLinks += 1;
      else externalLinks += 1;
    } catch {
      // Skip unparseable hrefs.
    }
  }

  const checks: AnalyzeCheck[] = [
    {
      id: "https",
      label: "Served over HTTPS",
      passed: origin.protocol === "https:",
      detail: origin.protocol === "https:" ? "The final URL uses HTTPS." : "The final URL uses plain HTTP.",
      fix: "Move the site to HTTPS with a valid certificate. Browsers warn visitors away from HTTP pages.",
    },
    {
      id: "status",
      label: "Page returns a success status",
      passed: res.status >= 200 && res.status < 300,
      detail: `HTTP status ${res.status}.`,
      fix: "Fix the server response so the page returns HTTP 200. Redirect chains and 404s cost rankings and visitors.",
    },
    {
      id: "ttfb",
      label: "Fast server response (under 1 second)",
      passed: ttfbMs < 1000,
      detail: `Time to first byte: ${ttfbMs} ms.`,
      fix: "Speed up the server: caching, a CDN, and a host closer to your visitors all cut time to first byte.",
    },
    {
      id: "title",
      label: "Page title present and well sized",
      passed: !!title && title.length >= 10 && title.length <= 70,
      detail: title ? `Title is ${title.length} characters: "${title.slice(0, 80)}".` : "No <title> tag found.",
      fix: "Write a unique title of roughly 10–70 characters that includes the page's main keyword near the start.",
    },
    {
      id: "description",
      label: "Meta description present and well sized",
      passed: !!description && description.length >= 50 && description.length <= 160,
      detail: description ? `Meta description is ${description.length} characters.` : "No meta description found.",
      fix: "Add a meta description of roughly 50–160 characters that summarises the page and invites the click.",
    },
    {
      id: "h1",
      label: "Exactly one H1 heading",
      passed: headings.h1 === 1,
      detail: `Found ${headings.h1} H1 heading(s).`,
      fix: "Use exactly one H1 per page, matching the page's main topic. Demote extra H1s to H2.",
    },
    {
      id: "viewport",
      label: "Mobile viewport configured",
      passed: viewport,
      detail: viewport ? "Viewport meta tag found." : "No viewport meta tag found.",
      fix: "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> so the page scales on phones.",
    },
    {
      id: "alt",
      label: "Images carry alt text",
      passed: imagesMissingAlt === 0,
      detail:
        imgTags.length === 0
          ? "No images found on the page."
          : `${imgTags.length - imagesMissingAlt} of ${imgTags.length} images have alt text.`,
      fix: "Give every meaningful image a short, descriptive alt attribute. Leave purely decorative images with an empty alt.",
    },
    {
      id: "size",
      label: "Page size under 2 MB",
      passed: sizeBytes < 2 * 1024 * 1024,
      detail: `HTML size: ${(sizeBytes / 1024).toFixed(0)} KB.`,
      fix: "Trim the HTML payload: remove unused scripts and styles, and defer anything the first paint does not need.",
    },
    {
      id: "links",
      label: "Internal links present",
      passed: internalLinks > 0,
      detail: `${internalLinks} internal link(s), ${externalLinks} external link(s).`,
      fix: "Link to other relevant pages on the same site. Internal links help visitors and search engines find your content.",
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  const result: AnalyzeResult = {
    url: target.toString(),
    finalUrl,
    status: res.status,
    ttfbMs,
    sizeBytes,
    score,
    title,
    titleLength: title ? title.length : 0,
    description,
    descriptionLength: description ? description.length : 0,
    h1Count: headings.h1,
    headings,
    imageCount: imgTags.length,
    imagesMissingAlt,
    internalLinks,
    externalLinks,
    https: origin.protocol === "https:",
    viewport,
    noindex,
    canonical,
    checks,
  };

  return NextResponse.json(result);
}
