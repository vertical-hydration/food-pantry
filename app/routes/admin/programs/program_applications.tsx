import { requireSettingsView } from "~/services/auth/auth_utils.server";
import type { Route } from "./+types/program_applications";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getProgramApplications } from "./data.server";
import { Link, useLoaderData } from "react-router";
import { UserImage } from "~/components/user_image";
import { SectionDescription } from "~/components/site/section_description";
import { DataTable } from "~/components/site/data_table";
import { applicationsColumns } from "~/components/programs/admin_tables";
import { StandardContainer } from "~/components/site/standard_container";




export async function loader({ request, params }: Route.LoaderArgs) {
  await requireSettingsView({ request })
  const programId = params.programId;

  const {
    applications,
    applicationSection
  } = await processProgramData({ programId });

  return { applications, applicationSection }
}

export default function ProgramApplications({
  loaderData,
}: Route.ComponentProps) {
  const { applicationSection, applications } = loaderData;

  return <>
    <SectionDescription
      heading={applicationSection.title}
      description={applicationSection.description}
    />
    <ApplicationList />

  </>;

}


async function processProgramData({ programId }: { programId: string }) {

  const programWithApplications = await getProgramApplications(Number(programId));

  if (!programWithApplications) {
    throw new Error("Program not found");
  }

  const applicationSection = {
    title: "Applications",
    description: "Users who have applied to this program will be listed here. You can review their applications and take necessary actions."
  }

  const applications = programWithApplications.applications.map(a => ({
    id: a.id,
    firstName: a.firstName,
    lastName: a.lastName,
    email: a.email,
    status: a.status,
    enrollmentDate: a.acceptedDate,
    appliedDate: a.createdAt,
  }));

  return { programWithApplications, applicationSection, applications }
}






function ApplicationList() {
  const { applications } = useLoaderData<typeof loader>();


  return (
    <StandardContainer>

      <DataTable
        columns={applicationsColumns}
        data={applications}
      />
    </StandardContainer>

  )
}