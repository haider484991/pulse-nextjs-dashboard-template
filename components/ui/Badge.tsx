import type { Customer } from "@/lib/data";

/**
 * Status badge. Colour + text label together — never colour alone.
 * Status hues are reserved and are deliberately distinct from the chart series
 * colours, so a status pill can never be mistaken for a data series.
 */
const STYLES: Record<Customer["status"], { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "bg-[color-mix(in_srgb,var(--color-good)_14%,transparent)] text-[var(--color-good)]",
  },
  trialing: {
    label: "Trialing",
    className: "bg-[color-mix(in_srgb,var(--color-series-1)_14%,transparent)] text-[var(--color-series-1)]",
  },
  past_due: {
    label: "Past due",
    className: "bg-[color-mix(in_srgb,var(--color-warning)_20%,transparent)] text-[#8a5b00] dark:text-[var(--color-warning)]",
  },
  churned: {
    label: "Churned",
    className: "bg-[color-mix(in_srgb,var(--color-critical)_14%,transparent)] text-[var(--color-critical)]",
  },
};

export default function Badge({ status }: { status: Customer["status"] }) {
  const s = STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${s.className}`}
    >
      {s.label}
    </span>
  );
}
