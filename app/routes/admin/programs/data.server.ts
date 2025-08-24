import { and, eq } from "drizzle-orm";
import { db } from "~/services/db/db.server";
import { applications, programs } from "~/services/db/schema";
import { AddProgramSchema, ChangeStatusSchema } from "./schemas";
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

const getApplicationData = async (applicationId: number) => {
  const data = await db.query.applications.findFirst({
    where: (applications, { eq }) => eq(applications.id, applicationId),
    with: {
      studentLinks: {
        with: {
          student: true,
        },
      },
    },
  });

  if (!data) {
    throw new Error(" No Application with that id");
  }

  const { studentLinks, ...application } = data;

  const students = studentLinks.map((link) => link.student);

  return {
    application,
    students,
  };
};

const updateApplicationStatus = async ({
  aid,
  formData,
}: {
  aid: number;
  // newStatus: "submitted" | "accepted" | "waitlist" | "declined";
  formData: FormData;
}) => {
  const submission = parseWithZod(formData, { schema: ChangeStatusSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { newStatus } = submission.value;

  await db
    .update(applications)
    .set({ status: newStatus })
    .where(eq(applications.id, aid));

  return submission.reply();
};

const getProgramEnrollment = async ({ programId }: { programId: string }) => {
  const data = await db
    .select()
    .from(applications)
    .where(
      and(
        eq(applications.programId, Number(programId)),
        eq(applications.status, "accepted")
      )
    );
};

export {
  getPrograms,
  getProgram,
  addProgram,
  getProgramApplications,
  getApplicationData,
  updateApplicationStatus,
};
