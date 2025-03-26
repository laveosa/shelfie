import { z } from "zod";

import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { UserModel } from "@/const/models/UserModel.ts";

const userFormScheme: z.ZodObject<IZodSchema<UserModel>> = z.object({
  name: z
    .string()
    .nonempty("field is required")
    .min(2, "min value length 2")
    .max(16, "max value length 16"),
  email: z
    .string()
    .nonempty("field is required")
    .regex(/^[^@]+@[^@]+\.[^@]+$/, "invalid email"),
  address: z.string().optional(),
  comment: z.string().optional(),
});

export default userFormScheme;
