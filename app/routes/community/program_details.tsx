import { Fragment } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { clsx } from 'clsx'
import { Link } from 'react-router'

const program = {
  name: 'Food Box Pickup Program',
  updatedAt: new Date(),
  description:
    'The Food Box Pickup Program provides fresh groceries to families in need. Participants can select their preferred pickup time and receive a box of nutritious food items.',
  eligibility: [
    'Family with student in Thomasville City School System',
    'Reside in Thomasville City School District',
  ],
  imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-05-product-01.jpg',
  imageAlt: 'Sample of 30 icons with friendly and fun details in outline, filled, and brand color styles.',
}

const faqs = [
  {
    question: 'How often are food boxes available?',
    answer:
      'Food boxes availability depends on partner benefits from Second Harvest',
  },
  {
    question: 'Can I reserve more than one food box?',
    answer:
      "Unfortunately, each family is only allowed to reserve one food box per event.",
  },
]




export default function ProgramDetails() {
  return (
    <div className="bg-white">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <img
              alt={program.imageAlt}
              src={program.imageSrc}
              className="aspect-4/3 w-full rounded-lg bg-gray-100 object-cover"
            />
          </div>

          {/* Product details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {program.name}
                </h1>

                <h2 id="information-heading" className="sr-only">
                  Product information
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  (Updated{' '}
                  <time dateTime={program.updatedAt.toISOString()}>{program.updatedAt.toLocaleDateString()}</time>)
                </p>
              </div>

            </div>

            <p className="mt-6 text-gray-500">{program.description}</p>



            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Eligibility Requirements
              </h3>
              <div className="mt-4">
                <ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-500 marker:text-gray-300">
                  {program.eligibility.map((highlight) => (
                    <li key={highlight} className="pl-2">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
          {/* Tab Group */}
          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-md font-medium text-gray-900">
                FAQs
              </h2>
            </div>
            <div className="text-sm text-gray-500">
              <h3 className="">Frequently Asked Questions</h3>

              <dl>
                {faqs.map((faq) => (
                  <Fragment key={faq.question}>
                    <dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
                    <dd className="mt-2 text-sm/6 text-gray-500">
                      <p>{faq.answer}</p>
                    </dd>
                  </Fragment>
                ))}
              </dl>
            </div>

          </div>


        </div>
        <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Link
              to="apply"
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
            >
              Apply
            </Link>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 px-8 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




const incentives = [
  {
    name: 'Population Served',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-shipping-simple.svg',
    description: "Families with a student in the Thomasville City Schools district.",
  },
  {
    name: 'Reservation Policy',
    imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-warranty-simple.svg',
    description: "Reservations must be made at least 24 hours in advance.",
  },
  // {
  //   name: '',
  //   imageSrc: 'https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-exchange-simple.svg',
  //   description:
  //     "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  // },
]

function Example1() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">
              Food Box Pickup Program
            </h2>
            <p className="mt-4 text-gray-500">
              The Food Box pickup program is designed to help community members access essential food items. Participants can reserve a food box for pickup at designated times, ensuring they receive nutritious meals provided by our partners.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {incentives.map((incentive) => (
              <div key={incentive.name} className="sm:flex lg:block">
                <div className="sm:shrink-0">
                  <img alt="" src={incentive.imageSrc} className="size-16" />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                  <h3 className="text-sm font-medium text-gray-900">{incentive.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
