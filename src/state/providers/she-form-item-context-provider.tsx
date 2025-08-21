import { IBaseContextProvider } from "@/const/interfaces/IBaseContextProvider.ts";
import { ISheFormItemContext } from "@/const/interfaces/context/ISheFormItemContext.ts";
import { SheFormItemContext } from "@/state/context/she-form-item-context.ts";

export const SheFormItemContextProvider = <TFieldValues, TName>({
  value,
  children,
}: IBaseContextProvider<ISheFormItemContext<TFieldValues, TName>>) => (
  <SheFormItemContext.Provider value={value}>
    {children}
  </SheFormItemContext.Provider>
);
