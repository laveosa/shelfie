import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

export interface IProductBasicDataPageSlice {
  isLoading?: boolean;
  isProductConfigurationCardLoading?: boolean;
  isCreateProductCategoryCardLoading?: boolean;
  isCreateProductBrandCardLoading?: boolean;
  isProductsLoading?: boolean;
  product?: ProductModel;
  brandsList?: BrandModel[];
  categoriesList?: CategoryModel[];
  category?: CategoryModel;
  brand?: BrandModel;
  contextId?: number;
  products?: ProductModel[];
  activeCards?: any[];
  productCounter?: ProductCountersModel;
  photos?: ImageModel[];
}
