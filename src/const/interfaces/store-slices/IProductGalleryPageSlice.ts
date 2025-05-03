import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IProductGalleryPageSlice {
  isLoading?: boolean;
  product?: ProductModel;
  contextId?: number;
  products?: ProductModel[];
  activeCards?: any[];
  productCounter?: ProductCounterModel;
  photos?: ImageModel[];
  productVariants?: VariantModel[];
  selectedPhoto?: ImageModel;
  gridRequestModel?: GridRequestModel;
}
