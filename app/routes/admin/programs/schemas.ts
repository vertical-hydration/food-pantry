import { z } from "zod/v4";

export const AddProgramSchema = z.object({
  name: z.string().min(2),
});
