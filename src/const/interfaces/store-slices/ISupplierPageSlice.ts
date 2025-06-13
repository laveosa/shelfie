import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ISupplierPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isSupplierCardLoading?: boolean;
  isSelectSupplierCardLoading?: boolean;
  isSupplierConfigurationCardLoading?: boolean;
  activeCards?: any[];
  purchase?: PurchaseModel;
  suppliers?: SupplierModel[];
  suppliersWithLocations?: SupplierModel[];
  selectedSupplier?: SupplierModel;
  managedSupplier?: SupplierModel;
}
