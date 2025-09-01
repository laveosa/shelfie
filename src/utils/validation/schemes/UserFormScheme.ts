import { z } from "zod";

import { UserModel } from "@/const/models/UserModel.ts";
import { AppSchemeType } from "@/const/types/AppSchemeType.ts";
import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";

const nonemptyMessage = "field is required";

const userFormScheme: AppSchemeType<UserModel> = z.object({
  image: z.string().optional(),
  firstName: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "min value length 2")
    .max(20, "max value length 20"),
  lastName: z.string().nonempty(nonemptyMessage),
  nickName: z.string().optional(),
  age: z
    .number()
    .min(18, "You to young, go and have fun kid.")
    .max(
      60,
      "With all due respect, we will be too demanding of you for such a venerable age.",
    ),
  email: z
    .string()
    .nonempty(nonemptyMessage)
    .regex(ContextPatternEnum.EMAIL as RegExp, "invalid email"),
  phone: z.string().nonempty(nonemptyMessage),
  address: z
    .string()
    .min(4, "no idea where it can be")
    .max(40, "it's too far for us to cooperate with you")
    .nonempty(nonemptyMessage),
  status: z.enum([
    "active",
    "pending",
    "vacation",
    "fired",
    "unemployed",
    "employed",
  ]),
  dateBirth: z
    .date({ required_error: nonemptyMessage })
    .or(z.string().nonempty(nonemptyMessage)),
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
  nationality: z.string().nonempty(nonemptyMessage),
  maritalStatus: z.enum(["married", "single", "divorced", "inRelationship"]),
  position: z.string().nonempty(nonemptyMessage),
  comment: z.string().optional(),
  isAvailable: z.boolean().optional(),
  isRemote: z.boolean().optional(),
  communicationPreferences: z.array(z.string()).optional(),
  interests: z.array(z.number()),
  contractPeriod: z
    .object({
      from: z
        .date({ required_error: nonemptyMessage })
        .or(z.string().nonempty(nonemptyMessage)),
      to: z
        .date({ required_error: nonemptyMessage })
        .or(z.string().nonempty(nonemptyMessage)),
    })
    .refine((val) => val.from <= val.to, {
      message: "Start date must be before end date",
      path: ["to"],
    }),
  leaveDays: z.array(
    z
      .date({ required_error: nonemptyMessage })
      .or(z.string().nonempty(nonemptyMessage)),
  ),
});

export default userFormScheme;
