import z from "zod";

export const AddressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  street: z.string(),
  street2: z.string().default(""),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
});

export const AddStudentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  school: z.string(),
});
