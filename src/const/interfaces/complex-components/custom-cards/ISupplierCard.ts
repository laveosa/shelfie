import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ISupplierCard {
  isLoading?: boolean;
  selectedPurchase?: PurchaseModel;
  selectedSupplier?: SupplierModel;
  onAction?: (identifier: string, payload?: any) => void;
}
