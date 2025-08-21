import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { AppFormType } from "@/const/types/AppFormType.ts";

export interface ISheFormItemContext<T = any, TName = any> {
  field?: ControllerRenderProps<T, TName>;
  form?: UseFormReturn<AppFormType<T>>;
}
