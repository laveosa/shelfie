import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";

export interface IProductTraitConfigurationCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  data?: any;
  selectedTrait: TraitModel;
  typesOfTraits?: TypeOfTraitModel[];
  onAction?: (identifier: string, payload: any) => void;
  onSecondaryButtonClick?: () => void;
  onPrimaryButtonClick?: () => void;
}
