import { ProductModel } from "@/const/models/ProductModel.ts";
import { PreferencesModel } from "@/const/models/PreferencesModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";

export interface IProductsPageSlice {
  loading?: boolean;
  products?: ProductModel[];
  variants?: VariantModel[];
  columnsPreferences?: PreferencesModel;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  sortingOptions?: GridSortingModel[];
  productsGridModel?: GridModel;
  variantsGridModel?: GridModel;
  gridRequestModel?: GridRequestModel;
}
