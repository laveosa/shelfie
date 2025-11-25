import { VariantModel } from "@/const/models/VariantModel.ts";

export interface IReplaceVariant {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variant?: VariantModel;
  variantsList?: VariantModel[];
  onAction?: (actionType: string, payload?: any) => void;
}
