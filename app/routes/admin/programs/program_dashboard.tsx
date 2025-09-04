import type { Route } from "./+types/program_dashboard";
import type { Route as ProgramRoute } from "./+types/program_layout"
import { useRouteLoaderData } from "react-router";
import { DataDisplay } from "~/components/site/data_display";
import { StandardContainer } from "~/components/site/standard_container";




export async function loader() {
  return {}
}

export default function ProgramDashboard({ loaderData }: Route.ComponentProps) {
  const data = useRouteLoaderData<ProgramRoute.ComponentProps["loaderData"]>("programId");

  const stats = data ? data.stats : [];

  return <>
    <ProgramStats stats={stats} />
  </>;

}


function ProgramStats({
  stats
}: {
  stats: Array<{ name: string, value: string, unit?: string }>
}) {


  return (
    <StandardContainer>
      <DataDisplay stats={stats} />
    </StandardContainer>
  )
}






