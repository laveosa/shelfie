import { SupplierModel } from "@/const/models/SupplierModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

export interface PurchaseModel {
  currencyBrief?: string;
  date?: string;
  itemsAccount?: number;
  purchaseId?: number;
  subTotal?: number;
  supplier?: SupplierModel;
  documentNotes?: string;
  location?: LocationModel;
  expense?: number;
  isDeleted?: boolean;
  orderValueAmount?: number;
  soldAmount?: number;
  unitsAmount?: number;
  valueAmount?: number;
}
