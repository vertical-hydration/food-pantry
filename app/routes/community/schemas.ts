import z from "zod";

export const AddressSchema = z.object({
  firstName: z.string("Required").min(2, " Must be a minimum of 2 characters"),
  lastName: z.string("Required").min(2, "Must be a minimum of 2 characters"),
  street: z.string(""),
  street2: z.string().default(""),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const AddStudentSchema = z.object({
  firstName: z.string("Required").min(2, " Must be a minimum of 2 characters"),
  lastName: z.string("Required").min(2, "Must be a minimum of 2 characters"),
  school: z.string(),
});

export const ValidApplyIntents = z.object({
  intent: z.enum(["addStudent", "saveAddress"]),
});
