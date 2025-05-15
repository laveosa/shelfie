import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface IVariantHistoryCard {
  isLoading?: boolean;
  variant?: VariantModel;
  data?: GridModel;
  getVariantHistory?: (data: any) => Promise<any>;
  onSecondaryButtonClick?: () => void;
}
