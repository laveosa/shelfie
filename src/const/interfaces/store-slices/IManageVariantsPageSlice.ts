import { VariantModel } from "@/const/models/VariantModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IManageVariantsPageSlice {
  loading?: boolean;
  variants: VariantModel[];
  traits?: any[];
  activeCards?: any[];
  contextId?: number;
  productCounter?: ProductCounterModel;
}
