import { createContext, useContext } from "react";

import { ISheFormContext } from "@/const/interfaces/context/ISheFormContext.ts";

export const SheFormContext = createContext<ISheFormContext>(null);

export const useSheFormContext = () => useContext(SheFormContext);
