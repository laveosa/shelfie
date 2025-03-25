import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { ImageModel } from "@/const/models/ImageModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";

export interface VariantModel {
  brand?: BrandModel;
  image?: ImageModel;
  productCategory?: CategoryModel;
  salePrice?: any;
  status?: string;
  stockAmount?: number;
  traitOptions?: TraitModel[];
  variantAppId?: string;
  variantId?: number;
  variantCode?: string;
  variantName?: string;
}
