import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { CurrencyModel } from "@/const/models/CurrencyModel.ts";
import { TaxTypeModel } from "@/const/models/TaxTypeModel.ts";

export interface IManageProductCard {
  isLoading?: boolean;
  purchase?: PurchaseModel;
  product?: ProductModel;
  variants?: any[];
  currencies?: CurrencyModel[];
  taxes?: TaxTypeModel[];
  isVariantGridLoading?: boolean;
  productTraits?: TraitModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
