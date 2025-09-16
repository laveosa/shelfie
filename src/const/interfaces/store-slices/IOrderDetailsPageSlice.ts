import { DiscountModel } from "@/const/models/DiscountModel.ts";
import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface IOrderDetailsPageSlice {
  isOrderConfigurationCardLoading?: boolean;
  isSelectEntityCardLoading?: boolean;
  isSelectDiscountCardLoading?: boolean;
  isSelectEntityGridLoading?: boolean;
  isSelectDiscountGridLoading?: boolean;
  isCustomerCardLoading?: boolean;
  activeCards?: any[];
  discountsList?: DiscountModel[];
  selectedCustomer?: CustomerModel;
}
