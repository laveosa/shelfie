import { OrderCountersModel } from "@/const/models/CounterModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridSortingModel } from "@/const/models/GridSortingModel.ts";
import { OrderModel } from "@/const/models/OrderModel.ts";
import { BrandModel } from "@/const/models/BrandModel.ts";
import { CategoryModel } from "@/const/models/CategoryModel.ts";
import { TraitOptionModel } from "@/const/models/TraitOptionModel.ts";

export interface IOrdersPageSlice {
  isLoading?: boolean;
  isOrdersCardLoading?: boolean;
  isOrdersGridLoading?: boolean;
  sortingOptions?: GridSortingModel[];
  ordersGridRequestModel?: GridRequestModel;
  activeCards?: any[];
  productCounter?: OrderCountersModel;
  selectedOrder?: OrderModel;
  customersGridRequestModel?: GridRequestModel;
  variantsGridRequestModel?: GridRequestModel;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  colorsForFilter?: TraitOptionModel[];
  sizesForFilter?: TraitOptionModel[];
  stockActionsGridRequestModel?: GridRequestModel;
}
