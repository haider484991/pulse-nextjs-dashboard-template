import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-series-1)] text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12h4l3 8 4-16 3 8h4" />
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-tight">
              {siteConfig.name}
            </span>
          </div>

          <h1 className="mt-10 text-2xl font-semibold tracking-tight">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-[var(--color-ink-2)]">
            Welcome back. Enter your details to continue.
          </p>

          <LoginForm />
        </div>
      </div>

      {/* Decorative panel — CSS only, no image files. */}
      <div
        className="hidden lg:block"
        aria-hidden="true"
        style={{
          backgroundColor: "#0d1b2f",
          backgroundImage:
            "radial-gradient(at 25% 20%, rgba(42,120,214,0.55) 0px, transparent 55%), radial-gradient(at 75% 75%, rgba(235,104,52,0.35) 0px, transparent 55%)",
        }}
      />
    </div>
  );
}
