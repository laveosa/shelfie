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
  isSelected?: boolean;
}

export const PurchaseDefaultModel: PurchaseModel = {
  currencyBrief: undefined,
  date: undefined,
  itemsAccount: undefined,
  purchaseId: undefined,
  subTotal: undefined,
  supplier: undefined,
  documentNotes: undefined,
  location: undefined,
  expense: undefined,
  isDeleted: undefined,
  orderValueAmount: undefined,
  soldAmount: undefined,
  unitsAmount: undefined,
  valueAmount: undefined,
  isSelected: undefined,
};
