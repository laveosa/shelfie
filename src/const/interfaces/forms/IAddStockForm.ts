import { UseFormReturn } from "react-hook-form";

import { StockUnitModel } from "@/const/models/StockUnitModel.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface IAddStockForm {
  data?: StockUnitModel;
  taxTypes?: ISheSelectItem<number>[];
  currencyTypes?: ISheSelectItem<number>[];
  onChange?: (
    value: any,
    form?: UseFormReturn<AppFormType<StockUnitModel>>,
  ) => void;
}
