import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface IVariantHistoryCard {
  variant?: VariantModel;
  data?: GridModel;
  onSecondaryButtonClick?: () => void;
}
