"use client";

import { useState } from "react";

/**
 * Auth shell — UI only, deliberately.
 *
 * This template is a static export and cannot verify a password. Shipping a
 * fake "login" that appears to authenticate would be insecure theatre, so this
 * form validates input and then hands off.
 *
 * Wire `handleSubmit` to your real provider — NextAuth/Auth.js, Clerk,
 * Supabase Auth, or your own endpoint — and redirect on success. If you add a
 * real session, remember to move off `output: "export"` for the routes that
 * need server-side checks; client-only guards are not access control.
 */
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNote(true);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="input"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-baseline justify-between">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-medium text-[var(--color-series-1)] hover:underline"
            >
              Forgot?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input"
          />
        </div>

        <label className="flex items-center gap-2.5 text-sm">
          <input
            type="checkbox"
            name="remember"
            className="h-4 w-4 rounded border-[var(--color-axis)]"
          />
          <span className="text-[var(--color-ink-2)]">Remember me</span>
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-[var(--color-series-1)] px-4 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>

      {note && (
        <div className="mt-5 rounded-lg border border-[var(--color-grid)] bg-[var(--color-surface)] p-4 text-sm leading-relaxed text-[var(--color-ink-2)]">
          <strong className="font-semibold text-[var(--color-ink)]">
            Auth is not wired up.
          </strong>{" "}
          This is a UI shell — a static site cannot verify a password, and a
          fake login would be worse than none. Connect{" "}
          <code className="rounded bg-[var(--color-plane)] px-1.5 py-0.5 text-xs">
            handleSubmit
          </code>{" "}
          in <code className="text-xs">components/LoginForm.tsx</code> to
          Auth.js, Clerk, or Supabase.
        </div>
      )}

      <p className="mt-8 text-sm text-[var(--color-ink-2)]">
        Just exploring?{" "}
        <a
          href="/"
          className="font-medium text-[var(--color-series-1)] hover:underline"
        >
          Skip to the dashboard
        </a>
      </p>
    </>
  );
}
