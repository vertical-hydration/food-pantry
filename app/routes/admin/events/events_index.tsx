import type { Route } from "./+types/events_index";
import { getEvents } from "./data.server";





const events = [
  {
    id: 1,
    name: 'Oct 5 Pickup Event',
    description: 'Users must pick up their food boxes on the designated days.',
    status: 'Active',
    date: new Date('2025-10-05'),
    programName: 'Food Box Pickup'
  },

]


export async function loader() {
  const { events } = await getEvents();

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
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Event
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Program
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => (
                  <tr key={event.id}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {event.name}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                      {event.programId}
                    </td>
                    <td
                      className="py-4 pr-4 pl-3 text-left text-sm font-medium whitespace-nowrap sm:pr-0"
                    >
                      {event.eventDate ? event.eventDate.toLocaleDateString() : "N/A"}
                    </td>
                    <td
                      className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0"
                    >
                      <a href="#" className="text-indigo-600 hover:text-indigo-900">
                        Edit<span className="sr-only">, {event.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
