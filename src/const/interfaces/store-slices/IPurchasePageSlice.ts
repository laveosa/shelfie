import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IPurchasePageSlice {
  loading?: boolean;
  activeCards?: any[];
  productCounter?: ProductCounterModel;
}
