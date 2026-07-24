import type { Metadata } from "next";
import Shell from "@/components/Shell";
import DataTable from "@/components/ui/DataTable";

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return (
    <Shell current="/customers/" title="Customers">
      <DataTable />
    </Shell>
  );
}
