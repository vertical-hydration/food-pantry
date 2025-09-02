import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { BriefcaseIcon, CalendarIcon, ClockIcon, MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'
import type { EventCardProps, EventDetails } from '~/components/events/event_card'
import { useFetcher } from 'react-router'









export default function ReserveCard({ event }: { event: EventDetails }) {
  const [open, setOpen] = useState(false)

  const postUrl = `/community/events/${event.id}/reserve`
  const fetcher = useFetcher();

  return (
    <>
      <button onClick={() => setOpen(true)}>Reserve</button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <DialogPanel
              transition
              className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
            >
              <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-10 md:p-6 lg:p-8">
                {/* <div> */}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
                {/* </div> */}

                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <img
                    alt={event.imageAlt}
                    src={event.imageSrc}
                    className="aspect-square w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                  />
                  <div className="sm:col-span-8 lg:col-span-7 md:mt-8">


                    <EventHeader />

                    <section aria-labelledby="options-heading" className="mt-10">
                      <h3 id="options-heading" className="sr-only">
                        Product options
                      </h3>

                      <fetcher.Form method="post" action={postUrl}>


                        {/* Pickup Times */}
                        <fieldset aria-label="Choose Pickup Time" className="mt-10">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              Pickup Time
                            </div>

                          </div>

                          <div className="mt-2 grid grid-cols-4 gap-3">
                            {event.pickupTimes.map((t) => (
                              <label
                                key={t.id}
                                aria-label={t.name}
                                className="group relative flex items-center justify-center rounded-md border border-gray-300 bg-white p-3 has-checked:border-indigo-600 has-checked:bg-indigo-600 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-indigo-600 has-disabled:border-gray-400 has-disabled:bg-gray-200 has-disabled:opacity-25"
                              >
                                <input
                                  defaultValue={t.id}
                                  defaultChecked={t === event.pickupTimes[2]}
                                  name="pickupTime"
                                  type="radio"
                                  disabled={!t.available}
                                  className="absolute inset-0 appearance-none focus:outline-none disabled:cursor-not-allowed"
                                />
                                <span className="text-sm font-medium text-gray-900 uppercase group-has-checked:text-white">
                                  {t.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        <button
                          type="submit"
                          className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                        >
                          Request Reservation
                        </button>
                      </fetcher.Form>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}




function EventHeader() {
  const event = {
    id: 2,
    name: "Food Box Pickup",
    address: "123 Main St, Thomasville, NC",
    time: "2pm",
    date: "Jan 9, 2020"

  }
  return (
    <div className="w-full max-w-xl mx-auto bg-gradient-to-r from-indigo-100 via-white to-indigo-50 rounded-2xl shadow-lg p-8 mb-8 border border-indigo-200 flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <div className="flex items-center mb-2">
          <BriefcaseIcon
            aria-hidden="true"
            className="w-8 h-8 
          text-indigo-500 mr-3"
          />
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