import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export interface IAttributesPageSlice {
  loading?: boolean;
  activeCards?: any[];
  productCounter?: ProductCountersModel;
}
