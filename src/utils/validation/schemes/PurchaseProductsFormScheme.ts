import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const PurchaseProductsFormScheme: z.ZodObject<IZodSchema<any>> = z.object({
  price: z.any().optional(),
  currencies: z.any().optional(),
  taxes: z.any().optional(),
  quantity: z.any().optional(),
});

export default PurchaseProductsFormScheme;
