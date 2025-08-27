import { requireAuth } from "~/services/auth/auth_utils.server";
import type { Route } from "./+types/home";
import { getEventsOpenToUser, } from "./community.server";


export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request });

  const data = await getEventsOpenToUser({ userId: user.id });

  return { data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data } = loaderData;


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
        <h3>Program Data</h3>
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </main>
  );
}