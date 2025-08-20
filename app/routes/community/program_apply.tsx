import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { requireAuth } from '~/services/auth/auth_utils.server'
import type { Route } from './+types/program_apply'
import { AddressSchema } from './schemas';
import { parseWithZod } from '@conform-to/zod/v4';
import { Form } from 'react-router';
import { saveProfileAddress } from './data.server';
import AddStudentForm from './components/add_student_form';


const students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', school: 'Example High School' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', school: 'Example High School' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', school: 'Example High School' }
]


export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request });

  return { user };
};

export async function action({ request }: Route.ActionArgs) {
  const { user } = await requireAuth({ request });

  const formData = await request.formData();

  console.log("formData", formData);

  await saveProfileAddress({ formData, userId: user.id });

};



export default function ApplicationForm({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      <div className="divide-y divide-gray-900/50">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
            <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
          </div>

          <ProfileForm />
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Student Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Add the information of each student in your family.
            </p>
          </div>
          <div className="space-y-4 md:col-span-2">

            <StudentList />
            <AddStudentForm />

          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Submit Application
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Submit yout Application
            </p>
          </div>

          <form className="bg-white shadow-xs outline outline-gray-900/5 sm:rounded-xl md:col-span-2">



            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}


function ProfileForm() {


  return <Form
    method="POST"
    className="bg-white shadow-xs outline outline-gray-900/5 sm:rounded-xl md:col-span-2"
  >
    <div className="px-4 py-6 sm:p-8">
      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
            First name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
            Last name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>




        <div className="col-span-full">
          <label htmlFor="street" className="block text-sm/6 font-medium text-gray-900">
            Street address
          </label>
          <div className="mt-2">
            <input
              id="street"
              name="street"
              type="text"
              autoComplete="street"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
        <div className="col-span-full">
          <label htmlFor="street2" className="block text-sm/6 font-medium text-gray-900">
            Secondary address
          </label>
          <div className="mt-2">
            <input
              id="street2"
              name="street2"
              type="text"
              autoComplete="street2"
              placeholder="Apt, suite, etc. (optional)"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
            City
          </label>
          <div className="mt-2">
            <input
              id="city"
              name="city"
              type="text"
              autoComplete="address-level2"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="state" className="block text-sm/6 font-medium text-gray-900">
            State / Province
          </label>
          <div className="mt-2">
            <input
              id="state"
              name="state"
              type="text"
              autoComplete="address-level1"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="zip" className="block text-sm/6 font-medium text-gray-900">
            ZIP / Postal code
          </label>
          <div className="mt-2">
            <input
              id="zip"
              name="zip"
              type="text"
              autoComplete="postal-code"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
          </div>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
      <button type="button" className="text-sm/6 font-semibold text-gray-900">
        Cancel
      </button>
      <button
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </Form>
}

function AddStudentCard() {

  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-xs outline outline-gray-200 /5 sm:rounded-xl ">
      <div className="px-4 py-5 sm:px-6">
        Add A Student
      </div>
      <div className="px-2 py-2">
        {/* Content goes here */}

        <div className="px-6">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="school" className="block text-sm/6 font-medium text-gray-900">
                School
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="school"
                  name="school"
                  autoComplete="school-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>Primary</option>
                  <option>Elementary</option>
                  <option>Middle</option>
                  <option>High</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
            </div>
          </div>
        </div>

      </div>




      <div className="flex  items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add
        </button>
      </div>
    </div>
  )
}



function StudentList() {

  if (students.length === 0) {
    return <EmptyState />
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {students.map((student) => (
        <li key={student.id} className="flex items-center justify-between gap-x-6 py-5">
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className="text-sm/6 font-semibold text-gray-900">
                {student.name}
              </p>
            </div>
            <div
              className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500"
            >
              <p className="whitespace-nowrap">
                Added <time dateTime={new Date("10-12-2025").toISOString()}> test time</time>
              </p>
              <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="truncate">
                {student.school}
              </p>
            </div>
          </div>
          <div className="flex flex-none items-center gap-x-4">
            <button
              type="button"
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 "
            >
              Remove <span className="sr-only">, {student.name}</span>
            </button>

          </div>
        </li>
      ))}
    </ul>
  )
}


function EmptyState() {

  return <div
    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600"
  >
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 48 48"
      aria-hidden="true"
      className="mx-auto size-12 text-gray-400"
    >
      <path
        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="mt-2 block text-sm font-semibold text-gray-900">
      Add Student
    </span>
  </div>
}