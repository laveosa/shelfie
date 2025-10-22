import { IBaseContextProvider } from "@/const/interfaces/IBaseContextProvider.ts";
import { ISheFormItemContext } from "@/const/interfaces/context/ISheFormItemContext.ts";
import { SheFormItemContext } from "@/state/context/she-form-item-context.ts";
import { useMemo } from "react";

export const SheFormItemContextProvider = <T, TName>({
  value,
  children,
}: IBaseContextProvider<ISheFormItemContext<T, TName>>) => {
  const memoizedValue = useMemo(() => {
    if (!value) return null;

    return {
      field: value.field,
      form: value.form,
    };
  }, [value?.field?.name, value?.form]);

  return (
    <SheFormItemContext.Provider
      value={memoizedValue as ISheFormItemContext<T, TName>}
    >
      {children}
    </SheFormItemContext.Provider>
  );
};

/*export const SheFormItemContextProvider = <T, TName>({
  value,
  children,
}: IBaseContextProvider<ISheFormItemContext<T, TName>>) => (
  <SheFormItemContext.Provider value={value}>
    {children}
  </SheFormItemContext.Provider>
);*/
