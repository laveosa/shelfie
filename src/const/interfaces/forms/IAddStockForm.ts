import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { StockUnitModel } from "@/const/models/StockUnitModel.ts";

export interface IAddStockForm {
  data?: StockUnitModel;
  taxTypes?: TaxTypeModel[];
  currencyTypes?: CurrencyModel[];
  onHandleUpData?: (data: any) => void;
  onSubmit?(value: StockUnitModel): void;
  onCancel?(value: StockUnitModel): void;
}
