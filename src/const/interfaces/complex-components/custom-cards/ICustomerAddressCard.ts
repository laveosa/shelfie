import { AddressRequestModel } from "@/const/models/AddressRequestModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";

export interface ICustomerAddressCard {
  isLoading?: boolean;
  customerAddress?: AddressRequestModel;
  customerAddressId?: number;
  isCreate?: boolean;
  showCloseButton?: boolean;
  countryList?: CountryCodeModel[];
  onAction: (action: string, data?: any) => void;
}
