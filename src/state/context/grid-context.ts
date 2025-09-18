import { createContext, useContext } from "react";

import { IGridContext } from "@/const/interfaces/context/IGridContext.ts";

export const GridContext = createContext<IGridContext>(null);

export const useGridContext = () => {
  const props = useContext<IGridContext>(GridContext);

  if (!props)
    throw new Error("useGridContext must be used within useGridContext");

  return props;
};
