import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface TraitModel {
  traitName?: string;
  traitTypeId?: number;
  traitTypeName?: string;
  traitId?: number;
  traitOptions?: TraitOptionModel[];
}
