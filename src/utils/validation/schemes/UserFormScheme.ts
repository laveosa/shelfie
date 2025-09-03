import { z } from "zod";

import { UserModel } from "@/const/models/UserModel.ts";
import { AppSchemeType } from "@/const/types/AppSchemeType.ts";
import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";

const nonemptyMessage = "field is required";
const textToLong = "your text to long, max 100 symbols";

const userFormScheme: AppSchemeType<UserModel> = z.object({
  image: z.string().optional(),
  firstName: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "min value length 2")
    .max(20, "max value length 20"),
  lastName: z.string().max(100, textToLong).nonempty(nonemptyMessage),
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
    .max(100, textToLong)
    .regex(ContextPatternEnum.EMAIL as RegExp, "invalid email")
    .nonempty(nonemptyMessage),
  phone: z.string().nonempty(nonemptyMessage),
  address: z
    .string()
    .max(100, textToLong)
    .min(4, "no idea where it can be")
    .max(40, "it's too far for us to cooperate with you")
    .nonempty(nonemptyMessage),
  workStatus: z.enum(
    ["active", "pending", "vacation", "fired", "unemployed", "employed"],
    { required_error: nonemptyMessage },
  ),
  dateBirth: z
    .date({ required_error: nonemptyMessage })
    .or(z.string().nonempty(nonemptyMessage)),
  gender: z
    .enum(["male", "female", "unicorn", "banana"], {
      required_error: nonemptyMessage,
      description: "be reasonable by selecting your gender",
    })
    .superRefine((arg, ctx) => {
      if (arg !== "male" && arg !== "female") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Seriously, "${arg}", are you sure?`,
        });
      }
    }),
  nationality: z.string().nonempty(nonemptyMessage),
  maritalStatus: z.enum(["married", "single", "divorced", "inRelationship"], {
    required_error: nonemptyMessage,
  }),
  position: z.string().nonempty(nonemptyMessage),
  comment: z.string().max(600, "your text to long, amx 600 symbols").optional(),
  isAvailable: z.boolean().optional(),
  isRemote: z.boolean().optional(),
  communicationPreferences: z.array(z.string()).nonempty(nonemptyMessage),
  interests: z.array(z.number()).optional(),
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
    })
    .optional(),
  leaveDays: z
    .array(
      z
        .date({ required_error: nonemptyMessage })
        .or(z.string().nonempty(nonemptyMessage)),
    )
    .optional(),
});

export default userFormScheme;
