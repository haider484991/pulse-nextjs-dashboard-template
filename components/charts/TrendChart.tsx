"use client";

import { useId, useMemo, useRef, useState } from "react";
import { monthly, type Point } from "@/lib/data";

/**
 * Revenue vs expenses over 12 months.
 *
 * Built to a data-visualisation spec, not to taste:
 *  · form  — change-over-time with two comparable series → line/area, one axis.
 *            Never a second y-scale; two measures in the same unit share one.
 *  · color — categorical slots 1 and 2, validated for colour-vision-deficiency
 *            separation and ≥3:1 contrast against BOTH surfaces.
 *  · marks — 2px strokes, 8px hover markers, hairline recessive grid.
 *  · identity — a legend is always present for two or more series, so colour is
 *            never the only channel carrying meaning.
 *  · interaction — crosshair + tooltip by default. An SVG chart on a web page
 *            IS interactive; shipping it inert wastes the medium.
 *  · a11y — <table> fallback below, exposed via a disclosure, so the data is
 *            reachable without seeing the chart at all.
 *
 * Zero chart libraries. The whole thing is an SVG path built from the data.
 */

const W = 720;
const H = 260;
const PAD = { top: 16, right: 16, bottom: 28, left: 52 };

const money = (n: number) =>
  n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

export default function TrendChart() {
  const clipId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  const { max, xFor, yFor, revPath, expPath, revArea } = useMemo(() => {
    const max = Math.ceil(
      Math.max(...monthly.map((d) => Math.max(d.revenue, d.expenses))) / 10000,
    ) * 10000;

    const innerW = W - PAD.left - PAD.right;
    const innerH = H - PAD.top - PAD.bottom;

    const xFor = (i: number) =>
      PAD.left + (i / (monthly.length - 1)) * innerW;
    const yFor = (v: number) => PAD.top + innerH - (v / max) * innerH;

    const line = (key: keyof Pick<Point, "revenue" | "expenses">) =>
      monthly
        .map((d, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(d[key])}`)
        .join(" ");

    const revPath = line("revenue");
    const expPath = line("expenses");
    const revArea = `${revPath} L${xFor(monthly.length - 1)},${PAD.top + innerH} L${xFor(0)},${PAD.top + innerH} Z`;

    return { max, xFor, yFor, revPath, expPath, revArea };
  }, []);

  // Ticks: 5 evenly spaced, formatted compactly.
  const ticks = Array.from({ length: 5 }, (_, i) => (max / 4) * i);

  function handleMove(e: React.MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    // Map client px → viewBox units, then to the nearest data index.
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const innerW = W - PAD.left - PAD.right;
    const ratio = (x - PAD.left) / innerW;
    const idx = Math.round(ratio * (monthly.length - 1));
    setHover(idx >= 0 && idx < monthly.length ? idx : null);
  }

  const active = hover === null ? null : monthly[hover];

  return (
    <figure className="rounded-xl border border-[var(--color-grid)] bg-[var(--color-surface)] p-5">
      <figcaption className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">Revenue vs expenses</h3>
          <p className="mt-0.5 text-sm text-[var(--color-ink-2)]">
            Last 12 months, in USD
          </p>
        </div>
        {/* Legend — required for two or more series. */}
        <div className="flex items-center gap-4 text-sm">
          <LegendKey color="var(--color-series-1)" label="Revenue" />
          <LegendKey color="var(--color-series-2)" label="Expenses" />
        </div>
      </figcaption>

      <div className="relative mt-4">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          role="img"
          aria-label="Line chart comparing monthly revenue and expenses over the last twelve months. Revenue rises from 42,000 dollars in January to 82,300 dollars in December; expenses rise from 31,000 to 46,100."
          onMouseMove={handleMove}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={clipId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-series-1)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-series-1)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Recessive gridlines + axis ticks */}
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={yFor(t)}
                y2={yFor(t)}
                stroke="var(--color-grid)"
                strokeWidth="1"
              />
              <text
                x={PAD.left - 10}
                y={yFor(t) + 4}
                textAnchor="end"
                className="tnum"
                fontSize="11"
                fill="var(--color-muted)"
              >
                {money(t)}
              </text>
            </g>
          ))}

          {/* X labels */}
          {monthly.map((d, i) => (
            <text
              key={d.label}
              x={xFor(i)}
              y={H - 8}
              textAnchor="middle"
              fontSize="11"
              fill="var(--color-muted)"
            >
              {d.label}
            </text>
          ))}

          <path d={revArea} fill={`url(#${clipId})`} />

          {/* 2px strokes */}
          <path
            d={expPath}
            fill="none"
            stroke="var(--color-series-2)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={revPath}
            fill="none"
            stroke="var(--color-series-1)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Crosshair + markers */}
          {hover !== null && active && (
            <g pointerEvents="none">
              <line
                x1={xFor(hover)}
                x2={xFor(hover)}
                y1={PAD.top}
                y2={H - PAD.bottom}
                stroke="var(--color-axis)"
                strokeWidth="1"
              />
              {/* 2px surface ring keeps the marker readable over the line */}
              <circle cx={xFor(hover)} cy={yFor(active.expenses)} r="5"
                fill="var(--color-series-2)" stroke="var(--color-surface)" strokeWidth="2" />
              <circle cx={xFor(hover)} cy={yFor(active.revenue)} r="5"
                fill="var(--color-series-1)" stroke="var(--color-surface)" strokeWidth="2" />
            </g>
          )}
        </svg>

        {/* Tooltip */}
        {active && (
          <div
            className="pointer-events-none absolute top-2 rounded-lg border border-[var(--color-grid)] bg-[var(--color-surface)] px-3 py-2 text-xs shadow-lg"
            style={{
              left: `${(xFor(hover!) / W) * 100}%`,
              transform:
                hover! > monthly.length / 2
                  ? "translateX(-108%)"
                  : "translateX(8%)",
            }}
          >
            <div className="font-semibold">{active.label}</div>
            <div className="mt-1.5 space-y-1">
              <TooltipRow color="var(--color-series-1)" label="Revenue" value={active.revenue} />
              <TooltipRow color="var(--color-series-2)" label="Expenses" value={active.expenses} />
            </div>
          </div>
        )}
      </div>

      {/* Accessible table fallback */}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => setShowTable((v) => !v)}
          aria-expanded={showTable}
          className="text-xs font-medium text-[var(--color-ink-2)] underline underline-offset-4"
        >
          {showTable ? "Hide data table" : "View as table"}
        </button>
        {showTable && (
          <div className="mt-3 max-h-56 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
                <tr>
                  <th scope="col" className="py-1.5">Month</th>
                  <th scope="col" className="py-1.5 text-right">Revenue</th>
                  <th scope="col" className="py-1.5 text-right">Expenses</th>
                </tr>
              </thead>
              <tbody>
                {monthly.map((d) => (
                  <tr key={d.label} className="border-t border-[var(--color-grid)]">
                    <th scope="row" className="py-1.5 font-normal">{d.label}</th>
                    <td className="tnum py-1.5 text-right">${d.revenue.toLocaleString()}</td>
                    <td className="tnum py-1.5 text-right">${d.expenses.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </figure>
  );
}

function LegendKey({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[var(--color-ink-2)]">
      <span
        className="inline-block h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function TooltipRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span className="text-[var(--color-ink-2)]">{label}</span>
      <span className="tnum ml-auto font-semibold">
        ${value.toLocaleString()}
      </span>
    </div>
  );
}
