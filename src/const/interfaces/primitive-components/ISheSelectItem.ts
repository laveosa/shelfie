import React from "react";

import {
  ISheOption,
  SheOptionDefaultModel,
} from "@/const/interfaces/primitive-components/ISheOption.ts";

export interface ISheSelectItem<T> extends ISheOption<T> {
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  showSelectIcon?: boolean;
}

export const SheSelectItemDefaultModel: ISheSelectItem<any> = {
  ...SheOptionDefaultModel,
  elementClassName: undefined,
  elementStyle: undefined,
  showSelectIcon: undefined,
};

export interface ISheSelectItemConvertorConfig {
  id?: string;
  text: string;
  description?: string;
  icon?: string;
  value: string;
  colors?: string;
  sideText?: string;
  sideDescription?: string;
  isSelected?: string;
}
