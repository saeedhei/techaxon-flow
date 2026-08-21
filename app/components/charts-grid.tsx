import type { ChartDefinition } from "@/app/charts-registry";

import { ChartCard } from "./chart-card";

type ChartsGridProps = {
  charts: ChartDefinition[];
};

export function ChartsGrid({ charts }: ChartsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {charts.map((chart) => (
        <ChartCard
          key={chart.id}
          chart={chart}
        />
      ))}
    </div>
  );
}