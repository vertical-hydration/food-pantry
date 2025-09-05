import type { Route } from "./+types/application_approve";
import { getApplicationData, updateApplicationStatus } from "./data.server";
import ApplicationCard from "./application_card";
import StudentsCard from "./students_card";
import { requireSettingsView } from "~/services/auth/auth_utils.server";
import ChangeStatusForm from "./set_application_status";


export async function loader({ request, params }: Route.LoaderArgs) {
  const aid = params.applId

  const { application, students } = await getApplicationData(Number(aid))

  const application2 = {
    user: {
      email: "user.email"
    },
    program: {
      name: "program?.name"
    },
    profile: {
      firstName: "profile.firstName",
      lastName: "profile.lastName",
      street: "profile.street",
      street2: "profile.street2 ?? ''",
      city: "profile.city",
      state: "profile.state",
      zip: "profile.zip"
    }
  };
  return { application, students };
}


export async function action({ request, params }: Route.ActionArgs) {
  await requireSettingsView({ request });

  const formData = await request.formData();



  return await updateApplicationStatus({
    aid: Number(params.applId),
    formData
  });
}



export default function ApplicationApproval({
  loaderData
}: Route.ComponentProps) {
  const { application, students } = loaderData;
  return <>
    <ChangeStatusForm currentStatus={application.status ?? "submitted"} />
    <ApplicationCard applicationInfo={application} />
    <StudentsCard students={students} />
  </>
}

