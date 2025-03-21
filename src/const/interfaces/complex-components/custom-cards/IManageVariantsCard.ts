import { TraitModel } from "@/const/models/TraitModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";

export interface IManageVariantsCard {
  data?: any;
  traits?: TraitModel[];
  variants?: VariantModel[];
  onChooseVariantTraits?: () => void;
  onAction?: (identifier?: string, payload?: any) => void;
}
