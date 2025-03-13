import { VariantModel } from "@/const/models/VariantModel.ts";
import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";
import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { ColorOptionModel } from "@/const/models/ColorOptionModel.ts";

export interface IManageVariantsPageSlice {
  loading?: boolean;
  variants: VariantModel[];
  traits?: any[];
  typesOfTraits?: TypeOfTraitModel[];
  activeCards?: any[];
  contextId?: number;
  productCounter?: ProductCounterModel;
  colorOption?: ColorOptionModel[];
}
