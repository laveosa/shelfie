import React from "react";

import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";

export interface ISheMultiSelectItem<T> extends ISheOption<T> {
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  onClick?(value: T, event?: React.MouseEvent): void;
}
