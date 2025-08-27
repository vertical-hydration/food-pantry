import { useEffect, useState } from "react"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react"
import {
  ChevronDownIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import { DateInput, TextGroupInput } from '~/components/text_input_group'
import { useForm } from "@conform-to/react"
import { Form, useActionData } from "react-router"
import { parseWithZod } from "node_modules/@conform-to/zod/dist/v4/parse"
import { NewEventSchema } from "./schemas"

export async function loader() {
  return {}
}


export async function action() {
  return {}
}

export default function CreateEvents() {
  const lastResult = useActionData();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: NewEventSchema })
    },
    lastResult
  })
  return (
    <div>
      <h1>Create Event</h1>
      <div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <Form
              method="POST"
              onSubmit={form.onSubmit}
              id={form.id}
            >


              <div className="px-6">
                <div
                  className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 "
                >
                  <TextGroupInput
                    label={"Event Name"}
                    id={fields.name.id}
                    name={fields.name.name}
                    defaultValue={fields.name.defaultValue}
                    errors={fields.name.errors}
                    autoComplete={fields.name.id}
                  />
                  <DateInput
                    label={"Event Date"}
                    id={fields.eventDate.id}
                    name={fields.eventDate.name}
                    defaultValue={fields.eventDate.defaultValue}
                    errors={fields.eventDate.errors}
                  />
                  <DateInput
                    label={"Open Date"}
                    id={fields.openDate.id}
                    name={fields.openDate.name}
                    defaultValue={fields.openDate.defaultValue}
                    errors={fields.openDate.errors}
                  />
                  <DateInput
                    label={"Close Date"}
                    id={fields.closeDate.id}
                    name={fields.closeDate.name}
                    defaultValue={fields.closeDate.defaultValue}
                    errors={fields.closeDate.errors}
                  />

                </div>
              </div>
              <pre>
                {JSON.stringify(form.allErrors, null, 2)}
                <br />
                {/* {JSON.stringify(defaultValue, null, 2)} */}
              </pre>

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="submit"
                  name="intent"
                  value="createEvent"

                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                >
                  Create Event
                </button>
                <button
                  type="button"
                  data-autofocus
                  // onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                >
                  Cancel
                </button>
              </div>
            </Form>

          </div>
        </div>
      </div>
    </div>
  );
}