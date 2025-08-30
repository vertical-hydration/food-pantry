import { DateInput, TextGroupInput } from '~/components/text_input_group'
import { useForm } from "@conform-to/react"
import { Form, useActionData, useLoaderData } from "react-router"
import { parseWithZod } from "node_modules/@conform-to/zod/dist/v4/parse"
import { requireAuth, requireSettingsView } from "~/services/auth/auth_utils.server"
import { createReservation } from './community.server'
import { CreateReservationSchema } from './schemas'
import type { Route } from './+types/request_reservation'
import { SelectInputGroup } from '~/components/select_input_group'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid'
import { ClockIcon } from '@heroicons/react/24/outline'

export async function loader({ request }: Route.LoaderArgs) {
  const { user } = await requireAuth({ request })

  const selectOptions = [
    { value: '1400', label: '2pm' },
    { value: '1500', label: '3pm' },
    { value: '1600', label: '4pm' },
    { value: '1700', label: '5pm' },
  ]

  const profile = {
    firstName: "Jon",
    lastName: "Snow",
    email: user.email,
  }

  const event = {
    id: 2,
    name: "Food Box Pickup",
    address: "123 Main St, Thomasville, NC",
    time: "2pm",
    date: "Jan 9, 2020"

  }

  return { user, selectOptions, profile, event }
}


export async function action({ request }: Route.ActionArgs) {
  const { } = await requireSettingsView({ request })

  const formData = await request.formData()

  return await createReservation({ formData })

}

export default function CreateReservation({ params, loaderData }: Route.ComponentProps) {
  const lastResult = useActionData();
  const eventId = params.eventId

  const { user, selectOptions, profile, event } = loaderData;

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: CreateReservationSchema })
    },
    lastResult
  })
  return (
    <>
      <EventHeader />
      <div className="flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white py-12 px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-indigo-100 p-10">
          <div className="flex flex-col items-center mb-8">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </span>
            <h1 className="text-3xl font-extrabold text-indigo-700 text-center">Request Reservation</h1>
            <p className="text-gray-500 mt-2 text-center">Reserve your pickup time for the event below.</p>
          </div>
          <div className="border-b border-gray-200 mb-8"></div>
          <Form
            method="POST"
            onSubmit={form.onSubmit}
            id={form.id}
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <div className="bg-gray-50 rounded-lg px-4 py-2 text-lg font-semibold text-gray-800 shadow-sm">
                {profile.firstName} {profile.lastName}
              </div>
            </div>
            <div className="mb-6">
              <SelectInputGroup
                fields={{
                  id: fields.reserveTime.id,
                  name: fields.reserveTime.name,
                  defaultValue: fields.reserveTime.defaultValue || selectOptions[0].value,
                  errors: fields.reserveTime.errors || [],
                  label: 'Pickup Time'
                }}
                options={selectOptions}
              />
            </div>
            {Object.keys(form.allErrors).length > 0 && (
              <pre className="bg-red-50 border border-red-200 rounded-md p-3 mb-4 text-xs text-red-600 overflow-x-auto">
                {JSON.stringify(form.allErrors, null, 2)}
              </pre>
            )}
            <div className="mt-10 flex gap-4 justify-end">
              <button
                type="submit"
                name="intent"
                value="createEvent"
                className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-3 text-base font-bold text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-all duration-150"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Request Reservation
              </button>
              <button
                type="button"
                data-autofocus
                className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-8 py-3 text-base font-bold text-gray-700 shadow hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-150"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>

  );
}





function EventHeader() {
  const { event } = useLoaderData<typeof loader>();

  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-r from-indigo-100 via-white to-indigo-50 rounded-2xl shadow-lg p-8 mb-8 border border-indigo-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <BriefcaseIcon aria-hidden="true" className="w-8 h-8 text-indigo-500 mr-3" />
          <h2
            className="text-3xl font-extrabold text-indigo-700 tracking-tight"
          >
            {event.name}
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-8 mt-2">
          <div className="flex items-center text-base text-gray-700 mb-2 sm:mb-0">
            <MapPinIcon aria-hidden="true" className="w-5 h-5 text-indigo-400 mr-2" />
            <span className="font-medium">
              {event.address}
            </span>
          </div>
          <div className="flex items-center text-base text-gray-700 mb-2 sm:mb-0">
            <ClockIcon aria-hidden="true" className="w-5 h-5 text-indigo-400 mr-2" />
            <span className="font-medium">
              {event.time}
            </span>
          </div>
          <div className="flex items-center text-base text-gray-700">
            <CalendarIcon aria-hidden="true" className="w-5 h-5 text-indigo-400 mr-2" />
            <span className="font-medium">
              {event.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}





