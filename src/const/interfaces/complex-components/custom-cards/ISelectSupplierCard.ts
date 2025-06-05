import { SupplierModel } from "@/const/models/SupplierModel.ts";

export interface ISelectSupplierCard {
  isLoading?: boolean;
  suppliers?: SupplierModel[];
  onAction?: (identifier?: string, payload?: any) => void;
}
