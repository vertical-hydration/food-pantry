import { z } from "zod/v4";

export const AddProgramSchema = z.object({
  name: z.string().min(2),
});

export const ChangeStatusSchema = z.object({
  newStatus: z.enum([
    "submitted",
    "accepted",
    "waitlist",
    "declined",
  ]),
});

export const EditProgramSchema = z.object({
  name: z.string().min(2),
  status: z.enum(["active", "inactive", "archived"]),
  description: z.string(),
  image: z.string(),
  programId: z.number(),
});

export const NewEventSchema = z.object({
  name: z
    .string()
    .min(
      3,
      "Event names must be at least 3 characters long."
    ),
  location: z.string(),
  time: z.string(),
  eventDate: z.date(),
  openDate: z.date(),
  closeDate: z.date(),
  programId: z.number(),
  status: z.enum(["active", "inactive", "archived"]),
});
