import { UseFormReturn } from "react-hook-form";

import { AddressRequestModel } from "@/const/models/AddressRequestModel.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface IAddressForm {
  className?: string;
  data?: AddressRequestModel;
  isCreate?: boolean;
  countryList?: ISheSelectItem<number>[];
  showFooter?: boolean;
  onChange?: (
    value: AddressRequestModel,
    form?: UseFormReturn<AppFormType<AddressRequestModel>>,
  ) => void;
  onSubmit?: (value: AddressRequestModel) => void;
  onCancel?: () => void;
}
