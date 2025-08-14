import React from "react";

import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";

export interface ISheMultiSelectItem<T> extends Omit<ISheOption<T>, "onClick"> {
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  onClick?(value: T, event?: React.MouseEvent | React.KeyboardEvent): void;
}
