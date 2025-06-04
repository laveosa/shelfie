import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const nonemptyMessage = "field is required";

const CreateSupplierFormScheme: z.ZodObject<IZodSchema<any>> = z.object({
  name: z
    .string()
    .nonempty(nonemptyMessage)
    .min(2, "min value length 2")
    .max(16, "max value length 16"),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z
    .string()
    .min(2, "min value length 2")
    .max(16, "max value length 16")
    .optional(),
  state: z
    .string()
    .min(2, "min value length 2")
    .max(16, "max value length 16")
    .optional(),
  zip: z.number().optional(),
  country: z.string().optional(),
});

export default CreateSupplierFormScheme;
