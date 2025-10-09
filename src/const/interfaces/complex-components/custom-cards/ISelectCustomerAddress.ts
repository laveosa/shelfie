import { CustomerModel } from "@/const/models/CustomerModel.ts";
import { AddressModel } from "@/const/models/AddressModel.ts";

export interface ISelectCustomerAddress {
  isLoading?: boolean;
  isGridLoading?: boolean;
  customer?: CustomerModel;
  addressesList?: AddressModel[];
  onAction?: (identifier?: string, payload?: any) => void;
}
