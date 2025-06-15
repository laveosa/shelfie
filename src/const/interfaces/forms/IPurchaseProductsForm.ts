import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export interface IPurchaseProductsForm<T> {
  data?: any;
  currencies?: CurrencyModel[];
  taxes?: TaxTypeModel[];
  activeTab?: string;
  onSubmit?: (data: T) => void;
  onCancel?: () => void;
}
