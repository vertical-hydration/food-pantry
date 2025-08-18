import type { Route } from "./+types/home";
import { getOpenPrograms } from "./data.server";


export async function loader({ request }: Route.LoaderArgs) {

  const programs = await getOpenPrograms();

  return { programs };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { programs } = loaderData;
  const eventList = programs.programs;

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

      </div>
    </main>
  );
}