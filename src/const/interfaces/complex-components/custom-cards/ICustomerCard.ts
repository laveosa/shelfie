import { CustomerModel } from "@/const/models/CustomerModel";

export interface ICustomerCard {
  isLoading?: boolean;
  customer?: CustomerModel;
  editCustomer?: boolean;
  onPrimaryButtonClick?: (data: any) => void;
  onSecondaryButtonClick?: () => void;
  onAction?: (actionType: string, data?: any) => void;
}
