import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IDisposeStockCard {
  isLoading?: boolean;
  variant?: VariantModel;
  data?: GridRequestModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
