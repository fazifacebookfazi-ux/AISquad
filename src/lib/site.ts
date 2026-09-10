export const site = {
  name: "AISquadX",
  domain: "aisquadx.tech",
  url: "https://aisquadx.tech",
  tagline: "Design-led engineering studio",
  description:
    "AISquadX designs and ships websites, SaaS products and internal tools. Type, colour and motion are part of the engineering — not a coat of paint at the end.",
  email: "hello@aisquadx.tech",
  // TODO: replace with your real name before launch — used on the about page.
  founder: {
    name: "Your Name",
    role: "Founder & Lead Engineer",
    initials: "AX",
  },
  calendly: "/contact",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
