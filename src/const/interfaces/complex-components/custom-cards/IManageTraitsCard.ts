import { TraitModel } from "@/const/models/TraitModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";

export interface IManageTraitsCard {
  isLoading?: boolean;
  traits?: TraitModel[];
  variant?: VariantModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
