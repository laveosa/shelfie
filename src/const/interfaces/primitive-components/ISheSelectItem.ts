import React from "react";

import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";

export interface ISheSelectItem<T> extends ISheOption<T> {
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  showSelectIcon?: boolean;
}
