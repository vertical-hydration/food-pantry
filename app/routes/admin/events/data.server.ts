import { db } from "~/services/db/db.server";

const getEvents = async () => {
  const events = await db.query.events.findMany({});

  return { events };
};

export { getEvents };
