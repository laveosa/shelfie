import { TraitModel } from "@/const/models/TraitModel.ts";

export interface IChooseVariantTraitsCard {
  isLoading?: boolean;
  items?: TraitModel[];
  selectedItems?: TraitModel[];
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
