import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { PurchaseModel } from "@/const/models/PurchaseModel.ts";

export interface IAddStockCard {
  isLoading?: boolean;
  variant?: VariantModel;
  data?: GridModel;
  taxTypes?: TaxTypeModel[];
  currencyTypes?: CurrencyModel[];
  purchase?: PurchaseModel;
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
