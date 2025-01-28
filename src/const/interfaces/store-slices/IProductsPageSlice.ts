import { ProductModel } from "@/const/models/ProductModel.ts";

export interface IProductsPageSlice {
  loading?: boolean;
  products?: ProductModel[];
  columnsPreferences?: any;
}
