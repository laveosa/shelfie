import { IBaseContextProvider } from "@/const/interfaces/IBaseContextProvider.ts";
import { ISheFormContext } from "@/const/interfaces/context/ISheFormContext.ts";
import { SheFormContext } from "@/state/context/she-form-context.ts";

export const SheFormContextProvider = <T = any,>({
  value,
  children,
}: IBaseContextProvider<ISheFormContext<T>>) => (
  <SheFormContext.Provider value={value}>{children}</SheFormContext.Provider>
);
