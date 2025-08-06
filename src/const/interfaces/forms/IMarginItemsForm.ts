import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { MarginItemModel } from "@/const/models/MarginItemModel.ts";

export interface IMarginItemsForm<T> {
  data?: MarginItemModel;
  taxes?: TaxTypeModel[];
  currentPrice?: number;
  onMarginItemChange?: (data: T) => void;
  onApply?: (id: number) => void;
}
