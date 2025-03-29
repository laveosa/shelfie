import { GridModel } from "@/const/models/GridModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";

export interface IConnectImageCard {
  variants?: VariantModel[];
  data?: GridModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
