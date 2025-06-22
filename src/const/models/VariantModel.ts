import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { PriceModel } from "@/const/models/PriceModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface VariantModel {
  id: number;
  brand?: BrandModel;
  image?: any[];
  photos?: any[];
  productCategory?: CategoryModel;
  salePrice?: PriceModel;
  soldUnits?: number;
  status?: string;
  stockAmount?: number;
  traitOptions?: TraitOptionModel[];
  variantAppId?: string;
  variantId?: number;
  variantCode?: string;
  variantName?: string;
}
