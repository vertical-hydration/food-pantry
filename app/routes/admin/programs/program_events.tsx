// import type { Route } from "./+types/events_index";
// import { getEvents } from "./data.server";

import type { Route } from "./+types/program_events";
import { getprogramEvents } from "../events/data.server";
import { Link } from "react-router";
import { EventsTable } from "~/components/events/eventsTable";
import { SectionHeading } from "~/components/site/headers";
import { StandardContainer } from "~/components/site/standard_container";
import { DataTable } from "~/components/site/data_table";
import { ProgramEventsColumns } from "~/components/programs/admin_tables";







export async function loader({ params }: Route.LoaderArgs) {
  const events = await getprogramEvents(Number(params.programId));

  return { events };
}

export default function EventsIndex({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  return (
    <>
      <SectionHeading title="This Program's Events">
        <Link to="create">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Event
          </button>
        </Link>
      </SectionHeading>
      <StandardContainer>
        <DataTable data={events} columns={ProgramEventsColumns} />
      </StandardContainer>
    </>
  )
}


