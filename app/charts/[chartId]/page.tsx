import { notFound } from "next/navigation";

import { ArchitectureFlow } from "@/app/charts-data/architecture/components/architecture-flow";
import {
  techaxonConnections,
  techaxonHierarchy,
} from "@/app/charts-data/techaxon";
import { ChartPageLayout } from "@/app/components/chart-page-layout";
import { HierarchyFlow } from "@/app/components/hierarchy-flow";

type ChartPageProps = {
  params: Promise<{
    chartId: string;
  }>;
};

export default async function ChartPage({
  params,
}: ChartPageProps) {
  const { chartId } = await params;

  switch (chartId) {
    case "techaxon":
      return (
        <ChartPageLayout
          title="Techaxon"
          description="Products and services hierarchy."
        >
          <HierarchyFlow
            data={techaxonHierarchy}
            connections={techaxonConnections}
          />
        </ChartPageLayout>
      );

    case "architecture":
      return (
        <ChartPageLayout
          title="System Architecture"
          description="Techaxon application and infrastructure architecture."
        >
          <ArchitectureFlow />
        </ChartPageLayout>
      );

    default:
      notFound();
  }
}