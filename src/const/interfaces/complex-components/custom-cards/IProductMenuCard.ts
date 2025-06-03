import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IProductMenuCard {
  isLoading?: boolean;
  title?: string;
  productId?: number;
  itemsCollection?: "products" | "purchases";
  productCounter?: ProductCounterModel;
  activeCards?: any;
  onAction?: (identifier: string) => void;
}
