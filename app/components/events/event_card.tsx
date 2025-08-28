import { ArrowRightCircleIcon, CalendarDaysIcon, CheckCircleIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";


export type EventCardProps = {
  event: {
    id: number;
    name: string;
    programName: string;
    eventDate: Date;
  };
};


export function EventCard2({ event }: EventCardProps) {

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 w-80 mx-auto flex flex-col gap-3">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">{event.name}</h2>
      <p className="text-sm text-gray-500 mb-2">Program: <span className="font-medium text-gray-700">{event.programName}</span></p>
      <p className="text-sm text-gray-500 mb-4">Date: <span className="font-medium text-gray-700">{event.eventDate.toLocaleDateString()}</span></p>
      <Link
        to={`/events/${event.id}`}
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-150 text-center"
      >
        View Event
      </Link>
    </div>
  )

}


const statusConfig = {
  planning: { color: 'bg-gray-100 text-gray-800' },
  "open-for-requests": { color: 'bg-green-100 text-green-800' },
  "open-for-pickups": { color: 'bg-blue-100 text-blue-800' },
  "event-finished": { color: 'bg-purple-100 text-purple-800' }
};

export function EventCard({ event }: EventCardProps) {


  const imageSrc = "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=1000"


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 relative">
        <img
          src={imageSrc}
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
          {event.programName}
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mt-2">{event.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {event.name}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="w-4 h-4" />
            <span>{event.eventDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4" />
            <span>Capacity: Not Set</span>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="grid grid-cols-2 gap-4">


          </div>
        </div>

        <button
          // onClick={() => onEventClick(event.id)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Details
          <ArrowRightCircleIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}