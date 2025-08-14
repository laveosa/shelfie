import { DiscountModel } from "@/const/models/DiscountModel.ts";

export interface ISelectDiscountCard {
  isLoading?: boolean;
  isGridLoading?: boolean;
  discounts?: DiscountModel[];
  onAction?: (identifier?: string, payload?: any) => void;
}
