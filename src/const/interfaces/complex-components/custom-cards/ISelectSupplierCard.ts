import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ISelectSupplierCard {
  suppliers?: SupplierModel[];
  onAction?: (identifier?: string, payload?: any) => void;
}
