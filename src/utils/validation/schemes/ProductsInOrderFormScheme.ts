import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

const ProductsInOrderFormScheme: z.ZodObject<IZodSchema<any>> = z.object({
  priceBrutto: z.any(),
  quantity: z.any(),
});

export default ProductsInOrderFormScheme;
