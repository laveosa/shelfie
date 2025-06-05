import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

export interface ISupplierCard {
  isLoading?: boolean;
  selectedPurchase?: PurchaseModel;
  onAction?: (identifier: string, payload?: any) => void;
}
