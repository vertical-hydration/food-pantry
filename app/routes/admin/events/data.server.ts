import { parseWithZod } from "@conform-to/zod/v4";
import { db } from "~/services/db/db.server";
import { events } from "~/services/db/schema";
import { NewEventSchema } from "./schemas";

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

  await db.insert(events).values({
    ...value,
  });
};

export { getEvents, createEvent };
