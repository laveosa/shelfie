import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ISupplierPageSlice {
  activeCards?: any[];
  purchase?: PurchaseModel;
  suppliers?: SupplierModel[];
  selectedSupplier?: SupplierModel;
}
