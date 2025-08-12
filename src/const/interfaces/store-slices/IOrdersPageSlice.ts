import { ProductCountersModel } from "@/const/models/CounterModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";
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
  ordersGridModel?: GridModel;
  ordersGridRequestModel?: GridRequestModel;
  activeCards?: any[];
  productCounter?: ProductCountersModel;
  selectedOrder?: OrderModel;
  customersGridModel?: GridModel;
  customersGridRequestModel?: GridRequestModel;
  variantsGridModel?: GridModel;
  variantsGridRequestModel?: GridRequestModel;
  brands?: BrandModel[];
  categories?: CategoryModel[];
  colorsForFilter?: TraitOptionModel[];
  sizesForFilter?: TraitOptionModel[];
  stockActionsGridModel?: GridModel;
  stockActionsGridRequestModel?: GridRequestModel;
}
