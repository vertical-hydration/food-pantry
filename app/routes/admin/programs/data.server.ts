import { eq } from "drizzle-orm";
import { db } from "~/services/db/db.server";
import { applications, programs } from "~/services/db/schema";
import { AddProgramSchema } from "./schemas";
import { parseWithZod } from "@conform-to/zod/v4";
import { redirect } from "react-router";

//  Data Fetching
const getPrograms = async () => {
  const data = await db.query.programs.findMany({
    // where: (programs, { eq }) => eq(programs.status, "active"),
  });
  return data;
};

const getProgram = async ({ pid }: { pid: number }) => {
  return await db.query.programs.findFirst({
    where: (programs, { eq }) => eq(programs.id, pid),
  });
};

const addProgram = async ({ formData }: { formData: FormData }) => {
  const submission = parseWithZod(formData, { schema: AddProgramSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name } = submission.value;

  await db.insert(programs).values(submission.value);

  return redirect("/admin/programs");
};

const getProgramApplications = async (programId: number) => {
  const data = await db.query.programs.findFirst({
    where: (programs, { eq }) => eq(programs.id, programId),
    with: {
      applications: true,
    },
  });

  return data;
};

export { getPrograms, getProgram, addProgram, getProgramApplications };
