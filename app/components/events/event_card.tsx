import { ArrowRightCircleIcon, CalendarDaysIcon, CheckCircleIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import ReserveCard from "~/routes/community/components/reserve_card";


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




export function EventCard({ event }: EventCardProps) {


  const imageSrc = "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=1000"

  const eventInfo = {
    name: event.name,
    imageSrc: imageSrc,
    imageAlt: event.name,
    pickupTimes: [
      { name: '2:00 PM', available: true, id: "1400" },
      { name: '2:30 PM', available: true, id: "1430" },
      { name: '3:00 PM', available: true, id: "1500" },
      { name: '3:30 PM', available: true, id: "1530" },
      { name: '4:00 PM', available: true, id: "1600" },
      { name: '4:30 PM', available: true, id: "1630" },
      { name: '5:00 PM', available: true, id: "1700" },
      { name: '5:30 PM', available: false, id: "1730" },
    ],
  }


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
        <ReserveCard eventInfo={eventInfo} />
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