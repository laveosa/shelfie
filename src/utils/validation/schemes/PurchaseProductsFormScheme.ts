import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const PurchaseProductsFormScheme: z.ZodObject<IZodSchema<any>> = z.object({
  nettoPrice: z.any(),
  currencyId: z.any().optional(),
  taxTypeId: z.any().optional(),
  unitsAmount: z.any(),
});

export default PurchaseProductsFormScheme;
