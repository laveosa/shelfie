import { TraitModel } from "@/const/models/TraitModel.ts";

export interface IAddVariantCard {
  traits?: TraitModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
