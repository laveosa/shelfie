import { ComponentPropsWithRef } from "react";

export interface ISheFormItem extends ComponentPropsWithRef<"div"> {
  label?: string;
  labelTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
}
