import { desc } from "drizzle-orm";
import { Outlet } from "react-router";
import { NavTabs, PageHeader, type Tab } from "~/components/site/headers";
import type { Route } from "./+types/event_layout";
import { getEvent } from "./data.server";


export async function loader({ params }: Route.LoaderArgs) {

  const eventId = Number(params.eventId)

  const event = await getEvent(eventId)
  const info = {
    name: event.name,
    description: "description here",
    editUrl: `edit/${eventId}`
  }
  const tabs: Tab[] = [
    {
      name: 'EventMain',
      to: `/admin/events/${eventId}`,
      // count: '52',
      end: true
    },
    {
      name: 'Reservations',
      to: `/admin/events/${eventId}/reservations`,
      // count: '52',
      end: true
    },

  ]

  const stats = [
    { name: 'Enrollment', value: "23" },
    { name: 'Total Applications', value: "27", unit: 'Applied' },
    { name: 'Students Enrolled', value: "30" },
    { name: 'Success rate', value: '98.5%' },
  ]

  return { tabs, info, stats }
}


export default function EventLayout({ loaderData }: Route.ComponentProps) {
  const { info, tabs } = loaderData


  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <PageHeader info={info} />
      <NavTabs tabs={tabs} />
      <Outlet />
    </div>
  )

}