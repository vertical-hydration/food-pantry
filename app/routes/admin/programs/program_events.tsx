// import type { Route } from "./+types/events_index";
// import { getEvents } from "./data.server";

import type { Route } from "./+types/program_events";
import { getprogramEvents } from "../events/data.server";
import { Link } from "react-router";
import { EventsTable } from "~/components/events/eventsTable";







export async function loader({ params }: Route.LoaderArgs) {
  const events = await getprogramEvents(Number(params.programId));

  return { events };
}

export default function EventsIndex({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            Events
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the events in your account including their name, description, and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to={`create`}
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Event
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <EventsTable events={events} />
        </div>
      </div>
    </div>
  )
}


