import { UseFormReturn } from "react-hook-form";

import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { StockUnitModel } from "@/const/models/StockUnitModel.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";

export interface IAddStockForm {
  data?: StockUnitModel;
  taxTypes?: TaxTypeModel[];
  currencyTypes?: CurrencyModel[];
  onChange?: (
    value: any,
    form?: UseFormReturn<AppFormType<StockUnitModel>>,
  ) => void;
  onSubmit?(value: StockUnitModel): void;
  onCancel?(value: StockUnitModel): void;
}
