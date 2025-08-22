import { parseWithZod } from "@conform-to/zod/v4";
import { AddressSchema, AddStudentSchema } from "./schemas";
import { db } from "~/services/db/db.server";
import {
  applications,
  profiles,
  programs,
  students,
} from "~/services/db/schema";

const getOpenPrograms = async () => {
  const programs = [
    {
      id: 1,
      name: "Food Pantry Box",
      description: "For reserving food box pickups",
    },
    {
      id: 2,
      name: "Drive Thru Events",
      description: "For occasionally monthly drive thru events",
    },
  ];

  return { programs };
};

const saveProfileAddress = async ({
  formData,
  userId,
}: {
  formData: FormData;
  userId: string;
}) => {
  const submission = parseWithZod(formData, {
    schema: AddressSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { firstName, lastName, street, street2, zip, city, state } =
    submission.value;

  await db
    .insert(profiles)
    .values({
      id: userId,
      firstName,
      lastName,
      street,
      street2,
      city,
      state,
      zip,
    })
    .onConflictDoUpdate({
      target: profiles.id,
      set: {
        firstName,
        lastName,
        street,
        street2,
        city,
        state,
        zip,
      },
    });

  return submission.reply();
};

const addStudent = async ({
  formData,
  userId,
}: {
  formData: FormData;
  userId: string;
}) => {
  const submission = parseWithZod(formData, {
    schema: AddStudentSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const { firstName, lastName, school } = submission.value;

  await db.insert(students).values({
    firstName,
    lastName,
    school,
    userId,
  });

  return submission.reply();
};

const getStudents = async ({ userId }: { userId: string }) => {
  return await db.query.students.findMany({
    where: (students, { eq }) => eq(students.userId, userId),
  });
};

const getProfile = async ({ userId }: { userId: string }) => {
  return await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId),
  });
};

const getProgram = async ({ programId }: { programId: string }) => {
  return await db.query.programs.findFirst({
    where: (programs, { eq }) => eq(programs.id, Number(programId)),
  });
};

const getApplicationData = async ({
  userId,
  programId,
}: {
  userId: string;
  programId: string;
}) => {
  const students = await getStudents({ userId });

  const profile = await getProfile({ userId });

  const program = await getProgram({ programId });

  return { students, profile, program };
};

const getUserWithProfileAndStudents = async (userId: string) => {
  const result = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, userId),
    with: {
      profiles: true,
      students: true,
    },
  });
  return result;
};

const submitApplication = async ({
  userId,
  programId,
  profile,
}: {
  userId: string;
  programId: string;
  profile: any;
}) => {
  const { firstName, lastName, city, zip, state, street, street2, email } =
    profile;

  await db.insert(applications).values({
    firstName,
    lastName,
    programId: Number(programId),
    street,
    street2,
    city,
    state,
    zip,
    email,
    userId,
  });
};

export {
  getOpenPrograms,
  saveProfileAddress,
  addStudent,
  getStudents,
  getApplicationData,
  getUserWithProfileAndStudents,
  getProgram,
};
