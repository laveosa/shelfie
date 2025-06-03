import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

export interface ISupplierPage {
  activeCards?: any[];
  purchase: PurchaseModel;
}
