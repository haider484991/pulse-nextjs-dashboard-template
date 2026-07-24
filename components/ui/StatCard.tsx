/**
 * Stat tile.
 *
 * The delta never relies on colour alone — it always ships an arrow glyph and
 * the word "vs. last month", so a red-green colourblind reader (about 1 in 12
 * men) still gets the direction. That pairing is the rule for every status cue
 * in this template.
 */
export default function StatCard({
  label,
  value,
  delta,
  positive,
  note,
}: {
  label: string;
  value: string;
  delta: number;
  positive: boolean;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--color-grid)] bg-[var(--color-surface)] p-5">
      <p className="text-sm text-[var(--color-ink-2)]">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 flex items-center gap-1.5 text-sm">
        <span
          className="inline-flex items-center gap-1 font-medium"
          style={{
            color: positive ? "var(--color-good)" : "var(--color-critical)",
          }}
        >
          {/* glyph, not colour alone */}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ transform: positive ? "none" : "rotate(180deg)" }}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          <span className="tnum">{delta}%</span>
          <span className="sr-only">
            {positive ? "increase" : "decrease"}
          </span>
        </span>
        <span className="text-[var(--color-muted)]">{note}</span>
      </p>
    </div>
  );
}
