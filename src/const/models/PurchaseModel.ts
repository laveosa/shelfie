import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface PurchaseModel {
  currencyBrief: string;
  date: string;
  itemsAccount: number;
  purchaseId: number;
  subTotal: number;
  supplier: SupplierModel;
}
