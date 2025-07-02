import { VariantModel } from "@/const/models/VariantModel.ts";

export interface IVariantHistoryCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variant: VariantModel;
  data?: any[];
  onAction?: (identifier: string, payload?: any) => void;
}
