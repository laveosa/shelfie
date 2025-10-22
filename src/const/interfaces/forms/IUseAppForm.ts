import { UseFormReturn } from "react-hook-form";
import { AppFormType } from "@/const/types/AppFormType.ts";

export interface IUseAppForm<T> {
  form: UseFormReturn<AppFormType<T>>;
  isValid?: boolean;
  isDisabled?: boolean;
  resetForm?(value: T): void;
  setValue?(identifier: string, value: any): void;
}
