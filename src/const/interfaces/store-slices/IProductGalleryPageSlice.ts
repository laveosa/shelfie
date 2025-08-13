import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IProductGalleryPageSlice {
  isLoading?: boolean;
  isImageUploaderLoading?: boolean;
  isProductPhotosCardLoading?: boolean;
  isConnectImageCardLoading?: boolean;
  isProductPhotosLoading?: boolean;
  isVariantsGridLoading?: boolean;
  product?: ProductModel;
  contextId?: number;
  products?: ProductModel[];
  activeCards?: any[];
  productCounter?: ProductCountersModel;
  photos?: ImageModel[];
  productVariants?: VariantModel[];
  selectedPhoto?: ImageModel;
  gridRequestModel?: GridRequestModel;
}
