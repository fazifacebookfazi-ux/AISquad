import {
  Blocks,
  Bot,
  Gauge,
  LayoutTemplate,
  Sparkles,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export type ServiceDetail = {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  stack: string[];
  timeline: string;
  engagement: string;
  bestFor: string;
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: "web",
    icon: LayoutTemplate,
    title: "Web development",
    tagline: "Sites that load instantly and convert",
    description:
      "Marketing sites, landing pages and company platforms built on Next.js. Every page is server-rendered for speed and search, wired to a CMS so your team can publish without opening a code editor.",
    deliverables: [
      "Custom design, no templates",
      "Responsive from 320px to ultrawide",
      "CMS so you can edit copy and images yourself",
      "Technical SEO, sitemap and structured data",
      "Analytics and conversion tracking",
      "Deployed to your Vercel account",
    ],
    stack: ["Next.js", "Tailwind CSS", "Sanity", "Vercel"],
    timeline: "2–4 weeks",
    engagement: "Fixed-price project",
    bestFor: "Founders and studios who need a credible presence, fast.",
  },
  {
    id: "saas",
    icon: Blocks,
    title: "SaaS product build",
    tagline: "From empty repo to paying customers",
    description:
      "The unglamorous foundations of a real product — authentication, subscriptions, permissions, dashboards and admin tooling — built once, built properly, so you can spend your time on the features that differentiate you.",
    deliverables: [
      "Auth with email, OAuth and team accounts",
      "Stripe subscriptions, plans and billing portal",
      "Role-based permissions and multi-tenancy",
      "Dashboards, tables and data visualisation",
      "Admin panel for your internal team",
      "Transactional email and notifications",
    ],
    stack: ["Next.js", "PostgreSQL", "Prisma", "Stripe", "Supabase"],
    timeline: "4–10 weeks",
    engagement: "Fixed-price project",
    bestFor:
      "Teams turning a validated idea into a revenue-generating product.",
  },
  {
    id: "vibe",
    icon: Wand2,
    title: "Vibe coding sprints",
    tagline: "Describe it on Monday, click it on Friday",
    description:
      "Our AI-native build loop. You talk through the product in plain language and we translate it into working software in tight daily cycles — with a live preview link from day one, so feedback happens against real screens instead of mockups.",
    deliverables: [
      "Working prototype within the first week",
      "Daily preview deployments you can click through",
      "Rapid iteration on live feedback",
      "Clean, handover-ready code — not throwaway output",
      "A clear route from prototype to production",
    ],
    stack: ["Next.js", "AI tooling", "Vercel Previews"],
    timeline: "1–3 weeks",
    engagement: "Fixed-price sprint",
    bestFor:
      "Validating an idea, or getting something real in front of investors.",
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI integration",
    tagline: "Intelligence woven into your product",
    description:
      "Assistants, search and automation that use your own data. We build retrieval pipelines that cite their sources and agents scoped tightly enough to actually trust, then measure whether they're helping.",
    deliverables: [
      "Chat assistants grounded in your documentation",
      "RAG pipelines with vector search and citations",
      "Workflow automation and background agents",
      "Streaming responses with graceful fallbacks",
      "Cost controls, rate limiting and usage tracking",
    ],
    stack: ["OpenAI", "Vercel AI SDK", "pgvector", "LangChain"],
    timeline: "2–6 weeks",
    engagement: "Fixed-price project",
    bestFor: "Products where AI should be a feature, not the whole pitch.",
  },
  {
    id: "design",
    icon: Sparkles,
    title: "UI/UX design",
    tagline: "Interfaces with a point of view",
    description:
      "Typography, colour, spacing and motion treated as engineering problems. You get a design system your developers can build against for years, not a folder of static screens that drift out of date.",
    deliverables: [
      "Design system with tokens and components",
      "High-fidelity screens for every key flow",
      "Motion and interaction specification",
      "Accessibility to WCAG AA",
      "Figma handoff your team can extend",
    ],
    stack: ["Figma", "Design tokens", "Motion"],
    timeline: "2–5 weeks",
    engagement: "Fixed-price project",
    bestFor: "Products that work but don't yet feel premium.",
  },
  {
    id: "care",
    icon: Gauge,
    title: "Performance & care",
    tagline: "Stay fast long after launch",
    description:
      "Sites decay. Dependencies age, images creep in, scores slide. We audit what's slowing you down, fix it, and stay on to keep things healthy while you focus on the business.",
    deliverables: [
      "Core Web Vitals audit with a prioritised fix list",
      "Bundle, image and font optimisation",
      "Accessibility and SEO review",
      "Monitoring, uptime and error alerting",
      "Monthly dependency and security updates",
      "A named person who answers your messages",
    ],
    stack: ["Lighthouse", "Sentry", "Vercel Analytics"],
    timeline: "Ongoing",
    engagement: "Monthly retainer",
    bestFor: "Live products that need to stay quick and stay online.",
  },
];

export type EngagementTier = {
  name: string;
  duration: string;
  terms: string;
  summary: string;
  includes: string[];
  featured?: boolean;
};

export const engagementTiers: EngagementTier[] = [
  {
    name: "Launch sprint",
    duration: "1–3 weeks",
    terms: "Fixed price, agreed upfront",
    summary:
      "One focused push to get something real live — a landing page, a prototype or an MVP.",
    includes: [
      "Discovery call and fixed scope",
      "Design and build in one sprint",
      "Live preview from day one",
      "Deployment and domain setup",
      "Two weeks of post-launch fixes",
    ],
  },
  {
    name: "Product build",
    duration: "4–10 weeks",
    terms: "Fixed price, agreed upfront",
    summary:
      "A complete product, end to end — design system, full application, billing and launch.",
    includes: [
      "Everything in Launch sprint",
      "Full design system",
      "Auth, billing and dashboards",
      "AI features where they earn their place",
      "Weekly demos and a shared roadmap",
      "30 days of support after launch",
    ],
    featured: true,
  },
  {
    name: "Partner retainer",
    duration: "Monthly",
    terms: "Rolling, cancel anytime",
    summary:
      "An ongoing team on call for iteration, maintenance and whatever ships next.",
    includes: [
      "A reserved block of build time each month",
      "Performance and dependency upkeep",
      "Monitoring and error alerting",
      "Priority response on a shared channel",
      "Rolls over — nothing is wasted",
    ],
  },
];
