import Shell from "@/components/Shell";
import StatCard from "@/components/ui/StatCard";
import TrendChart from "@/components/charts/TrendChart";
import ChannelChart from "@/components/charts/ChannelChart";
import DataTable from "@/components/ui/DataTable";
import { stats } from "@/lib/data";

export default function Overview() {
  return (
    <Shell current="/" title="Overview">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <TrendChart />
        <ChannelChart />
      </div>

      <div className="mt-4">
        <DataTable />
      </div>
    </Shell>
  );
}
