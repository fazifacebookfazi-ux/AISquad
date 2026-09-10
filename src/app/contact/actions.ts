"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<FieldName, string>>;
  values?: Partial<Record<FieldName, string>>;
};

type FieldName =
  | "name"
  | "email"
  | "company"
  | "service"
  | "timeline"
  | "message";

export const initialContactState: ContactState = { status: "idle" };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: FormDataEntryValue | null, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
const buckets = new Map<string, { count: number; reset: number }>();

function allowRequest(ip: string) {
  const now = Date.now();
  const current = buckets.get(ip);
  if (!current || now > current.reset) {
    buckets.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_MAX) return false;
  current.count += 1;
  return true;
}

export async function submitEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Bots fill hidden fields; humans never see this one.
  if (clean(formData.get("website"), 200)) {
    return { status: "success", message: "Thanks — we'll be in touch." };
  }

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";
  if (!allowRequest(ip)) {
    return {
      status: "error",
      message: `Too many messages from this network. Email ${site.email} directly.`,
    };
  }

  const values = {
    name: clean(formData.get("name"), 120),
    email: clean(formData.get("email"), 160),
    company: clean(formData.get("company"), 120),
    service: clean(formData.get("service"), 60),
    timeline: clean(formData.get("timeline"), 60),
    message: clean(formData.get("message"), 4000),
  };

  const errors: Partial<Record<FieldName, string>> = {};
  if (values.name.length < 2) errors.name = "Please tell us your name.";
  if (!EMAIL_PATTERN.test(values.email))
    errors.email = "That email address doesn't look right.";
  if (values.message.length < 20)
    errors.message = "A little more detail helps — 20 characters minimum.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    // Not wired to an email provider yet — don't pretend the message was sent.
    console.warn(
      "[contact] RESEND_API_KEY / CONTACT_FROM_EMAIL are not set. Enquiry not delivered:",
      values,
    );

    if (process.env.NODE_ENV === "development") {
      return {
        status: "success",
        message:
          "Logged to the server console. Set RESEND_API_KEY and CONTACT_FROM_EMAIL to deliver for real.",
      };
    }

    return {
      status: "error",
      message: `Our form isn't accepting messages right now. Please email ${site.email} directly.`,
      values,
    };
  }

  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Company: ${values.company || "—"}`,
    `Service: ${values.service || "—"}`,
    `Timeline: ${values.timeline || "—"}`,
    "",
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `New enquiry — ${values.name}${
          values.company ? ` (${values.company})` : ""
        }`,
        text: lines,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend responded ${response.status}`);
    }
  } catch (error) {
    console.error("[contact] Failed to deliver enquiry:", error);
    return {
      status: "error",
      message: `Something went wrong sending that. Please email ${site.email} directly.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Thanks — your message is in. Expect a reply within one business day.",
  };
}
