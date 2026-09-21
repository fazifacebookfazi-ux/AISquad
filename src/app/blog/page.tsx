import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/page-header";
import { CategoryFilter } from "@/components/blog/category-filter";
import { CTA } from "@/components/home/cta";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Notes on Building for the Web",
  description:
    "Practical notes from AISquadX on web development, AI integration, SaaS and design — pricing guides, honest comparisons and what we learn shipping for clients in the USA and Pakistan.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={
          <>
            Notes on{" "}
            <span className="italic text-brand-400">building</span> for the web
          </>
        }
        description="Pricing guides, honest comparisons and lessons from the studio — written by the people who ship the work."
      />

      <Container className="pb-24 lg:pb-32">
        <CategoryFilter posts={posts} />
      </Container>

      <CTA />
    </>
  );
}
