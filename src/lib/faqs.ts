// NOTE: question/answer strings must stay byte-identical — FAQPage schema
// depends on them. This module has no "use client" so server components
// (page.tsx -> FaqJsonLd) can import the data at build time.
export const faqs = [
  {
    q: "What exactly is “vibe coding”?",
    a: "It’s our AI-assisted build process. You describe the product in plain language, we translate that into working software in tight loops — often with something clickable on day one. The engineering rigour stays; only the slow parts disappear.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends entirely on scope, so we quote per project rather than publishing a price list. Tell us what you have in mind and you'll get a fixed number — plus what's included and what isn't — within a day. Nothing starts until you've agreed to it.",
  },
  {
    q: "How long until I see something real?",
    a: "You get a live preview link in the first week. Most marketing sites launch in 2–3 weeks and MVPs in 4–6, depending on scope.",
  },
  {
    q: "Do I own the code?",
    a: "Completely. Everything ships to your GitHub organisation and your hosting account, with no lock-in and no licensing strings attached.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Yes. We regularly inherit half-finished projects — we start with an audit, tell you honestly what’s salvageable, then get it to production.",
  },
  {
    q: "What happens after launch?",
    a: "We can stay on for maintenance, performance work and new features, or hand over full documentation so your team runs with it.",
  },
];
