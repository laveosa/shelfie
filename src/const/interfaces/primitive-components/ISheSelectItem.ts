import React from "react";

import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";

export interface ISheSelectItem extends ISheOption<any> {
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  showSelectIcon?: boolean;
}
