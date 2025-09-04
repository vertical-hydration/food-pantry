import { data, Outlet, } from "react-router";
import type { Route } from "./+types/program_layout";
import { getProgramData } from "./data.server";
import { PageHeading, SectionHeading } from "~/components/site/headers";
import { NavTabs, type Tab } from "~/components/site/nav_tabs";




export async function loader({ params }: Route.LoaderArgs) {
  const pid = params.programId;
  const {
    program,
    stats,
    applications,
    tabs
  } = await processProgramData({ pid });

  return { program, stats, applications, tabs };
}

export async function action({ request }: Route.ActionArgs) {


  // Perform your action here, e.g., create a new program
  return null;
}

export default function ProgramLayout(
  { loaderData }: Route.ComponentProps
) {
  const { program, tabs } = loaderData;

  return (
    <>
      <PageHeading title={"Programs"} />
      <SectionHeading title={program.name} />
      <NavTabs tabs={tabs} />
      <Outlet />
    </>
  )

}



async function processProgramData({ pid }: { pid: string }) {
  const program = await getProgramData({ pid: Number(pid) });

  if (!program) {
    throw data(null, { status: 404, statusText: "Program not found" });
  }

  const applications = program.applications;
  const enrolled = applications.filter(a => a.status === "accepted");
  const studentLinks = enrolled.flatMap(a => a.studentLinks);

  const stats = [
    { name: 'Enrollment', value: enrolled.length.toString() },
    { name: 'Total Applications', value: applications.length.toString(), unit: 'Applied' },
    { name: 'Students Enrolled', value: studentLinks.length.toString() },
    { name: 'Success rate', value: '98.5%' },
  ];

  const tabs: Tab[] = [
    {
      name: 'Dashboard',
      to: `/admin/programs/${pid}`,
      // count: '52',
      end: true
    },
    {
      name: 'Enrollment',
      to: `/admin/programs/${pid}/enrollment`,
      // count: '52',
      end: true
    },
    {
      name: 'Applications',
      to: `/admin/programs/${pid}/applications`,
      // count: '6',
      end: false
    },
    {
      name: 'Events',
      to: `/admin/programs/${pid}/events`,
      // count: '4',
      end: false
    },
    {
      name: 'Edit',
      to: `/admin/programs/${pid}/edit`,
      end: false
    }
  ]

  return { program, stats, applications, tabs };
}