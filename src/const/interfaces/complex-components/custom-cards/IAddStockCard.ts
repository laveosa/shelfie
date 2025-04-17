import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";

export interface IAddStockCard {
  variant?: VariantModel;
  data?: GridModel;
  taxType?: TaxTypeModel[];
  currencyType?: CurrencyModel[];
  onAction?: (identifier: string, payload?: any) => void;
  onSecondaryButtonClick?: () => void;
}
