import { ArrowRightCircleIcon, CalendarDaysIcon, CheckCircleIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import ReserveCard from "~/routes/community/components/reserve_card";

export type EventDetails = {
  id: number;
  name: string;
  programName: string;
  imageSrc: string;
  imageAlt: string;
  eventDate: Date;
  location: string;
  pickupTimes: Array<{
    name: string;
    available: boolean;
    id: string;
  }>;
};

export type EventCardProps = {
  event: EventDetails;
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




export function EventCard({ event }: EventCardProps) {



  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 relative">
        <img
          src={event.imageSrc}
          alt={event.imageAlt}
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
        <ReserveCard event={event} />
        {/* <Link
          to={`/community/events/${event.id}/reserve`}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Request Reservation
          <ArrowRightCircleIcon className="w-4 h-4" />
        </Link> */}
      </div>
    </div>
  );
}