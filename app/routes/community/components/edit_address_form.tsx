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
import { TextGroupInput } from '~/components/text_input_group'
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { AddressSchema } from "../schemas"
import { Form, useFetcher } from "react-router"
import type { action } from "../program_apply"
import type z from "zod"

type Address = z.infer<typeof AddressSchema>;


export default function EditAddressForm({
  defaultValue
}: {
  defaultValue: Address
}) {
  const [open, setOpen] = useState(false)
  const fetcher = useFetcher<typeof action>();
  const state = fetcher.state;



  const lastAction = fetcher.data

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddressSchema })
    },
    lastResult: fetcher.state === 'idle' ? lastAction : null,
    defaultValue
  })

  useEffect(() => {
    const status = lastAction?.status;
    if (state === "idle" && status === "success") {
      setOpen(false);
    }
  }, [state, lastAction]);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
      >
        Edit Address
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <fetcher.Form
                method="POST"
                onSubmit={form.onSubmit}
                id={form.id}
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                  <HomeIcon
                    aria-hidden="true"
                    className="size-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Edit Profile
                  </DialogTitle>
                  <div className="px-6">
                    <div
                      className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 "
                    >
                      <TextGroupInput
                        label={"First Name"}
                        id={fields.firstName.id}
                        name={fields.firstName.name}
                        defaultValue={fields.firstName.defaultValue}
                        errors={fields.firstName.errors}
                        autoComplete={fields.firstName.id}
                      />


                      <TextGroupInput
                        label={"Last Name"}
                        id={fields.lastName.id}
                        name={fields.lastName.name}
                        defaultValue={fields.lastName.initialValue}
                        errors={fields.lastName.errors}
                        autoComplete={fields.lastName.id}
                      />
                      <TextGroupInput
                        label={"Apartment/Unit"}
                        id={fields.street2.id}
                        name={fields.street2.name}
                        defaultValue={fields.street2.initialValue}
                        errors={fields.street2.errors}
                        autoComplete={fields.street2.id}
                      />
                      <TextGroupInput
                        label={"Street"}
                        id={fields.street.id}
                        name={fields.street.name}
                        defaultValue={fields.street.defaultValue}
                        errors={fields.street.errors}
                        autoComplete={fields.street.id}
                      />
                      <TextGroupInput
                        label={"City"}
                        id={fields.city.id}
                        name={fields.city.name}
                        defaultValue={fields.city.defaultValue}
                        errors={fields.city.errors}
                        autoComplete={fields.city.id}
                      />
                      <TextGroupInput
                        label={"State"}
                        id={fields.state.id}
                        name={fields.state.name}
                        defaultValue={fields.state.defaultValue}
                        errors={fields.state.errors}
                        autoComplete={fields.state.id}
                      />
                      <TextGroupInput
                        label={"ZIP Code"}
                        id={fields.zip.id}
                        name={fields.zip.name}
                        defaultValue={fields.zip.defaultValue}
                        errors={fields.zip.errors}
                        autoComplete={fields.zip.id}
                      />

                    </div>
                  </div>
                  <pre>
                    {JSON.stringify(form.allErrors, null, 2)}
                    <br />
                    {JSON.stringify(defaultValue, null, 2)}
                  </pre>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    name="intent"
                    value="saveAddress"

                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    Cancel
                  </button>
                </div>
              </fetcher.Form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
