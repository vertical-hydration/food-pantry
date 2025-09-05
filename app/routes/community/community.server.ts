import { parseWithZod } from "@conform-to/zod/v4";
import {
  AddressSchema,
  AddStudentSchema,
  CreateReservationSchema,
  type AddressProfile,
} from "./schemas";
import { db } from "~/services/db/db.server";
import {
  applications,
  applicationStudents,
  events,
  profiles,
  programs,
  reservations,
  students,
} from "~/services/db/schema";
import { write } from "fs";
import { and, eq } from "drizzle-orm";
import { success } from "zod";
import { redirect } from "react-router";

const getOpenPrograms = async () => {
  return await db.query.programs.findMany({
    where: and(eq(programs.status, "active")),
  });
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

  const {
    firstName,
    lastName,
    street,
    street2,
    zip,
    city,
    state,
  } = submission.value;

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

const getStudents = async ({
  userId,
}: {
  userId: string;
}) => {
  return await db.query.students.findMany({
    where: (students, { eq }) =>
      eq(students.userId, userId),
  });
};

const getProfile = async ({
  userId,
}: {
  userId: string;
}) => {
  return await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId),
  });
};

const getProgram = async ({
  programId,
}: {
  programId: string;
}) => {
  return await db.query.programs.findFirst({
    where: (programs, { eq }) =>
      eq(programs.id, Number(programId)),
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

const getUserWithProfileAndStudents = async (
  userId: string
) => {
  const result = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.id, userId),
    with: {
      profiles: true,
      students: true,
    },
  });
  return result;
};

const checkApplicationExists = async ({
  userId,
  programId,
}: {
  userId: string;
  programId: number;
}) => {
  return await db.query.applications.findFirst({
    where: and(
      eq(applications.programId, programId),
      eq(applications.userId, userId)
    ),
  });
};

const writeApplication = async ({
  userId,
  programId,
  profile,
  email,
}: {
  userId: string;
  programId: string;
  profile: AddressProfile;
  email: string;
}) => {
  const {
    firstName,
    lastName,
    city,
    zip,
    state,
    street,
    street2,
  } = profile;

  return await db
    .insert(applications)
    .values({
      firstName,
      lastName,
      programId: Number(programId),
      street,
      street2,
      city,
      state,
      zip,
      userId,
      email,
    })
    .returning({
      applicationId: applications.id,
    });
};

const checkUserData = async ({
  userId,
  programId,
}: {
  userId: string;
  programId: number;
}) => {
  const data = await getUserWithProfileAndStudents(userId);
  const applicationCheck = await checkApplicationExists({
    userId,
    programId,
  });

  if (applicationCheck) {
    const applicationError = {
      message: " Application Already Exists",
    };

    return { applicationError };
  }

  const profile = data?.profiles;
  const students = data?.students;

  const addressCheck = AddressSchema.safeParse(profile);
  const studentsCheck = students
    ? students.length > 0
    : false;

  if (!addressCheck.success) {
    const applicationError = {
      message: "Please edit the applicant data",
    };
    return { applicationError };
  }

  if (!studentsCheck) {
    const applicationError = {
      message: "Please add a student to your profile.",
    };
    return { applicationError };
  }

  return { profile, students, email: data?.email };
};

const submitApplication = async ({
  userId,
  programId,
  email,
}: {
  userId: string;
  programId: string;
  email: string;
}) => {
  const result = await checkUserData({
    userId,
    programId: Number(programId),
  });
  const applicationError = result?.applicationError;

  if (applicationError) {
    return { applicationError, success: false };
  }

  const { profile, students } = result;
  if (!profile || !students) {
    throw new Error("Shouldn't happen");
  }

  const newProfileData = {
    ...profile,
    street2: profile?.street2 ?? "",
  };

  const writeApp = await writeApplication({
    userId,
    programId,
    profile: newProfileData,
    email,
  });

  const studentArray = students.map((student) => ({
    applicationId: writeApp[0].applicationId,
    studentId: student.id,
  }));

  await db.insert(applicationStudents).values(studentArray);

  return { success: true };
};

const getEventsOpenToUser = async ({
  userId,
}: {
  userId: string;
}) => {
  // const data = await db.query.programs.findMany({
  //   with: {
  //     applications: {
  //       where: (applications, { eq }) =>
  //         and(
  //           eq(applications.userId, userId),
  //           eq(applications.status, "accepted")
  //         ),
  //     },
  //   },
  // });

  const applicationData =
    await db.query.applications.findMany({
      where: (applications, { eq }) =>
        and(
          eq(applications.userId, userId),
          eq(applications.status, "accepted")
        ),
      with: {
        program: {
          with: {
            events: {
              where: (events, { eq }) =>
                eq(events.status, "active"),
            },
          },
        },
      },
    });

  const reservationsData =
    await db.query.reservations.findMany({
      where: eq(reservations.userId, userId),
    });

  return { applicationData, reservationsData };
};

const getUserApplications = async ({
  userId,
}: {
  userId: string;
}) => {
  return await db.query.applications.findMany({
    where: eq(applications.userId, userId),
  });
};

const getOpenProgramsForUser = async ({
  userId,
}: {
  userId: string;
}) => {
  return await db.query.programs.findMany({
    where: eq(programs.status, "active"),
    with: {
      applications: {
        where: eq(applications.userId, userId),
      },
    },
  });
};

const createReservation = async ({
  formData,
}: {
  formData: FormData;
}) => {
  const submission = parseWithZod(formData, {
    schema: CreateReservationSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { userId, eventId, pickupTime } = submission.value;

  const eventData = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!eventData) {
    throw new Error("Event not found");
  }

  const applicationData =
    await db.query.applications.findFirst({
      where: and(
        eq(applications.programId, eventData.id),
        eq(applications.userId, userId)
      ),
    });

  if (!applicationData) {
    throw new Error("Applicant Data not found");
  }

  await db.insert(reservations).values({
    userId,
    eventId,
    applicationId: applicationData.id,
    option: {
      pickupTime,
    },
  });

  return { formData };
};

export {
  getOpenPrograms,
  saveProfileAddress,
  addStudent,
  getStudents,
  getApplicationData,
  getUserWithProfileAndStudents,
  getProgram,
  submitApplication,
  getEventsOpenToUser,
  getOpenProgramsForUser,
  checkApplicationExists,
  createReservation,
};
