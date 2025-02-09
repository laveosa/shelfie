import { z } from "zod";

import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { UserModel } from "@/const/models/UserModel.ts";

const userFormScheme: z.ZodObject<IZodSchema<UserModel>> = z.object({
  name: z
    .string()
    .nonempty("field is required")
    .min(4, "min value length 4")
    .max(10, "max value length 10"),
  email: z
    .string()
    .nonempty("field is required")
    .min(4, "min value length 4")
    .max(20, "max value length 10"),
  gender: z
    .enum(["male", "female", "unicorn", "banana"])
    .superRefine((value, ctx) => {
      if (value !== "male" && value !== "female") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Seriously, '${value}' man, are you okay?`,
        });
      }
    }),
});

export default userFormScheme;
