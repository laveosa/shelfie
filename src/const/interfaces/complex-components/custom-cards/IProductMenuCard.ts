import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IProductMenuCard {
  productId?: number;
  productCounter?: ProductCounterModel;
  onAction?: (identifier: string) => void;
}
