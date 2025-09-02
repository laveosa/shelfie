import { FieldPath } from "react-hook-form";
import { ControllerProps } from "react-hook-form/dist/types/controller";

import {
  ISheFormItem,
  SheFormItemDefaultModel,
} from "@/const/interfaces/forms/ISheFormItem.ts";

export interface ISheFormField<T, TName extends FieldPath<T>>
  extends ISheFormItem {
  name: TName;
  render: ControllerProps<T, TName>["render"];
  ignoreFormAction?: boolean;
}

export const SheFormFieldDefaultModel: ISheFormField<any, any> = {
  ...SheFormItemDefaultModel,
  name: undefined,
  render: undefined,
  ignoreFormAction: undefined,
};
