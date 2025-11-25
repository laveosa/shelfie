import { CustomerModel } from "@/const/models/CustomerModel.ts";

export interface ISendMessageCard {
  isLoading?: boolean;
  selectedCustomer?: CustomerModel;
  customersList?: CustomerModel[];
  onAction?: (actionType: string, payload?: any) => void;
}
