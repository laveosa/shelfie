import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ISupplierPageSlice {
  isLoading?: boolean;
  isSupplierCardLoading?: boolean;
  isSelectSupplierCard?: boolean;
  isCreateSupplierCard?: boolean;
  activeCards?: any[];
  purchase?: PurchaseModel;
  suppliers?: SupplierModel[];
  selectedSupplier?: SupplierModel;
}
