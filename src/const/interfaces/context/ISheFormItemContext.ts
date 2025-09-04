import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { AppFormType } from "@/const/types/AppFormType.ts";

export interface ISheFormItemContext<T = any, _TName = any> {
  field?: ControllerRenderProps<T, any>;
  form?: UseFormReturn<AppFormType<T>>;
}
