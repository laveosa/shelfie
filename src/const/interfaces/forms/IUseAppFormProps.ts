import { UseFormProps } from "react-hook-form";
import { AppFormType } from "@/const/types/AppFormType.ts";
import { AppSchemeType } from "@/const/types/AppSchemeType.ts";

export interface IUseAppFormProps<T> extends UseFormProps<AppFormType<T>> {
  values?: T;
  scheme?: AppSchemeType<T>;
}
