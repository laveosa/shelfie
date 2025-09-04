import { createContext, useContext } from "react";

import { ISheFormItemContext } from "@/const/interfaces/context/ISheFormItemContext.ts";

export const SheFormItemContext = createContext<ISheFormItemContext>(null);

export const useSheFormItemContext = () => useContext(SheFormItemContext);
