import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.name} handles the details you send through the contact form.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        description="Short version: we use what you send to reply to you. We do not sell it, and we do not add you to a list."
      />
      <Container className="max-w-2xl pb-24 text-base leading-relaxed text-mist-400">
        <div className="flex flex-col gap-8">
          <p>
            If you submit the contact form, we receive your name, email, and
            whatever you write about the project, plus optional company,
            service and timeline. That message is emailed to {site.email} so
            we can reply.
          </p>
          <p>
            We keep enquiries long enough to do the work — typically months,
            not years — then delete them from our mailbox when they are no
            longer needed. Hosting and email providers (Vercel and our mail
            vendor) process that data as part of sending the message.
          </p>
          <p>
            The site uses privacy-friendly analytics on Vercel (page views, no
            advertising profiles). You can write to {site.email} if you want
            an enquiry erased.
          </p>
          <p>
            <Link href="/contact" className="text-mist-100 underline">
              Back to contact
            </Link>
          </p>
        </div>
      </Container>
    </>
  );
}
