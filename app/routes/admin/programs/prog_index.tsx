import { Link } from "react-router";
import type { Route } from "./+types/prog_index";
import { getPrograms } from "./data.server";




export async function loader() {
  const programs = await getPrograms();

  return { programs };
}

export async function action({ request }: Route.ActionArgs) {


  // Perform your action here, e.g., create a new program
  return null;
}

export default function Programs({ loaderData }: Route.ComponentProps) {
  const { programs } = loaderData;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            Programs
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the programs in your account including their name, description, and status.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link to="create">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Program
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {programs.map((program) => (
                  <tr key={program.id}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {program.name}
                    </td>
                    <td
                      className="px-3 py-4 text-sm whitespace-nowrap text-gray-500"
                    >
                      {program.status}
                    </td>
                    <td
                      className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0"
                    >
                      <Link to={`/admin/programs/${program.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Link<span className="sr-only">, {program.name}</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
