import { useEffect, useState } from "react"
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react"
import { useForm } from "@conform-to/react"
import { useFetcher } from "react-router"
import { ClipboardDocumentIcon } from "@heroicons/react/16/solid"





const demoStatusOptions = [
  { id: 'submitted', title: 'Submitted' },
  { id: 'accepted', title: 'Accepted' },
  { id: 'waitlist', title: 'Waitlist' },
  { id: 'declined', title: 'Declined' }
];

export type StatusOption = {
  id: string,
  title: string
}

export default function ChangeStatusForm({
  currentStatus,
  statusOptions,
  id,
  buttonText,
}: {
  currentStatus: string,
  statusOptions: StatusOption[],
  id: string,
  buttonText: string
}) {
  const [open, setOpen] = useState(false)
  const [newStatus, setNewStatus] = useState(currentStatus)
  const fetcher = useFetcher();
  const state = fetcher.state;

  const lastAction = fetcher.data

  const [form, fields] = useForm({})

  const handleStatusChange = (status: string) => {
    setNewStatus(status);
  };

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
        {buttonText}
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

              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <ClipboardDocumentIcon
                  aria-hidden="true"
                  className="size-6 text-green-600"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Change Status
                </DialogTitle>
                <div className="px-6">
                  <div
                    className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 "
                  >
                    <fieldset>
                      <legend className="text-sm/6 font-semibold text-gray-900">
                        Status Options
                      </legend>
                      <p className="mt-1 text-sm/6 text-gray-600">
                        Select new Status
                      </p>
                      <div className="mt-6 space-y-6">
                        {statusOptions.map((option) => (
                          <div key={option.id} className="flex items-center">
                            <input
                              defaultChecked={option.id === newStatus}
                              id={option.id}
                              name="notification-method"
                              type="radio"
                              onChange={() => handleStatusChange(option.id)}
                              className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            />
                            <label htmlFor={option.id} className="ml-3 block text-sm/6 font-medium text-gray-900">
                              {option.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <fetcher.Form
                method="POST"
                onSubmit={form.onSubmit}
                id={form.id}
              >
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <input type="hidden" name="newStatus" value={newStatus} />
                  <input type="hidden" name="id" value={id} />
                  <button
                    type="submit"
                    name="intent"
                    value="changeStatus"

                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  >
                    Change Status
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
