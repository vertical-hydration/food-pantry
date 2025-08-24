import type { Route } from "./+types/program_dashboard";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { UserImage } from "~/components/user_image";




export async function loader() {
  return {}
}

export default function ProgramDashboard({ loaderData }: Route.ComponentProps) {


  return <div>
    <div className="border-b border-gray-200 py-5">
      <h3 className="text-base font-semibold text-gray-900">
        Dashboard
      </h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        Display data
      </p>
    </div>
    <DataDisplay />
  </div>;

}

const stats = [
  { name: 'Number of deploys', value: '405' },
  { name: 'Average deploy time', value: '3.65', unit: 'mins' },
  { name: 'Number of servers', value: '3' },
  { name: 'Success rate', value: '98.5%' },
]
function DataDisplay() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white px-4 py-6 sm:px-6 lg:px-8">
              <p className="text-sm/6 font-medium text-gray-500">{stat.name}</p>
              <p className="mt-2 flex items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-gray-900">{stat.value}</span>
                {stat.unit ? <span className="text-sm text-gray-500">{stat.unit}</span> : null}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}






