import { z } from "zod";
import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

const nonemptyMessage = "field is required";

const productConfigurationFormScheme: z.ZodObject<IZodSchema<ProductModel>> =
  z.object({
    productName: z
      .string()
      .nonempty(nonemptyMessage)
      .min(2, "Min value length 2")
      .max(50, "Max value length 50"),
    productCode: z.string().optional(),
    barcode: z.string().optional(),
    brandId: z.number().optional(),
    productCategoryId: z.number().optional(),
    countryId: z.number().optional(),
    isActive: z.boolean().optional(),
  });

export default productConfigurationFormScheme;
