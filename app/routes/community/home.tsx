import { requireAuth } from "~/services/auth/auth_utils.server";
import type { Route } from "./+types/home";
import { getEventsOpenToUser, } from "./community.server";
import { EventCard } from "~/components/events/event_card";
import { PageHeading } from "~/components/site/headers";
import { StandardContainer } from "~/components/site/standard_container";
import { useLoaderData } from "react-router";


export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request });

  const { applicationData, reservationsData } = await getEventsOpenToUser({ userId: user.id });

  const programs = applicationData.map(app => app.program);

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
      reservations: reservationsData.filter(r => r.eventId === e.id)
    }))
  });

  return { events };
}



export default function Home({ loaderData }: Route.ComponentProps) {




  return (
    <>
      <PageHeading title="Available Events" />
      <EventsGrid />
    </>
  );
}


function EventsGrid() {
  const { events } = useLoaderData<typeof loader>()
  return (
    <StandardContainer>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </StandardContainer>
  );
}



