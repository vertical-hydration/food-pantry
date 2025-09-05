import { parseWithZod } from "@conform-to/zod/v4";
import { db } from "~/services/db/db.server";
import { events, reservations } from "~/services/db/schema";
import { NewEventSchema } from "./schemas";
import { redirect } from "react-router";
import { write } from "fs";
import { eq } from "drizzle-orm";
import {
  mockReservations,
  type Reservation,
} from "~/components/events/mockReservaitons";

const getEvents = async () => {
  const events = await db.query.events.findMany({});

  return { events };
};

const getprogramEvents = async (programId: number) => {
  return await db.query.events.findMany({
    where: eq(events.programId, programId),
  });
};

const createEvent = async ({
  formData,
}: {
  formData: FormData;
}) => {
  const submission = parseWithZod(formData, {
    schema: NewEventSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const value = submission.value;

  const writeData = await db
    .insert(events)
    .values({
      ...value,
    })
    .returning();

  const eventId = writeData[0].id;

  return redirect(`/admin/events/${eventId}`);
};

const getEvent = async (eventId: number) => {
  const event = await db.query.events.findFirst({
    where: eq(events.id, eventId),
  });

  if (!event) {
    throw new Error("No event found");
  }
  return event;
};

const getReservations = async (eventId: number) => {
  const dbRes = await db.query.reservations.findMany({
    where: eq(reservations.eventId, eventId),
    with: {
      user: {
        columns: {
          id: true,
          image: true,
        },
        with: {
          profiles: {
            columns: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  const mockRes: Reservation[] = dbRes.map((r) => ({
    id: r.id.toString(),
    firstName: r.user.profiles?.firstName ?? "Error",
    lastName: r.user.profiles?.lastName ?? "Error",
    userId: r.userId,
    eventId: r.eventId.toString(),
    status: r.status,
    createdAt: r.createdAt,
  }));

  return dbRes;
};

export {
  getEvent,
  getEvents,
  createEvent,
  getReservations,
  getprogramEvents,
};
