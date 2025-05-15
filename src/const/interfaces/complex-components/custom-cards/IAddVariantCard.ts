import { TraitModel } from "@/const/models/TraitModel.ts";

export interface IAddVariantCard {
  isLoading?: boolean;
  traits?: TraitModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
