import { useState } from "react";
import { Form, useNavigate } from "react-router";
import type { Route } from "./+types/add_program";
import { requireSettingsView } from "~/services/auth/auth_utils.server";
import { addProgram } from "./data.server";
import { PageHeading } from "~/components/site/headers";
import { SectionDescription } from "~/components/site/section_description";
import { StandardContainer } from "~/components/site/standard_container";


export async function action({ request }: Route.ActionArgs) {
  await requireSettingsView({ request });
  const formData = await request.formData();

  return addProgram({ formData });
}

export default function AddProgram() {

  return <>
    <PageHeading title="Add New Program" />
    <SectionDescription
      heading="Create a New Program"
      description="Fill out the form below to create a new program."
    />
    <ProgramAddForm />
  </>
}

function ProgramAddForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <StandardContainer>
      <div className="max-w-md mx-auto mt-10">
        <Form
          method="post"
          onSubmit={async (e) => {
            // Optionally handle client-side validation here
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Program Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="active" className="inline-flex items-center">
              <input
                type="checkbox"
                name="active"
                id="active"
                className="mr-2"
                defaultChecked
              />
              Active
            </label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Program
            </button>
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </StandardContainer>
  );
}

