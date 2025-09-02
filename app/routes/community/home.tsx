import { requireAuth } from "~/services/auth/auth_utils.server";
import type { Route } from "./+types/home";
import { getEventsOpenToUser, } from "./community.server";
import { EventCard } from "~/components/events/event_card";


export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request });

  const data = await getEventsOpenToUser({ userId: user.id });

  const programs = data.map(app => app.program);

  const pickupTimes = [
    { name: '2:00 PM', available: true, id: "1400" },
    { name: '2:30 PM', available: true, id: "1430" },
    { name: '3:00 PM', available: true, id: "1500" },
    { name: '3:30 PM', available: true, id: "1530" },
    { name: '4:00 PM', available: true, id: "1600" },
    { name: '4:30 PM', available: true, id: "1630" },
    { name: '5:00 PM', available: true, id: "1700" },
    { name: '5:30 PM', available: false, id: "1730" },
  ];


  const events = programs.flatMap(p => {

    return p.events.map(e => ({
      ...e,
      programName: p.name,
      location: e.location,
      time: e.time,
      pickupTimes: pickupTimes,
      imageSrc: p.image || "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80&w=1000",
      imageAlt: p.name || "Event Image",
    }))
  });

  return { events };
}



export default function Home({ loaderData }: Route.ComponentProps) {
  const { events } = loaderData;



  return (
    <main>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3>Available Events</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}

