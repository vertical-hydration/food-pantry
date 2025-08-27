import { parseWithZod } from "@conform-to/zod/v4";
import { db } from "~/services/db/db.server";
import { events } from "~/services/db/schema";
import { NewEventSchema } from "./schemas";
import { redirect } from "react-router";
import { write } from "fs";
import { eq } from "drizzle-orm";

const getEvents = async () => {
  const events = await db.query.events.findMany({});

  return { events };
};

const createEvent = async ({ formData }: { formData: FormData }) => {
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

export { getEvent, getEvents, createEvent };
