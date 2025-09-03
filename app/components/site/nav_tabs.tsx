import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { NavLink } from "react-router";


export type Tab = {
  name: string;
  to: string;
  count?: string;
  end: boolean;
};

const pid = "2"
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
  }
]

export function NavTabs({ tabs }: { tabs: Tab[] }) {



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
