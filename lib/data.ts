/**
 * Mock data. Swap these for your API — every component below is typed against
 * these shapes, so replacing the source is a one-file change.
 */

export type Point = { label: string; revenue: number; expenses: number };

/** 12 months of revenue vs expenses. */
export const monthly: Point[] = [
  { label: "Jan", revenue: 42_000, expenses: 31_000 },
  { label: "Feb", revenue: 46_500, expenses: 32_400 },
  { label: "Mar", revenue: 44_200, expenses: 33_100 },
  { label: "Apr", revenue: 51_800, expenses: 34_900 },
  { label: "May", revenue: 55_300, expenses: 36_200 },
  { label: "Jun", revenue: 53_100, expenses: 37_800 },
  { label: "Jul", revenue: 61_400, expenses: 39_100 },
  { label: "Aug", revenue: 64_900, expenses: 40_300 },
  { label: "Sep", revenue: 62_200, expenses: 41_800 },
  { label: "Oct", revenue: 71_500, expenses: 43_200 },
  { label: "Nov", revenue: 76_800, expenses: 44_600 },
  { label: "Dec", revenue: 82_300, expenses: 46_100 },
];

export type Channel = { label: string; value: number };

export const channels: Channel[] = [
  { label: "Organic search", value: 4820 },
  { label: "Direct", value: 3140 },
  { label: "Referral", value: 2260 },
  { label: "Email", value: 1780 },
  { label: "Social", value: 1120 },
  { label: "Paid", value: 640 },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  plan: "Starter" | "Growth" | "Scale";
  mrr: number;
  status: "active" | "trialing" | "past_due" | "churned";
  joined: string;
};

export const customers: Customer[] = [
  { id: "c_01", name: "Northwind Trading", email: "ops@northwind.example", plan: "Scale", mrr: 1490, status: "active", joined: "2024-03-12" },
  { id: "c_02", name: "Aperture Labs", email: "billing@aperture.example", plan: "Growth", mrr: 149, status: "active", joined: "2024-07-02" },
  { id: "c_03", name: "Cobalt Studio", email: "hello@cobalt.example", plan: "Starter", mrr: 49, status: "trialing", joined: "2026-06-28" },
  { id: "c_04", name: "Vantage Group", email: "finance@vantage.example", plan: "Scale", mrr: 2100, status: "active", joined: "2023-11-19" },
  { id: "c_05", name: "Studio Nine", email: "accounts@studionine.example", plan: "Growth", mrr: 149, status: "past_due", joined: "2025-01-08" },
  { id: "c_06", name: "Meridian Health", email: "it@meridian.example", plan: "Scale", mrr: 1750, status: "active", joined: "2024-05-30" },
  { id: "c_07", name: "Foxglove Ltd", email: "admin@foxglove.example", plan: "Starter", mrr: 49, status: "churned", joined: "2024-09-14" },
  { id: "c_08", name: "Bright Harbour", email: "ap@brightharbour.example", plan: "Growth", mrr: 149, status: "active", joined: "2025-04-21" },
  { id: "c_09", name: "Quill & Co", email: "team@quill.example", plan: "Starter", mrr: 49, status: "trialing", joined: "2026-07-05" },
  { id: "c_10", name: "Ironwood Partners", email: "ops@ironwood.example", plan: "Scale", mrr: 1890, status: "active", joined: "2023-08-03" },
];

export const stats = [
  { label: "Monthly recurring revenue", value: "$82,300", delta: 7.2, positive: true, note: "vs. last month" },
  { label: "Active customers", value: "1,284", delta: 3.1, positive: true, note: "vs. last month" },
  { label: "Net revenue retention", value: "112%", delta: 1.4, positive: true, note: "trailing 12 months" },
  { label: "Churn", value: "1.9%", delta: 0.3, positive: false, note: "vs. last month" },
];
