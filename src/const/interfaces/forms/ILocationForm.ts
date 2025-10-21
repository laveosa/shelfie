import { LocationModel } from "@/const/models/LocationModel.ts";
import { UseFormReturn } from "react-hook-form";
import { AppFormType } from "@/const/types/AppFormType.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface ILocationForm {
  isLoading?: boolean;
  data?: LocationModel;
  countryCodes?: ISheSelectItem<number>[];
  onAction?: (identifier: string, payload?: any) => void;
  onChange?: (
    value: LocationModel,
    form?: UseFormReturn<AppFormType<LocationModel>>,
  ) => void;
  onSubmit?: (data: LocationModel) => void;
  onCancel?: () => void;
}
