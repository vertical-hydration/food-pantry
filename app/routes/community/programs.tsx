
import { Link } from "react-router";
import type { Route } from "./+types/programs";
import { getOpenProgramsForUser } from "./community.server";
import { requireAuth } from "~/services/auth/auth_utils.server";


export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request });

  const programs = await getOpenProgramsForUser({ userId: user.id });

  return { programs };
}

export default function Programs({ loaderData }: Route.ComponentProps) {
  const { programs } = loaderData;


  return (
    <main>
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Open Programs for Enrollment
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {programs && programs.length > 0 ? (
            programs.map((program) => (
              <div key={program.id} className="bg-white border-2 border-gray-300 rounded-lg shadow p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{program.name}</h2>

                </div>
                {
                  program.applications.length === 0 ? (
                    <Link
                      className="mt-4 px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition"
                      to={`/community/programs/${program.id}`}
                    >
                      Apply
                    </Link>)
                    : (
                      <p className="mt-4 text-gray-600">You have already applied to this program.</p>
                    )
                }
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No programs available.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}