import { MarginModel } from "@/const/models/MarginModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";
import { GridModel } from "@/const/models/GridModel.ts";

export interface IMarginsPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isMarginForPurchaseCardLoading?: boolean;
  isSelectMarginCardLoading?: boolean;
  isSalePriceManagementCardLoading?: boolean;
  isMarginConfigurationCardLoading?: boolean;
  isMarginListGridLoading?: boolean;
  isMarginProductsGridLoading?: boolean;
  activeCards?: any[];
  marginsList?: MarginModel[];
  selectedMargin?: MarginModel;
  managedMargin?: MarginModel;
  marginItemsGridModel?: GridModel;
  marginItemsGriRequestModel?: GridRequestModel;
  gridRequestModel?: GridRequestModel;
}
