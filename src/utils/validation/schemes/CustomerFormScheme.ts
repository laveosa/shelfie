import { IZodSchema } from "@/const/interfaces/IZodSchema";
import { CustomerRequestModel } from "@/const/models/CustomerRequestModel";
import { z } from "zod";

const nonemptyMessage = "field is required";

const customerFormScheme: z.ZodObject<IZodSchema<CustomerRequestModel>> = z.object({
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
  phoneNumber: z
    .string()
    .nonempty(nonemptyMessage)
    .regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
});

export default customerFormScheme;
