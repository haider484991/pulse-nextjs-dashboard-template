"use client";

import { useState } from "react";
import { channels } from "@/lib/data";

/**
 * Signups by acquisition channel.
 *
 * Form: comparing magnitude across named categories → horizontal bars (the
 * labels are long, so horizontal beats vertical — no rotated text).
 *
 * One series, so there is no legend: the title names it. Bars use a single
 * sequential hue rather than one colour per bar — colour here would encode
 * nothing, and rainbow bars are the most common chart mistake there is.
 * Values are direct-labelled, so the chart is readable without the axis.
 */
export default function ChannelChart() {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...channels.map((c) => c.value));
  const total = channels.reduce((s, c) => s + c.value, 0);

  return (
    <figure className="rounded-xl border border-[var(--color-grid)] bg-[var(--color-surface)] p-5">
      <figcaption>
        <h3 className="font-semibold">Signups by channel</h3>
        <p className="mt-0.5 text-sm text-[var(--color-ink-2)]">
          {total.toLocaleString()} total this quarter
        </p>
      </figcaption>

      <ul className="mt-5 space-y-3">
        {channels.map((c) => {
          const pct = (c.value / max) * 100;
          const share = ((c.value / total) * 100).toFixed(1);
          return (
            <li
              key={c.label}
              onMouseEnter={() => setHover(c.label)}
              onMouseLeave={() => setHover(null)}
              className="grid grid-cols-[7.5rem_1fr_4rem] items-center gap-3"
            >
              <span className="truncate text-sm text-[var(--color-ink-2)]">
                {c.label}
              </span>

              {/* Track + bar. 4px rounded end, anchored to the baseline. */}
              <span className="relative block h-5 rounded-sm bg-[var(--color-grid)]">
                <span
                  className="absolute inset-y-0 left-0 rounded-sm transition-[width] duration-300"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: "var(--color-series-1)",
                    opacity: hover && hover !== c.label ? 0.45 : 1,
                  }}
                />
                {hover === c.label && (
                  <span className="absolute -top-8 left-0 z-10 whitespace-nowrap rounded-lg border border-[var(--color-grid)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs shadow-lg">
                    <strong className="tnum">{c.value.toLocaleString()}</strong>{" "}
                    <span className="text-[var(--color-ink-2)]">
                      · {share}% of signups
                    </span>
                  </span>
                )}
              </span>

              {/* Direct label — the chart reads without an axis. */}
              <span className="tnum text-right text-sm font-semibold">
                {c.value.toLocaleString()}
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}
