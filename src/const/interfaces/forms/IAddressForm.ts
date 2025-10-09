import { UseFormReturn } from "react-hook-form";

import { AddressRequestModel } from "@/const/models/AddressRequestModel.ts";
import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";

export interface IAddressForm {
  className?: string;
  data?: AddressRequestModel;
  isCreate?: boolean;
  countryList?: CountryCodeModel[];
  showFooter?: boolean;
  onChange?: (
    value: AddressRequestModel,
    form?: UseFormReturn<AppFormType<AddressRequestModel>>,
  ) => void;
  onSubmit?: (value: AddressRequestModel) => void;
  onCancel?: () => void;
}
