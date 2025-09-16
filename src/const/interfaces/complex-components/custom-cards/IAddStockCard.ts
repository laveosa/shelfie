import { VariantModel } from "@/const/models/VariantModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

export interface IAddStockCard {
  isLoading?: boolean;
  variant?: VariantModel;
  data?: GridRequestModel;
  taxTypes?: TaxTypeModel[];
  currencyTypes?: CurrencyModel[];
  purchase?: PurchaseModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
