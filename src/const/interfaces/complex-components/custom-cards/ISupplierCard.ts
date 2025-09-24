import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

export interface ISupplierCard {
  isLoading?: boolean;
  selectedPurchase?: PurchaseModel;
  selectedSupplier?: any;
  showCloseButton?: boolean;
  onAction?: (identifier: string, payload?: any) => void;
}
