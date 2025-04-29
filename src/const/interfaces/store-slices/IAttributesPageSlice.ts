import { ProductCounterModel } from "@/const/models/ProductCounterModel.ts";

export interface IAttributesPageSlice {
  loading?: boolean;
  activeCards?: any[];
  productCounter?: ProductCounterModel;
}
