import { TypeOfTraitModel } from "@/const/models/TypeOfTraitModel.ts";

export interface ICreateProductTraitCard {
  data?: any;
  typesOfTraits?: TypeOfTraitModel[];
  onAction?: (identifier: string, payload: any) => void;
  onSecondaryButtonClick?: () => void;
  onPrimaryButtonClick?: () => void;
}
