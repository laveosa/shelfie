import { MarginItemModel } from "@/const/models/MarginItemModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface IMarginItemsForm {
  className?: string;
  data?: MarginItemModel;
  taxes?: ISheSelectItem<number>[];
  currentPrice?: number;
  onMarginItemChange?: (data: MarginItemModel) => void;
  onApply?: (id: number) => void;
}
