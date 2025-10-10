import { CountryCodeModel } from "@/const/models/CountryCodeModel.ts";
import { LocationModel } from "@/const/models/LocationModel.ts";
import { UseFormReturn } from "react-hook-form";
import { AppFormType } from "@/const/types/AppFormType.ts";

export interface ILocationForm {
  isLoading?: boolean;
  data?: LocationModel;
  countryCodes?: CountryCodeModel[];
  onAction?: (identifier: string, payload?: any) => void;
  onChange?: (
    value: LocationModel,
    form?: UseFormReturn<AppFormType<LocationModel>>,
  ) => void;
  onSubmit?: (data: LocationModel) => void;
  onCancel?: () => void;
}
