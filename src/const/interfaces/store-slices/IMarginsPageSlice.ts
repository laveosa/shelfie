import { MarginModel } from "@/const/models/MarginModel.ts";
import { GridRequestModel } from "@/const/models/GridRequestModel.ts";

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
  marginItemsGridRequestModel?: GridRequestModel;
  marginsGridRequestModel?: GridRequestModel;
}
