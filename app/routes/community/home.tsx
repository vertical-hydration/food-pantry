import { requireAuth } from "~/services/auth/auth_utils.server";
import type { Route } from "./+types/home";
import { getEventsOpenToUser, } from "./community.server";
import { EventCard } from "~/components/events/event_card";


export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request });

  const data = await getEventsOpenToUser({ userId: user.id });

  const programs = data.map(app => app.program);


  const events = programs.flatMap(p => {

    return p.events.map(e => ({
      ...e,
      programName: p.name
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

