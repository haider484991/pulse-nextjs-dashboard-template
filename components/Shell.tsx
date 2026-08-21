"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * App shell: sidebar + topbar. The sidebar collapses to an overlay drawer
 * below `lg`, which is the layout most admin templates get wrong on phones.
 */
export default function Shell({
  children,
  current,
  title,
}: {
  children: React.ReactNode;
  current: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 border-r border-[var(--color-grid)] bg-[var(--color-surface)] transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2.5 border-b border-[var(--color-grid)] px-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-series-1)] text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12h4l3 8 4-16 3 8h4" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </span>
        </div>

        <nav className="p-3" aria-label="Main">
          {siteConfig.nav.map((n) => {
            const active = n.href === current;
            return (
              <a
                key={n.href}
                href={n.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--color-plane)] text-[var(--color-ink)]"
                    : "text-[var(--color-ink-2)] hover:bg-[var(--color-plane)]"
                }`}
              >
                <NavIcon name={n.icon} />
                {n.label}
              </a>
            );
          })}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-[var(--color-grid)] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-plane)] text-sm font-semibold">
              {siteConfig.user.name
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium">
                {siteConfig.user.name}
              </span>
              <span className="block truncate text-xs text-[var(--color-muted)]">
                {siteConfig.user.role}
              </span>
            </span>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[var(--color-muted)]">
            {siteConfig.footerNote}{" "}
            <a
              href={siteConfig.footerCredit.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {siteConfig.footerCredit.label}
            </a>
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[var(--color-grid)] bg-[var(--color-surface)] px-5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
              aria-expanded={open}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-grid)] lg:hidden"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <a
              href="/login/"
              className="rounded-lg bg-[var(--color-series-1)] px-4 py-2 text-sm font-semibold text-white"
            >
              Sign out
            </a>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-5">{children}</main>
      </div>
    </div>
  );
}

function NavIcon({ name }: { name: string }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "users") {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
