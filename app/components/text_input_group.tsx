


export function TextGroupInput({
  label,
  id,
  name,
  autoComplete,
  errors = [],
  defaultValue
}: {
  label: string,
  id: string,
  name: string,
  autoComplete?: string,
  errors?: string[],
  defaultValue?: string
}) {


  return <div className="sm:col-span-3">
    <label htmlFor={id} className="block text-sm/6 text-left font-medium text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type="text"
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
    </div>
    {
      errors.length > 0 && (
        <p id={`${name}-error`} className="mt-2 text-sm text-left text-red-600">
          {errors[0]}
        </p>
      )
    }
  </div>
}
export function DateInput({
  label,
  id,
  name,
  errors = [],
  defaultValue
}: {
  label: string,
  id: string,
  name: string,
  errors?: string[],
  defaultValue?: string
}) {


  return <div className="sm:col-span-3">
    <label htmlFor={id} className="block text-sm/6 text-left font-medium text-gray-900">
      {label}
    </label>
    <div className="mt-2">
      <input
        id={id}
        name={name}
        type="datetime-local"
        defaultValue={defaultValue}
        className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
    </div>
    {
      errors.length > 0 && (
        <p id={`${name}-error`} className="mt-2 text-sm text-left text-red-600">
          {errors[0]}
        </p>
      )
    }
  </div>
}