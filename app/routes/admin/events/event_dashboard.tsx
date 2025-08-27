
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useRouteLoaderData } from "react-router";
import { DataDisplay } from "~/components/site/data_display";
import type { Route } from './+types/event_dashboard';
import type { Route as EventRoute } from "./+types/event_layout"





export async function loader() {
  return {}
}

export default function EventDashboard({ loaderData }: Route.ComponentProps) {
  const data = useRouteLoaderData<EventRoute.ComponentProps["loaderData"]>("eventId");

  const stats = data ? data.stats : [];

  return <div>
    <div className="border-b border-gray-200 py-5">
      <h3 className="text-base font-semibold text-gray-900">
        Dashboard
      </h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        Display data
      </p>
    </div>
    <DataDisplay stats={stats} />
    <pre>
      {/* {JSON.stringify(data, null, 2)} */}
    </pre>
  </div>;

}






