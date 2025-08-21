import { UseFormReturn } from "react-hook-form";

export interface ISheFormContext<T = any> {
  form?: UseFormReturn<T>;
}
