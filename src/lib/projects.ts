export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  /** URL segment — must be unique and lowercase. */
  slug: string;
  title: string;
  /** One line for cards and search results. */
  summary: string;
  category: ProjectCategory;
  year: string;
  tags: string[];
  /** Two hex stops for the generated cover. Ignored when `cover` is set. */
  gradient: [string, string];
  /** Optional real screenshot, e.g. "/projects/nimbus.png" in /public. */
  cover?: string;
  featured?: boolean;

  // ---- Case study fields ----
  client: string;
  role: string;
  duration: string;
  liveUrl?: string;
  repoUrl?: string;
  /** Lead paragraph on the case study page. */
  intro: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: ProjectMetric[];
  stack: string[];
};

export const projectCategories = [
  "Web platform",
  "SaaS platform",
  "Marketing site",
  "AI product",
  "MVP sprint",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/**
 * Replace these with your real work. Every field is used somewhere on
 * /projects or /projects/[slug], so filling them all in gives you a complete
 * case study with no component changes.
 */
export const projects: Project[] = [
  {
    slug: "startupai-tools",
    title: "StartupAI Tools",
    summary:
      "A directory of 100+ free browser-based utilities — developer tools, SEO helpers and AI assistants, with no signup and no ads.",
    category: "Web platform",
    year: "2025",
    tags: ["Next.js", "AI-built", "Vercel"],
    gradient: ["#5b63f5", "#22c1cf"],
    featured: true,
    client: "In-house product",
    role: "Solo build — product, design, development & SEO",
    duration: "Ongoing",
    liveUrl: "https://aitoolspro.tech",
    intro:
      "Every free tool site on the internet asks the same thing of you: sit through a popup, make an account, then wait while your file uploads to someone else's server just to format some JSON. StartupAI Tools exists because none of that is necessary.",
    challenge:
      "The problem with a hundred-tool directory isn't building any single tool — it's that a hundred of anything usually means a hundred inconsistencies. Different layouts, different quality, pages that take seconds to load, and a structure search engines can't make sense of. On top of that, tools handling people's text and images can't credibly promise privacy while quietly uploading everything to a backend.",
    approach: [
      "Built the whole platform on Next.js with pages prerendered as static HTML, so every tool loads instantly from the edge instead of waiting on a server.",
      "Ran the processing client-side wherever it was possible — the JSON formatter, Base64 encoder and converters never send data anywhere, which turns the privacy claim into a fact rather than a promise.",
      "Organised 100+ tools into six clear categories — text and content, SEO, developer utilities, calculators, generators and number conversion — so the directory stays navigable as it grows.",
      "Used AI-assisted development to build tools in parallel rather than sequentially, which is the only reason a catalogue this size is maintainable by one person.",
      "Went further than utilities with flagship builds: ZenNote AI turns unstructured brain-dumps into action plans, TradingFEST streams live rates across 18 exchanges, and the resume studio exports vector PDFs with no watermark.",
      "Treated SEO as architecture — semantic markup, per-tool metadata and an llms.txt generator that configures how AI search engines crawl the site.",
    ],
    outcome:
      "The site now runs over a hundred tools from a single directory, serving developers, marketers and students without a single signup wall or ad unit. It's deployed on Vercel with pages served from cache, and new tools ship continuously based on what people actually ask for.",
    metrics: [
      { value: "100+", label: "Tools live in one directory" },
      { value: "6", label: "Categories, from dev to finance" },
      { value: "18", label: "Exchange feeds in TradingFEST" },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "AI-assisted development",
      "Vercel",
    ],
  },
  {
    slug: "nimbus-analytics",
    title: "Nimbus Analytics",
    summary:
      "A realtime product analytics dashboard with cohort tracking, funnels and shareable reports.",
    category: "SaaS platform",
    year: "2025",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    gradient: ["#4740d4", "#4fd6e0"],
    client: "Nimbus",
    role: "Design & full-stack development",
    duration: "9 weeks",
    intro:
      "Nimbus came to us with a working data pipeline and no product around it. Their customers were reading insights out of spreadsheets that someone exported by hand every Monday.",
    challenge:
      "The hard part wasn't charts — it was making millions of events feel instant. Early prototypes took eleven seconds to load a single funnel, which is long enough that people stop trusting the numbers. We also had to design an interface that a non-technical marketer could use without training.",
    approach: [
      "Rebuilt the query layer with pre-aggregated rollup tables so common questions resolve from a small index instead of scanning raw events.",
      "Streamed dashboards in with React Server Components, so the page frame and filters render immediately while charts fill in.",
      "Designed a filter model around plain-language questions rather than database concepts.",
      "Shipped self-serve billing with Stripe, including seat-based plans and a usage meter.",
    ],
    outcome:
      "Nimbus launched publicly nine weeks after our first call, moved their existing spreadsheet customers onto paid plans, and now sell the dashboard as the product rather than the data pipeline behind it.",
    metrics: [
      { value: "11s → 0.4s", label: "Funnel query time" },
      { value: "9 weeks", label: "Concept to public launch" },
      { value: "98", label: "Lighthouse performance" },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Stripe",
      "Tailwind CSS",
    ],
  },
  {
    slug: "atlas-studio",
    title: "Atlas Studio",
    summary:
      "Brand site and CMS for a design consultancy, with editorial case studies and motion-led storytelling.",
    category: "Marketing site",
    year: "2025",
    tags: ["Next.js", "Sanity", "Motion"],
    gradient: ["#7f8cff", "#4740d4"],
    client: "Atlas Studio",
    role: "Design & development",
    duration: "3 weeks",
    intro:
      "A design consultancy whose own website was undermining their pitch. Beautiful client work, presented in a template they'd outgrown four years earlier.",
    challenge:
      "Their case studies were long, image-heavy and completely different from one another — some were photo essays, some were product walkthroughs. A single rigid page template would have flattened all of that, but a bespoke build per case study wasn't something their team could maintain.",
    approach: [
      "Built a block-based CMS schema so each case study is composed from a library of layouts rather than forced into one shape.",
      "Art-directed the typography first — a serif and grotesque pairing that carries the brand without heavy imagery.",
      "Added scroll-linked motion that reveals work progressively, tuned to stay calm rather than showy.",
      "Optimised every image through the Next.js pipeline, holding page weight under a megabyte despite the photography.",
    ],
    outcome:
      "The team now publishes new case studies themselves in an afternoon. Inbound enquiries roughly doubled in the quarter after launch, and the average visitor reads two case studies per session instead of bouncing from the homepage.",
    metrics: [
      { value: "2×", label: "Inbound enquiries" },
      { value: "3 weeks", label: "Design to launch" },
      { value: "0.8s", label: "Largest contentful paint" },
    ],
    stack: ["Next.js", "Sanity", "Motion", "Tailwind CSS", "Vercel"],
  },
  {
    slug: "loop-assistant",
    title: "Loop Assistant",
    summary:
      "An AI support agent that reads your docs and answers customer questions inside the product.",
    category: "AI product",
    year: "2024",
    tags: ["OpenAI", "RAG", "Vercel"],
    gradient: ["#22c1cf", "#5b63f5"],
    featured: true,
    client: "Loop",
    role: "AI engineering & interface design",
    duration: "6 weeks",
    intro:
      "Loop's support team was answering the same forty questions every week, all of which were already documented somewhere nobody could find.",
    challenge:
      "Generic chatbots were a non-starter — a support answer that sounds confident and is wrong costs more than no answer at all. Every response had to be traceable back to a real documentation page, and the assistant had to know when to stop and hand over to a human.",
    approach: [
      "Built a retrieval pipeline over their docs with pgvector, chunked by section so citations point at something a customer can actually read.",
      "Constrained the model to answer only from retrieved context, with an explicit escalation path when confidence is low.",
      "Streamed responses token by token with inline source links, so users see the reasoning as it arrives.",
      "Added an evaluation harness over real historical tickets to measure accuracy before anything shipped to customers.",
    ],
    outcome:
      "The assistant now resolves a little over half of incoming questions without a human, and every answer it gives links to the documentation it came from. Support handles the genuinely hard tickets instead of the repetitive ones.",
    metrics: [
      { value: "54%", label: "Tickets auto-resolved" },
      { value: "100%", label: "Answers with citations" },
      { value: "6 weeks", label: "Build to production" },
    ],
    stack: [
      "Next.js",
      "Vercel AI SDK",
      "OpenAI",
      "pgvector",
      "PostgreSQL",
    ],
  },
  {
    slug: "ledgerly",
    title: "Ledgerly",
    summary:
      "Invoicing and expense tracking for freelancers, launched as an MVP in under four weeks.",
    category: "MVP sprint",
    year: "2024",
    tags: ["Supabase", "Stripe", "React"],
    gradient: ["#4fd6e0", "#4740d4"],
    client: "Ledgerly",
    role: "Product design & development",
    duration: "4 weeks",
    intro:
      "A solo founder with a clear thesis about freelance invoicing, a deadline for an accelerator application, and no engineering team.",
    challenge:
      "Four weeks is not enough time to build the product she eventually wants, so the real work was deciding what to leave out. Invoicing also touches money and tax, which means the parts we did build had to be correct rather than approximate.",
    approach: [
      "Ran a scoping session that cut the feature list roughly in half, keeping only what proves the thesis.",
      "Used Supabase for auth, database and storage to avoid spending sprint time on infrastructure.",
      "Built invoice generation and PDF export first, since that was the one thing users would judge.",
      "Wired up Stripe subscriptions from day one so the accelerator demo showed real revenue mechanics.",
    ],
    outcome:
      "Ledgerly shipped in twenty-six days, got into the accelerator, and onboarded its first paying users during the programme. The codebase became the foundation of the product rather than a prototype to be thrown away.",
    metrics: [
      { value: "26 days", label: "Idea to live product" },
      { value: "Accepted", label: "Accelerator application" },
      { value: "0", label: "Rewrites needed after" },
    ],
    stack: ["React", "Next.js", "Supabase", "Stripe", "Tailwind CSS"],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/** Cycles to the next project so case studies always link onward. */
export function getAdjacentProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
