import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IProductMenuCard {
  title?: string;
  productId?: number;
  productCounter?: ProductCounterModel;
  onAction?: (identifier: string) => void;
}
