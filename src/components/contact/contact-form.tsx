"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import {
  initialContactState,
  submitEnquiry,
  type ContactState,
} from "@/app/contact/actions";
import { serviceDetails } from "@/lib/services";
import { cn } from "@/lib/utils";

const timelines = [
  "As soon as possible",
  "In the next month",
  "This quarter",
  "Just exploring",
];

const fieldBase =
  "w-full border border-mist-100/12 bg-ink-950 px-4 py-3 text-[15px] text-mist-100 transition-colors duration-200 outline-none placeholder:text-mist-500 hover:border-mist-100/25 focus:border-brand-400 focus:bg-ink-900";

function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-sm font-medium text-mist-300"
      >
        {label}
        {optional ? (
          <span className="font-mono text-[10px] tracking-[0.12em] text-mist-500 uppercase">
            Optional
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="size-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-13 w-full items-center justify-center gap-2 bg-brand-400 px-7 font-mono text-[11px] tracking-[0.18em] text-ink-950 uppercase transition-colors duration-300 ease-out-expo hover:bg-brand-300 focus-visible:ring-2 focus-visible:ring-brand-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Sending
        </>
      ) : (
        <>
          Send enquiry
          <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
        </>
      )}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    submitEnquiry,
    initialContactState,
  );
  const id = useId();

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 border border-mist-100/12 p-10">
        <span className="grid size-12 place-items-center bg-brand-400 text-ink-950">
          <Check className="size-6" strokeWidth={2} />
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-mist-100">
          Message received
        </h2>
        <p className="max-w-md leading-relaxed text-mist-400">{state.message}</p>
      </div>
    );
  }

  const { errors = {}, values = {} } = state;

  return (
    <form action={formAction} className="relative flex flex-col gap-6">
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" htmlFor={`${id}-name`} error={errors.name}>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            defaultValue={values.name}
            placeholder="Ada Lovelace"
            className={cn(fieldBase, errors.name && "border-red-500/50")}
          />
        </Field>

        <Field label="Email" htmlFor={`${id}-email`} error={errors.email}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={values.email}
            placeholder="you@company.com"
            className={cn(fieldBase, errors.email && "border-red-500/50")}
          />
        </Field>

        <Field label="Company" htmlFor={`${id}-company`} optional>
          <input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            defaultValue={values.company}
            placeholder="Acme Inc."
            className={fieldBase}
          />
        </Field>

        <Field label="Timeline" htmlFor={`${id}-timeline`} optional>
          <select
            id={`${id}-timeline`}
            name="timeline"
            defaultValue={values.timeline ?? ""}
            className={cn(fieldBase, "appearance-none")}
          >
            <option value="">Select a timeline</option>
            {timelines.map((option) => (
              <option key={option} value={option} className="bg-ink-850">
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="What do you need?" htmlFor={`${id}-service`} optional>
        <select
          id={`${id}-service`}
          name="service"
          defaultValue={values.service ?? ""}
          className={cn(fieldBase, "appearance-none")}
        >
          <option value="">Select a service</option>
          {serviceDetails.map((service) => (
            <option
              key={service.id}
              value={service.title}
              className="bg-ink-850"
            >
              {service.title}
            </option>
          ))}
          <option value="Something else" className="bg-ink-850">
            Something else
          </option>
        </select>
      </Field>

      <Field
        label="Tell us about the project"
        htmlFor={`${id}-message`}
        error={errors.message}
      >
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          defaultValue={values.message}
          placeholder="What are you building, who is it for, and what does success look like?"
          className={cn(
            fieldBase,
            "resize-y",
            errors.message && "border-red-500/50",
          )}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-300"
        >
          <AlertCircle className="size-4 shrink-0" />
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center">
        <SubmitButton />
        <p className="text-xs leading-relaxed text-mist-500">
          We reply within one business day. No newsletters. See{" "}
          <a href="/privacy" className="text-mist-300 underline">
            how we use this
          </a>
          .
        </p>
      </div>
    </form>
  );
}
