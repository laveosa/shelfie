import { TraitModel } from "@/const/models/TraitModel.ts";
import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export interface IManageVariantsCard {
  isLoading?: boolean;
  isVariantsLoading?: boolean;
  data?: any;
  traits?: TraitModel[];
  variants?: any[];
  productCounter?: ProductCountersModel;
  onAction?: (identifier?: string, payload?: any) => void;
}
