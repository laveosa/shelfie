import { ProductModel } from "@/const/models/ProductModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { ProductCategoryModel } from "@/const/models/ProductCategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";

export interface IProductsPageSlice {
  loading?: boolean;
  products?: ProductModel[];
  columnsPreferences?: PreferencesModel;
  brands?: BrandModel[];
  categories?: ProductCategoryModel[];
  sortingOptions?: GridSortingModel[];
}
