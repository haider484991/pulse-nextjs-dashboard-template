/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PULSE — single source of truth
 * ─────────────────────────────────────────────────────────────────────────────
 * Product name, navigation, and the signed-in user. Data lives in lib/data.ts.
 */

export const siteConfig = {
  name: "Pulse",
  title: "Pulse — React Admin Dashboard Template",
  description:
    "A free React admin dashboard template built with Next.js 15, TypeScript, and Tailwind CSS v4. Dependency-free SVG charts, sortable tables, and an auth shell.",
  url: "https://pulse.example.com",

  /** Sidebar navigation. Add routes here and create the matching app/ folder. */
  nav: [
    { href: "/", label: "Overview", icon: "grid" },
    { href: "/customers/", label: "Customers", icon: "users" },
  ],

  /** Replace with your real session once you wire up auth. */
  user: {
    name: "Ada Okonkwo",
    email: "ada@pulse.example",
    role: "Owner",
  },

  footerNote: "Built with the free Pulse template by Pixel & Oak.",
} as const;

export type SiteConfig = typeof siteConfig;
