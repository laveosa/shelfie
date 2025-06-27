import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export interface IPurchasesPageSlice {
  loading?: boolean;
  activeCards?: any[];
  productCounter?: ProductCountersModel;
}
