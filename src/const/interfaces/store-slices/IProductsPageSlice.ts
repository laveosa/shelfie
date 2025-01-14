import { ProductModel } from "@/const/models/ProductModel.ts";

export interface IProductsPageSlice {
  isLoading?: boolean;
  products?: ProductModel[];
}
