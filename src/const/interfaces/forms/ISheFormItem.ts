import { ComponentPropsWithRef } from "react";

export interface ISheFormItem extends ComponentPropsWithRef<"div"> {
  label?: string;
  labelTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  required?: boolean;
}

export const SheFormItemDefaultModel: ISheFormItem = {
  label: undefined,
  labelTransKey: undefined,
  description: undefined,
  descriptionTransKey: undefined,
  required: undefined,
};
