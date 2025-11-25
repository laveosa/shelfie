import { VariantModel } from "@/const/models/VariantModel.ts";
import { CartModel } from "@/const/models/CartModel.ts";

export interface ICartsWithThisProductCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  variant?: VariantModel;
  cartsList?: CartModel[];
  onAction?: (actionType: string, payload?: any) => void;
}
