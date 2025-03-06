import { ProductModel } from "@/const/models/ProductModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

export interface IProductGalleryPageSlice {
  loading?: boolean;
  product?: ProductModel;
  brandsList?: BrandModel[];
  categoriesList?: CategoryModel[];
  category?: CategoryModel;
  brand?: BrandModel;
  contextId?: number;
  products?: ProductModel[];
  activeCards?: any[];
  productCounter?: ProductCounterModel;
  photos?: ImageModel[];
}
