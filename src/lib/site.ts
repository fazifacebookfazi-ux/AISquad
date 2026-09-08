export const site = {
  name: "AISquadX",
  domain: "aisquadx.tech",
  url: "https://aisquadx.tech",
  tagline: "AI-native web development studio",
  description:
    "AISquadX is an AI-native studio building fast, beautiful websites, SaaS products and internal tools — from raw idea to shipped product.",
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
