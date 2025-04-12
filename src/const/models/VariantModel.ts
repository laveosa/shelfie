import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";

export interface VariantModel {
  brand?: BrandModel;
  image?: any[];
  photos?: any[];
  productCategory?: CategoryModel;
  salePrice?: any;
  soldUnits?: number;
  status?: string;
  stockAmount?: number;
  traitOptions?: TraitModel[];
  variantAppId?: string;
  variantId?: number;
  variantCode?: string;
  variantName?: string;
}
