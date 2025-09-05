import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { UserImage } from "~/components/user_image";
import { useRouteLoaderData } from "react-router";
import { DataTable } from "~/components/site/data_table";
import type { Route as EventRoute } from "./+types/event_layout"
import { reserveColumns } from '~/components/events/table_columns';
import { StandardContainer } from '~/components/site/standard_container';
import { SectionDescription } from '~/components/site/section_description';
import { requireSettingsView } from '~/services/auth/auth_utils.server';
import type { Route } from './+types/event_reservations';
import { changeReservationStatus } from './data.server';




export async function loader() {
  return {}
}


export async function action({ request }: Route.ActionArgs) {
  await requireSettingsView({ request })
  const formData = await request.formData();
  return await changeReservationStatus({ formData })
}


export default function EventReservations(
) {

  const data = useRouteLoaderData<EventRoute.ComponentProps["loaderData"]>("eventId");

  const reservations = data?.reservations ?? [];

  return <>
    <SectionDescription
      heading="Event Reservations"
      description="Manage the reservations for your event."
    />
    <StandardContainer>

      <DataTable columns={reserveColumns} data={reservations} />
    </StandardContainer>
  </>;

}




