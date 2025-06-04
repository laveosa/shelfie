import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ISupplierCard {
  selectedSupplier?: SupplierModel;
  onAction?: (identifier: string, payload?: any) => void;
}
