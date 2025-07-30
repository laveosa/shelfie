import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export interface IPurchaseProductsForm<T> {
  className?: string;
  data?: any;
  currencies?: CurrencyModel[];
  taxes?: TaxTypeModel[];
  activeTab?: string;
  isVariantGrid?: boolean;
  onSubmit?: (data: T) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}
