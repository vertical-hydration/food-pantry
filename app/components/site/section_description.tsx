export function SectionDescription({
  heading, description
}: {
  heading: string, description: string
}) {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h3 className="text-base font-semibold text-gray-900">{heading}</h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        {description}
      </p>
    </div>
  )
}