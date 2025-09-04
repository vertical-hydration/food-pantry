import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { NavLink } from "react-router";
import { StandardContainer } from "./standard_container";

export function PageHeading({ title }: { title: string }) {
  return (
    <StandardContainer>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1
            className="text-4xl font-extrabold text-indigo-700 drop-shadow-sm tracking-tight sm:text-5xl"
          >
            {title}
          </h1>
        </div>
      </div>
    </StandardContainer>
  )
}


export function SectionHeading({
  title, children
}: { title: string, children?: React.ReactNode }) {
  return (
    <StandardContainer>
      <div className="py-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-semibold text-indigo-800 tracking-tight sm:text-3xl sm:tracking-tight drop-shadow">
            {title}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          {children}
        </div>
      </div>
    </StandardContainer>
  )
}



export function PageHeader({ info }: {
  info: {
    name: string,
    description: string,
    editUrl: string,
  }
}) {
  return (
    <div className="py-2 md:flex md:items-center md:justify-between ">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {info.name}
        </h2>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50"
        >
          Edit
        </button>
        <button
          type="button"
          className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Publish
        </button>
      </div>
    </div>
  )
}




