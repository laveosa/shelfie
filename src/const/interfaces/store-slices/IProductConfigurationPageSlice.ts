import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";

export interface IProductConfigurationPageSlice {
  loading?: boolean;
  product?: ProductModel;
  brandsList?: BrandModel[];
  categoriesList?: CategoryModel[];
  category?: CategoryModel;
  brand?: BrandModel;
  contextId?: number;
  products?: ProductModel[];
  activeCards?: any[];
}
