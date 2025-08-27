import { Link } from "react-router";


type EventTableEvent = {
  name: string;
  id: number;
  status: "active" | "inactive" | "archived" | null;
  createdAt: Date;
  updatedAt: Date;
  programId: number;
  eventDate: Date;
  openDate: Date;
  closeDate: Date;
}


export function EventsTable({ events }: {
  events: EventTableEvent[]
}) {
  return <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
              <Link to={`/admin/events/${event.id}`} className="text-indigo-600 hover:text-indigo-900">
                Link<span className="sr-only">, {event.name}</span>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>;
}