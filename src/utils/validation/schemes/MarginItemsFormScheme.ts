import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const nonemptyMessage = "field is required";

const MarginItemsFormScheme: z.ZodObject<IZodSchema<any>> = z.object({
  marginPrice: z.any().optional(),
  taxTypeId: z.any().optional(),
});

export default MarginItemsFormScheme;
