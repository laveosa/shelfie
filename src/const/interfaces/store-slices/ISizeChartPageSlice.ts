import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface ISizeChartPageSlice {
  loading?: boolean;
  activeCards?: any[];
  productCounter?: ProductCounterModel;
}
