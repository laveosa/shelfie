import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IPurchasesPageSlice {
  loading?: boolean;
  activeCards?: any[];
  productCounter?: ProductCounterModel;
}
