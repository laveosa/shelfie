import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export interface ISheFormItemContext<TFieldValues = any, TName = any> {
  field?: ControllerRenderProps<TFieldValues, TName>;
  form?: UseFormReturn<TFieldValues>;
}
