import { TraitModel } from "@/const/models/TraitModel.ts";

export interface IAddVariantCard {
  isLoading?: boolean;
  traits?: TraitModel[];
  isDuplicateVariant: boolean;
  onAction?: (identifier: string, payload?: any) => void;
}
