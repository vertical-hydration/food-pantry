import { requireSettingsView } from "~/services/auth/auth_utils.server";
import type { Route } from "./+types/program_dashboard";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { getProgramApplications } from "./data.server";
import { useLoaderData } from "react-router";




export async function loader({ request, params }: Route.LoaderArgs) {
  await requireSettingsView({ request })
  const programId = params.programId;

  const programWithApplications = await getProgramApplications(Number(programId));

  if (!programWithApplications) {
    throw new Error("Program not found");
  }

  return { programWithApplications }
}

export default function ProgramApplications({
  loaderData,
}: Route.ComponentProps) {
  const data = loaderData;

  return <div>
    <div className="border-b border-gray-200 py-5">
      <h3 className="text-base font-semibold text-gray-900">
        Applications to Program
      </h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        Users who have applied to this program will be listed here. You can review their applications and take necessary actions.
      </p>
    </div>
    <ApplicationList />

    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>;

}




const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },

]

function ApplicationList() {
  const { programWithApplications } = useLoaderData<typeof loader>();

  const applications = programWithApplications.applications;

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {applications.map((application) => (
        <li key={application.id} className="relative flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img alt="" src={""} className="size-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                <a href={application.id.toString()} className="relative z-10">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {application.lastName}
                </a>
              </p>
              <p className="mt-1 flex text-xs/5 text-gray-500">
                <a href={`mailto:${application.email}`} className="relative truncate hover:underline">
                  {application.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">{application.status}</p>

            </div>
            <ChevronRightIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
          </div>
        </li>
      ))}
    </ul>
  )
}
