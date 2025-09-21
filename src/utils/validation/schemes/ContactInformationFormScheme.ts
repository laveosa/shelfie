import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { CustomerRequestModel } from "@/const/models/CustomerRequestModel.ts";

const nonemptyMessage = "field is required";

const contactInformationFormScheme: z.ZodObject<
  IZodSchema<CustomerRequestModel>
> = z.object({
  firstName: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "Min value length 2")
    .max(50, "Max value length 50"),
  lastName: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "Min value length 2")
    .max(50, "Max value length 50"),
  email: z
    .string()
    .nonempty(nonemptyMessage)
    .email("Invalid email format")
    .max(100, "Max value length 100"),
  newEmail: z
    .string()
    .nonempty(nonemptyMessage)
    .email("Invalid email format")
    .max(100, "Max value length 100"),
  newCountryCode: z.number(),
  phoneNumber: z
    .string()
    .nonempty(nonemptyMessage)
    .min(5, "Min phone number length 5")
    .max(12, "Max phone number length 12"),
  newPhoneNumber: z
    .string()
    .nonempty(nonemptyMessage)
    .min(5, "Min phone number length 5")
    .max(12, "Max phone number length 12"),
});

export default contactInformationFormScheme;
