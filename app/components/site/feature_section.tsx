import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import { BellAlertIcon, CalendarDaysIcon, ClipboardDocumentCheckIcon, DocumentCheckIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Create Account',
    description:
      'Use any google or gmail account to create an account.',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Enroll In Programs',
    description: 'Families can apply to any of our open programs directly from this site.',
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: 'Reserve A Spot for Events',
    description: 'Families enrolled in a program will see events like food drive thrus and can reserve their spot directly through the app.',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Stay in Touch',
    description: 'Families enrolled in a program will receive updates and notifications about important events and deadlines.',
    icon: BellAlertIcon,
  },
]

const sectionInfo = {
  superHeading: 'Direct Connection',
  heading: 'Connect directly with CIS-Thomasville',
  description: 'Our app allows families to connect directly with Communities in Schools of Thomasville to access our services and programs all in one place.',
}

export default function FeatureSection() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">
                {sectionInfo.superHeading}
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {sectionInfo.heading}
              </p>
              <p className="mt-6 text-lg/8 text-gray-700">
                {sectionInfo.description}
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <img
            alt="Product screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
