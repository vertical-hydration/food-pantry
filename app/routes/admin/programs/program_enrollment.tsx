import type { Route } from "./+types/program_enrollment";
import { enrolleeColumns, type Enrollee, } from "./program_tables";
import { mockEnrollees } from "./mockData";
import { useRouteLoaderData } from "react-router";
import type { Route as ProgramRoute } from "./+types/program_layout"
import { DataTable } from "~/components/site/data_table";
import { SectionDescription } from "~/components/site/section_description";
import { StandardContainer } from "~/components/site/standard_container";




export async function loader() {

  const programSection = {
    title: "Enrolled Families",
    description: "Users who have enrolled in this program will be listed here. You can review their applications and take necessary actions."
  }


  return { programSection }
}

export default function ProgramEnrollment(
  { loaderData }: Route.ComponentProps
) {

  const data = useRouteLoaderData<ProgramRoute.ComponentProps["loaderData"]>("programId");

  const { programSection } = loaderData;

  const applications = data?.applications ?? [];

  const enrolled = applications.filter(a => a.status === "accepted");

  const tableData: Enrollee[] = enrolled.map(a => ({
    id: a.id.toString(),
    firstName: a.firstName,
    lastName: a.lastName,
    email: a.email,
    status: a.status,
    enrollmentDate: a.acceptedDate?.toDateString() ?? "No Date",
    appliedDate: a.createdAt.toDateString() ?? "No Date",
    image: "",
  }));

  return <>
    <SectionDescription
      heading={programSection.title}
      description={programSection.description}
    />

    <EnrollmentTable data={tableData} />
  </>;

}






function EnrollmentTable({ data }: { data: Enrollee[] }) {
  return (
    <StandardContainer>
      <DataTable columns={enrolleeColumns} data={data} />
    </StandardContainer>
  )
}
