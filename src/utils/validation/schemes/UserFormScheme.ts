import { z } from "zod";

import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { UserModel } from "@/const/models/UserModel.ts";

const nonemptyMessage = "field is required";

const userFormScheme: z.ZodObject<IZodSchema<UserModel>> = z.object({
  name: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "min value length 2")
    .max(16, "max value length 16"),
  email: z
    .string()
    .nonempty(nonemptyMessage)
    .regex(/^[^@]+@[^@]+\.[^@]+$/, "invalid email"),
  address: z.string().optional(),
  gender: z
    .enum(["male", "female", "unicorn", "banana"])
    .superRefine((arg, ctx) => {
      if (arg !== "male" && arg !== "female") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Seriously, "${arg}", are you sure?`,
        });
      }
    }),
  position: z.number().optional(),
  comment: z.string().optional(),
});

export default userFormScheme;
