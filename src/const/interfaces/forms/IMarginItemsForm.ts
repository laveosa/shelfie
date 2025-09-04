import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { MarginItemModel } from "@/const/models/MarginItemModel.ts";

export interface IMarginItemsForm {
  data?: MarginItemModel;
  taxes?: TaxTypeModel[];
  currentPrice?: number;
  onMarginItemChange?: (data: MarginItemModel) => void;
  onApply?: (id: number) => void;
}
