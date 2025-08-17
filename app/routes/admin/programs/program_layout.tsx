import { data, Link, NavLink, Outlet, redirect, useLoaderData } from "react-router";
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import type { Route } from "./+types/program_layout";
import clsx from "clsx";
import { getProgram } from "./data.server";




export async function loader({ params }: Route.LoaderArgs) {
  const pid = params.programId;
  const program = await getProgram({ pid: Number(pid) });

  if (!program) {
    throw data(null, { status: 404, statusText: "Program not found" });
  }

  const tabs = [
    {
      name: 'Enrollment',
      to: `/admin/programs/${pid}`,
      count: '52',
      end: true
    },
    {
      name: 'Applications',
      to: `/admin/programs/${pid}/applications`,
      count: '6',
      end: false
    },
    {
      name: 'Events',
      to: `/admin/programs/${pid}/events`,
      count: '4',
      end: false
    }
  ]

  return { tabs, program };
}

export async function action({ request }: Route.ActionArgs) {


  // Perform your action here, e.g., create a new program
  return null;
}

export default function ProgramLayout({ loaderData }: Route.ComponentProps) {
  const { tabs } = loaderData;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader />
      <NavTabs tabs={tabs} />
      <Outlet />

    </div>
  )

}

function PageHeader() {
  const { program } = useLoaderData<typeof loader>();
  return (
    <div className="py-2 md:flex md:items-center md:justify-between ">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {program.name}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Publish
        </button>
      </div>
    </div>
  )
}



function NavTabs({ tabs }: { tabs: { name: string; to: string; count?: string; end: boolean }[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:hidden">
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          // defaultValue={tabs.find((tab) => tab.current).name}
          aria-label="Select a tab"
          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.to}
                aria-current={tab.end ? 'page' : undefined}
                end={tab.end}
                className={({ isActive }) => clsx(
                  isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
                  'flex border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap',
                )}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={clsx(
                      tab.end ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-900',
                      'ml-3 hidden rounded-full px-2.5 py-0.5 text-xs font-medium md:inline-block',
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}


