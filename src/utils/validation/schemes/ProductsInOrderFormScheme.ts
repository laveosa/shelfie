import { z } from "zod";

import { AppSchemeType } from "@/const/types/AppSchemeType.ts";
import { ProductsInOrderFormDataModel } from "@/const/models/ProductsInOrderFormDataModel.ts";

const ProductsInOrderFormScheme: AppSchemeType<ProductsInOrderFormDataModel> =
  z.object({
    priceBrutto: z.any(),
    quantity: z.any(),
  });

export default ProductsInOrderFormScheme;
