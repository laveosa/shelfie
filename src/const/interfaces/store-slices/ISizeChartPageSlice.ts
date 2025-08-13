import { ProductCountersModel } from "@/const/models/CounterModel.ts";

export interface ISizeChartPageSlice {
  loading?: boolean;
  activeCards?: any[];
  productCounter?: ProductCountersModel;
}
