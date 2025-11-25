import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface ICustomerInfoLayout {
  isLoading?: boolean;
  className?: string;
  customer?: CustomerModel;
  showMessengerIcon?: boolean;
  onAction?: (actionType: string, payload?: any) => void;
}
