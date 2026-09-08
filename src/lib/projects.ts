export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  year: string;
  tags: string[];
  /** Two tailwind-friendly hex stops used for the placeholder cover. */
  gradient: [string, string];
  href?: string;
  featured?: boolean;
};

/**
 * Replace these with real case studies. Keeping the shape identical means the
 * homepage and /projects grid pick up new entries automatically.
 */
export const projects: Project[] = [
  {
    slug: "nimbus-analytics",
    title: "Nimbus Analytics",
    summary:
      "A realtime product analytics dashboard with cohort tracking, funnels and shareable reports.",
    category: "SaaS platform",
    year: "2025",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    gradient: ["#5b63f5", "#22c1cf"],
    featured: true,
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
  },
];
