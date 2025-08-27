import z from "zod/v4";

export const NewEventSchema = z.object({
  name: z.string().min(3, "Event names must be at least 3 characters long."),
  eventDate: z.date(),
  openDate: z.date(),
  closeDate: z.date(),
  programId: z.number(),
  status: z.enum(["active", "inactive", "archived"]),
});
