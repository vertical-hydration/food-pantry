import { useState } from "react"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { TextGroupInput } from '~/components/text_input_group'
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod/v4"
import { AddStudentSchema } from "../schemas"

export default function AddStudentForm() {
  const [open, setOpen] = useState(true)

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddStudentSchema })
    }
  })

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
      >
        Add Student
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
              <div>
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon aria-hidden="true" className="size-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                    Payment successful
                  </DialogTitle>
                  <div className="px-6">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 ">
                      <TextGroupInput
                        label={"First Name"}
                        id={fields.firstName.id}
                        name={fields.firstName.name}
                        defaultValue={fields.firstName.defaultValue}
                        errorMessage={"error"}
                        autoComplete={fields.firstName.id}
                      />


                      <TextGroupInput
                        label={"Last Name"}
                        id={fields.lastName.id}
                        name={fields.lastName.name}
                        defaultValue={fields.lastName.defaultValue}
                        errorMessage={"Required"}
                        autoComplete={fields.lastName.id}
                      />

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
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                >
                  Deactivate
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
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
