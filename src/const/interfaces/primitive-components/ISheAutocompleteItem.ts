import React from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheAutocompleteItem {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  text: string;
  textTransKey: string;
}
