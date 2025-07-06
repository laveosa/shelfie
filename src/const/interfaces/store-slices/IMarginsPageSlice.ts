import { MarginModel } from "@/const/models/MarginModel.ts";

export interface IMarginsPageSlice {
  isLoading?: boolean;
  isProductMenuCardLoading?: boolean;
  isMarginForPurchaseCardLoading?: boolean;
  isSelectMarginCardLoading?: boolean;
  isMarginConfigurationCardLoading?: boolean;
  isMarginListGridLoading?: boolean;
  activeCards?: any[];
  marginsList?: MarginModel[];
  selectedMargin?: MarginModel;
  managedMargin?: MarginModel;
}
