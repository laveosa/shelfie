import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { PurchaseProductsModel } from "@/const/models/PurchaseProductsModel.ts";

export interface IPurchaseProductsForm {
  className?: string;
  data?: any;
  currencies?: CurrencyModel[];
  taxes?: TaxTypeModel[];
  activeTab?: string;
  isVariantGrid?: boolean;
  onSubmit?: (data: PurchaseProductsModel) => void;
  onDelete?: () => void;
  onCancel?: () => void;
}
