import { useForm, UseFormProps } from "react-hook-form";
import { AppFormType } from "@/const/types/AppFormType.ts";

export default function useAppForm<T>(props?: UseFormProps<any>) {
  return useForm<AppFormType<T>>(props);
}
