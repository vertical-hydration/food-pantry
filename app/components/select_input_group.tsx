


type SelectOption = {
  value: string;
  label: string;
};

type FieldProp = {
  id: string;
  name: string;
  defaultValue: string;
  errors: string[];
  label: string;
}

export function SelectInputGroup({ fields, options }: { fields: FieldProp, options: SelectOption[] }) {
  return <div className="sm:col-span-3">
    <label htmlFor={fields.id} className="block text-sm/6 text-left font-medium text-gray-900">
      {fields.label}
    </label>
    <div className="mt-2">
      <select
        id={fields.id}
        name={fields.name}
        defaultValue={fields.defaultValue}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    {Array.isArray(fields.errors) && fields.errors.length > 0 && (
      <p id={`${fields.name}-error`} className="mt-2 text-sm text-left text-red-600">
        {fields.errors[0]}
      </p>
    )}
  </div>
}