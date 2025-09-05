import { desc } from "drizzle-orm";
import { Outlet } from "react-router";
import { PageHeader, PageHeading, SectionHeading, } from "~/components/site/headers";
import type { Route } from "./+types/event_layout";
import { getEvent, getReservations } from "./data.server";
import { NavTabs, type Tab } from "~/components/site/nav_tabs";


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
      name: 'Main',
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
    {
      name: 'Edit',
      to: `/admin/events/${eventId}/edit`,
      end: true
    }

  ]

  const stats = [
    { name: 'Enrollment', value: "23" },
    { name: 'Total Applications', value: "27", unit: 'Applied' },
    { name: 'Students Enrolled', value: "30" },
    { name: 'Success rate', value: '98.5%' },
  ]

  const reservations = await getReservations(eventId)

  return { tabs, info, stats, reservations }
}


export default function EventLayout({ loaderData }: Route.ComponentProps) {
  const { info, tabs } = loaderData


  return (
    <>
      <PageHeading title="Events" />
      <SectionHeading title={info.name} />
      <NavTabs tabs={tabs} />
      <Outlet />
    </>
  )

}