import { DiscountModel } from "@/const/models/DiscountModel.ts";

export interface IOrderDetailsPageSlice {
  isOrderConfigurationCardLoading?: boolean;
  isSelectEntityCardLoading?: boolean;
  isSelectDiscountCardLoading?: boolean;
  isSelectEntityGridLoading?: boolean;
  isSelectDiscountGridLoading?: boolean;
  activeCards?: any[];
  discountsList?: DiscountModel[];
}
