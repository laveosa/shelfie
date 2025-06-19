import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";

export interface IManageProductCard {
  isLoading?: boolean;
  purchase?: PurchaseModel;
  product?: ProductModel;
  traits?: TraitModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
