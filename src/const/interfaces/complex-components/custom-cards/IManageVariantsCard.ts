import { TraitModel } from "@/const/models/TraitModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IManageVariantsCard {
  isLoading?: boolean;
  data?: any;
  traits?: TraitModel[];
  variants?: VariantModel[];
  productCounter?: ProductCounterModel;
  onAction?: (identifier?: string, payload?: any) => void;
}
