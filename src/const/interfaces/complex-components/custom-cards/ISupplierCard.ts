import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

export interface ISupplierCard {
  selectedPurchase?: PurchaseModel;
  onAction?: (identifier: string, payload?: any) => void;
}
