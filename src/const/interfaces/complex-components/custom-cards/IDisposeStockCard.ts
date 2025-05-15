import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface IDisposeStockCard {
  isLoading?: boolean;
  variant?: VariantModel;
  data?: GridModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
