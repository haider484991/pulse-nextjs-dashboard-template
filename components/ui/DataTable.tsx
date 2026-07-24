"use client";

import { useMemo, useState } from "react";
import { customers, type Customer } from "@/lib/data";
import Badge from "@/components/ui/Badge";

type SortKey = "name" | "plan" | "mrr" | "status" | "joined";

/**
 * Sortable, filterable customer table.
 *
 * Sorting is announced with aria-sort so screen-reader users get the same
 * information the arrow glyph gives sighted users. Search filters across name
 * and email. No table library — about 120 lines.
 */
export default function DataTable() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "mrr",
    dir: "desc",
  });

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? customers.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.email.toLowerCase().includes(q),
        )
      : customers;

    return [...filtered].sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      const av = a[sort.key];
      const bv = b[sort.key];
      if (typeof av === "number" && typeof bv === "number") {
        return (av - bv) * dir;
      }
      return String(av).localeCompare(String(bv)) * dir;
    });
  }, [query, sort]);

  function toggle(key: SortKey) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  }

  return (
    <div className="rounded-xl border border-[var(--color-grid)] bg-[var(--color-surface)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-grid)] p-5">
        <div>
          <h3 className="font-semibold">Customers</h3>
          <p className="mt-0.5 text-sm text-[var(--color-ink-2)]">
            {rows.length} of {customers.length} shown
          </p>
        </div>
        <div className="w-full sm:w-64">
          <label htmlFor="customer-search" className="sr-only">
            Search customers
          </label>
          <input
            id="customer-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email…"
            className="input"
          />
        </div>
      </div>

      {/* Wide tables scroll inside their own container, never the page. */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[46rem] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-[var(--color-muted)]">
            <tr className="border-b border-[var(--color-grid)]">
              <SortHeader label="Customer" k="name" sort={sort} onSort={toggle} />
              <SortHeader label="Plan" k="plan" sort={sort} onSort={toggle} />
              <SortHeader label="MRR" k="mrr" sort={sort} onSort={toggle} align="right" />
              <SortHeader label="Status" k="status" sort={sort} onSort={toggle} />
              <SortHeader label="Joined" k="joined" sort={sort} onSort={toggle} />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className="border-b border-[var(--color-grid)] last:border-0 hover:bg-[var(--color-plane)]"
              >
                <th scope="row" className="px-5 py-3.5 font-normal">
                  <span className="block font-medium">{c.name}</span>
                  <span className="block text-xs text-[var(--color-muted)]">
                    {c.email}
                  </span>
                </th>
                <td className="px-5 py-3.5">{c.plan}</td>
                <td className="tnum px-5 py-3.5 text-right font-medium">
                  ${c.mrr.toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <Badge status={c.status} />
                </td>
                <td className="tnum px-5 py-3.5 text-[var(--color-ink-2)]">
                  {c.joined}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-[var(--color-ink-2)]"
                >
                  No customers match &ldquo;{query}&rdquo;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SortHeader({
  label,
  k,
  sort,
  onSort,
  align = "left",
}: {
  label: string;
  k: SortKey;
  sort: { key: SortKey; dir: "asc" | "desc" };
  onSort: (k: SortKey) => void;
  align?: "left" | "right";
}) {
  const activeSort = sort.key === k;
  return (
    <th
      scope="col"
      aria-sort={
        activeSort ? (sort.dir === "asc" ? "ascending" : "descending") : "none"
      }
      className={`px-5 py-3 ${align === "right" ? "text-right" : ""}`}
    >
      <button
        type="button"
        onClick={() => onSort(k)}
        className={`inline-flex items-center gap-1.5 uppercase transition-colors hover:text-[var(--color-ink)] ${
          activeSort ? "text-[var(--color-ink)]" : ""
        }`}
      >
        {label}
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={activeSort ? "opacity-100" : "opacity-25"}
          style={{
            transform:
              activeSort && sort.dir === "desc" ? "rotate(180deg)" : "none",
          }}
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </th>
  );
}
