export const site = {
  name: "AISquadX",
  domain: "www.aisquadx.tech",
  url: "https://www.aisquadx.tech",
  tagline: "Design-led engineering studio",
  description:
    "AISquadX designs and ships websites, SaaS products and internal tools. Type, colour and motion are part of the engineering — not a coat of paint at the end.",
  email: "hello@aisquadx.tech",
  location: "Pakistan",
  founder: {
    name: "Faizan Arif",
    role: "Founder & Lead Engineer",
    initials: "FA",
  },
  calendly: "/contact",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/fazifacebookfazi-ux",
    },
  ],
} as const;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
