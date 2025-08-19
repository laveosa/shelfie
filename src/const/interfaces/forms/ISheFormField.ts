import { FieldPath, UseFormReturn } from "react-hook-form";
import { ControllerProps } from "react-hook-form/dist/types/controller";

import { AppFormType } from "@/const/interfaces/types/AppFormType.ts";
import {
  ISheFormItem,
  SheFormItemDefaultModel,
} from "@/const/interfaces/forms/ISheFormItem.ts";

export interface ISheFormField<T, TName extends FieldPath<T>>
  extends ISheFormItem {
  form: UseFormReturn<AppFormType<T>>;
  name: TName;
  render: ControllerProps<T, TName>["render"];
}

export const SheFormFieldDefaultModel: ISheFormField<any, any> = {
  ...SheFormItemDefaultModel,
  form: undefined,
  name: undefined,
  render: undefined,
};
