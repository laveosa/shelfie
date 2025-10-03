import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { StockUnitModel } from "@/const/models/StockUnitModel.ts";

const addStockFormScheme: z.ZodObject<IZodSchema<StockUnitModel>> = z.object({
  unitAmount: z.number().min(0, "Min value length 0"),
  priceModel: z.object({
    price: z.number(),
    taxTypeId: z.number(),
    priceType: z.number().optional(),
    currencyId: z.number(),
  }),
});

export default addStockFormScheme;
