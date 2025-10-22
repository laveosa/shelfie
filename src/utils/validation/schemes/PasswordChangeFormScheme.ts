import { z } from "zod";

import { PasswordModel } from "@/const/models/PasswordModel.ts";
import { AppSchemeType } from "@/const/types/AppSchemeType.ts";

const nonemptyMessage = "field is required";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{9,}$/;

const PasswordChangeFormScheme: AppSchemeType<PasswordModel> = z
  .object({
    password: z
      .string()
      .nonempty(nonemptyMessage)
      .regex(
        passwordRegex,
        "Password must contain at least one lowercase, one uppercase, one digit, one special character and be at least 9 characters long",
      )
      .max(50, "Max value length 50"),
    newPassword: z
      .string()
      .nonempty(nonemptyMessage)
      .regex(
        passwordRegex,
        "Password must contain at least one lowercase, one uppercase, one digit, one special character and be at least 9 characters long",
      )
      .max(50, "Max value length 50"),
    confirmPassword: z
      .string()
      .nonempty(nonemptyMessage)
      .max(50, "Max value length 50"),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default PasswordChangeFormScheme;
