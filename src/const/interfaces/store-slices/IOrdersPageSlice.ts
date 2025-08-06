import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { OrderModel } from "@/const/models/OrderModel.ts";

export interface IOrdersPageSlice {
  isLoading?: boolean;
  isOrdersCardLoading?: boolean;
  isOrdersGridLoading?: boolean;
  sortingOptions?: GridSortingModel[];
  ordersGridModel?: GridModel;
  ordersGridRequestModel?: GridRequestModel;
  activeCards?: any[];
  productCounter?: ProductCountersModel;
  selectedOrder?: OrderModel;
  customersGridModel?: GridModel;
  customersGridRequestModel?: GridRequestModel;
}
