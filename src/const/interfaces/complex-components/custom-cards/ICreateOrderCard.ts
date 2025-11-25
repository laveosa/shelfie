import { CartModel } from "@/const/models/CartModel.ts";

export interface ICreateOrderCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  cartContent?: CartModel;
  onAction?: (actionType: string, payload?: any) => void;
}
