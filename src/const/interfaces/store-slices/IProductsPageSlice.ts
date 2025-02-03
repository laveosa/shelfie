import { ProductModel } from "@/const/models/ProductModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";

export interface IProductsPageSlice {
  loading?: boolean;
  products?: ProductModel[];
  columnsPreferences?: PreferencesModel;
}
