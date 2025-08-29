import { z } from "zod";

import { UserModel } from "@/const/models/UserModel.ts";
import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";
import { AppSchemeType } from "@/const/types/AppSchemeType.ts";

const nonemptyMessage = "field is required";

const userFormScheme: AppSchemeType<UserModel> = z.object({
  nikName: z.string().nonempty(nonemptyMessage),
  isAvailable: z.boolean(),
  name: z
    .string()
    .nonempty(nonemptyMessage)
    .min(4, "min value length 4")
    .max(16, "max value length 16"),
  email: z
    .string()
    .nonempty(nonemptyMessage)
    .regex(ContextPatternEnum.EMAIL as RegExp, "invalid email"),
  address: z.string().optional(),
  units: z.array(z.any()).nonempty(nonemptyMessage),
  dateBirth: z.date().or(z.string().nonempty(nonemptyMessage)),
  alertTime: z.date().or(z.string().nonempty(nonemptyMessage)).optional(),
  // comments: z.array(z.string()).nonempty(nonemptyMessage),
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
  position: z.string().optional(),
  tags: z.array(z.any()).nonempty(nonemptyMessage),
  // tags: z.array(z.any()).min(1, "tag cannot be empty").optional(),
});

export default userFormScheme;
