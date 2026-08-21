import Link from "next/link";

import type { ChartDefinition } from "@/app/charts-registry";

type ChartCardProps = {
  chart: ChartDefinition;
};

export function ChartCard({ chart }: ChartCardProps) {
  return (
    <Link
      href={`/charts/${chart.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
    >
      <div className="flex min-h-36 flex-col justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            {chart.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {chart.description}
          </p>
        </div>

        <div className="mt-6 text-sm font-medium text-sky-600 transition group-hover:text-sky-700">
          View chart →
        </div>
      </div>
    </Link>
  );
}