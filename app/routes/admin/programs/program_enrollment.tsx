import type { Route } from "./+types/program_enrollment";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { UserImage } from "~/components/user_image";
import { enrolleeColumns, EnrollmentTable, type Enrollee, } from "./program_tables";
import { mockEnrollees } from "./mockData";
import { useRouteLoaderData } from "react-router";
import type { Route as ProgramRoute } from "./+types/program_layout"
import { DataTable } from "~/components/site/data_table";
import { SectionDescription } from "~/components/site/section_description";




export async function loader() {

  const programSection = {
    title: "Enrolled Families",
    description: "Users who have enrolled in this program will be listed here. You can review their applications and take necessary actions."
  }
  return { programSection }
}

export default function ProgramEnrollment(
  { loaderData }: Route.ComponentProps
) {

  const data = useRouteLoaderData<ProgramRoute.ComponentProps["loaderData"]>("programId");

  const { programSection } = loaderData;

  const applications = data?.applications ?? [];

  const enrolled = applications.filter(a => a.status === "accepted");

  const tableData: Enrollee[] = enrolled.map(a => ({
    id: a.id.toString(),
    firstName: a.firstName,
    lastName: a.lastName,
    email: a.email,
    status: a.status,
    enrollmentDate: a.acceptedDate?.toDateString() ?? "No Date",
    appliedDate: a.createdAt.toDateString() ?? "No Date",
    image: "",
  }));

  return <>
    <SectionDescription
      heading={programSection.title}
      description={programSection.description}
    />

    <DataTable columns={enrolleeColumns} data={mockEnrollees} />
  </>;

}




const people = [
  {
    firstName: 'Leslie',
    lastName: 'Alexander',
    enrollment: 'Aug. 15 2025',
    applied: 'Aug. 1 2025',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    status: "Enrolled",
  },
]

function EnrollmentList() {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {people.map((person) => (
        <li key={person.enrollment} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <UserImage src={person.image} />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                <span className="hover:underline">
                  {person.firstName} {person.lastName}
                </span>
              </p>
              <p className="mt-1 flex text-xs/5 text-gray-500">
                <span className="truncate hover:underline">
                  Applied {person.applied}
                </span>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">
                {person.status}
              </p>
              <p className="mt-1 text-xs/5 text-gray-500">
                Enrollment Date
                {person.enrollment}
              </p>
            </div>
            <Menu as="div" className="relative flex-none">
              <MenuButton className="relative block text-gray-500 hover:text-gray-900">
                <span className="absolute -inset-2.5" />
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg outline outline-gray-900/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                  >
                    View profile<span className="sr-only">, {person.firstName} {person.lastName}</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <span

                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                  >
                    Message<span className="sr-only">, {person.firstName} {person.lastName}</span>
                  </span>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
  )
}
