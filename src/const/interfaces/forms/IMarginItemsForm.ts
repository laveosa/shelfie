import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export interface IMarginItemsForm<T> {
  data?: any;
  taxes?: TaxTypeModel[];
  currentPrice?: number;
  onSubmit?: (data: T) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}
