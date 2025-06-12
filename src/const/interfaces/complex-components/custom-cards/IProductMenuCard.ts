import { CounterModel } from "@/const/models/CounterModel.ts";

export interface IProductMenuCard {
  isLoading?: boolean;
  title?: string;
  productId?: number;
  itemsCollection?: "products" | "purchases";
  counter?: CounterModel;
  activeCards?: any;
  onAction?: (identifier: string) => void;
}
