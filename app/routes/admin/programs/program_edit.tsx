import { Form } from "react-router";
import type { Route } from "./+types/program_edit";
import { useForm } from "node_modules/@conform-to/react/dist/hooks";
import { parseWithZod } from "node_modules/@conform-to/zod/dist/v4/parse";
import { EditProgramSchema } from "./schemas";
import { TextGroupInput } from "~/components/text_input_group";
import { editProgram, getProgramData } from "./data.server";
import { requireSettingsView } from "~/services/auth/auth_utils.server";


export async function loader({ params }: Route.LoaderArgs) {
  const pid = Number(params.programId);
  const program = await getProgramData({ pid });

  if (!program) {
    throw new Response("Program not found", { status: 404 });
  }

  const initialValues = {
    name: program.name,
    status: program.status
  }

  return { program, initialValues };
}


export async function action({ params, request }: Route.ActionArgs) {
  await requireSettingsView({ request });

  const formData = await request.formData();



  return await editProgram({ formData });
}


export default function ProgramEdit({
  loaderData, actionData, params }: Route.ComponentProps
) {
  const pid = Number(params.programId);
  const { program, initialValues } = loaderData;
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: EditProgramSchema })
    },
    lastResult: actionData,
    defaultValue: initialValues,
  })
  return (
    <div className="flex items-center justify-center bg-gray-50 py-8 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
          Edit Program
        </h1>
        <Form
          method="POST"
          onSubmit={form.onSubmit}
          id={form.id}
        >
          <div className="grid grid-cols-1 gap-y-6">
            <TextGroupInput
              label={"Program Name"}
              id={fields.name.id}
              name={fields.name.name}
              defaultValue={fields.name.defaultValue}
              errors={fields.name.errors}
              autoComplete={fields.name.id}
            />

            {/* Status select input */}
            <div className="sm:col-span-3">
              <label htmlFor={fields.status?.id || 'status'} className="block text-sm/6 text-left font-medium text-gray-900">
                Status
              </label>
              <div className="mt-2">
                <select
                  id={fields.status?.id || 'status'}
                  name={fields.status?.name || 'status'}
                  defaultValue={fields.status?.defaultValue || 'active'}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              {Array.isArray(fields.status?.errors) && fields.status.errors.length > 0 && (
                <p id={`${fields.status?.name || 'status'}-error`} className="mt-2 text-sm text-left text-red-600">
                  {fields.status.errors[0]}
                </p>
              )}
            </div>
            <input type="hidden" name={"programId"} value={pid} />
          </div>
          <pre className="bg-gray-100 rounded-md p-3 mt-4 text-xs text-gray-600 overflow-x-auto">
            {JSON.stringify(form.allErrors, null, 2)}
          </pre>
          <div className="mt-8 flex gap-4 justify-end">
            <button
              type="submit"
              name="intent"
              value="editProgram"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-2 text-base font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition"
            >
              Save
            </button>
            <button
              type="button"
              data-autofocus
              className="inline-flex items-center justify-center rounded-md bg-gray-200 px-6 py-2 text-base font-semibold text-gray-700 shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition"
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  )

}
