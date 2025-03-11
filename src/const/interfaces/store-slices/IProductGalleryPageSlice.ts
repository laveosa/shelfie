import { ProductModel } from "@/const/models/ProductModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";

export interface IProductGalleryPageSlice {
  loading?: boolean;
  product?: ProductModel;
  contextId?: number;
  products?: ProductModel[];
  activeCards?: any[];
  productCounter?: ProductCounterModel;
  photos?: ImageModel[];
}
