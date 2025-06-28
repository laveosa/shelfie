import { VariantModel } from "@/const/models/VariantModel.ts";
import { VariantHistoryModel } from "@/const/models/VariantHistoryModel.ts";

export interface IVariantHistoryCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variant: VariantModel;
  data?: VariantHistoryModel[];
  onSecondaryButtonClick?: () => void;
}
