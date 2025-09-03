import { Link } from "react-router";
import type { Route } from "./+types/prog_index";
import { getPrograms } from "./data.server";
import { PageHeading, SectionHeading } from "~/components/site/headers";
import { SectionDescription } from "~/components/site/section_description";
import { DataTable } from "~/components/site/data_table";
import { programsIndexColumns } from "~/components/programs/admin_tables";




export async function loader() {
  const programs = await getPrograms();

  const details = {
    heading: "All Programs",
    description: "A list of all the programs in your account including their name, description, and status."
  }

  return { programs, details };
}

export async function action({ request }: Route.ActionArgs) {


  // Perform your action here, e.g., create a new program
  return null;
}

export default function Programs({ loaderData }: Route.ComponentProps) {
  const { programs, details } = loaderData;

  return (
    <>
      <PageHeading title="Programs" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="All Programs">
          <Link to="create">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Program
            </button>
          </Link>
        </SectionHeading>
        <SectionDescription
          heading={details.heading}
          description={details.description}
        />
        <DataTable
          columns={programsIndexColumns}
          data={programs}
        />
      </div>
    </>

  )
}
