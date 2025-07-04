import { MarginModel } from "@/const/models/MarginModel.ts";

export interface IMarginForPurchaseCard {
  isLoading?: boolean;
  margin?: MarginModel;
  onAction?: (identifier: string, payload?: any) => void;
}
