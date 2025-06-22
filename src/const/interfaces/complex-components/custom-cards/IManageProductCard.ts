import { PurchaseModel } from "@/const/models/PurchaseModel.ts";
import { ProductModel } from "@/const/models/ProductModel.ts";
import { TraitModel } from "@/const/models/TraitModel.ts";
import { VariantModel } from "@/const/models/VariantModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface IManageProductCard {
  isLoading?: boolean;
  purchase?: PurchaseModel;
  product?: ProductModel;
  variants?: VariantModel[];
  variantsGridModel?: GridModel;
  isVariantGridLoading?: boolean;
  productTraits?: TraitModel[];
  onAction?: (identifier: string, payload?: any) => void;
}
