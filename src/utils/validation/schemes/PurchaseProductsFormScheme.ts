import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const PurchaseProductsFormScheme: z.ZodObject<IZodSchema<any>> = z.object({
  nettoPrice: z.any().optional(),
  currencyId: z.any().optional(),
  taxTypeId: z.any().optional(),
  unitsAmount: z.any().optional(),
});

export default PurchaseProductsFormScheme;
