import { useSheFormItemContext } from "@/state/context/she-form-item-context.ts";

export default function useSheFormData<
  TProps extends { field?: any; form?: any },
>(props: TProps) {
  const ctx = useSheFormItemContext();

  return {
    field: props?.field || ctx?.field,
    form: props?.form || ctx?.form,
  };
}
