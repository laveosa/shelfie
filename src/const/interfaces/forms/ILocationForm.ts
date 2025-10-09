import { AddressRequestModel } from "@/const/models/AddressRequestModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";

export interface ILocationForm {
  isLoading?: boolean;
  data?: LocationModel;
  countryCodes?: CountryCodeModel[];
  onSubmit?: (data: AddressRequestModel) => void;
  onCancel?: () => void;
  onHandleUpData?: (data: any) => void;
  onAction?: (identifier: string, payload?: any) => void;
}
