import { TraitModel } from "@/const/models/TraitModel.ts";

export interface IManageTraitsCard {
  traits?: TraitModel[];
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
