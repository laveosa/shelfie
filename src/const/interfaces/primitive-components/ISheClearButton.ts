import React from "react";

import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheClearButton {
  clearBtnClassName?: string;
  clearBtnStyle?: React.CSSProperties;
  clearBtnValue?: any;
  clearBtnValueColor?: string;
  clearBtnBackgroundColor?: string;
  clearBtnIcon?: Partial<ISheIcon> | string | React.FC<any>;
  showClearBtn?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  ariaDescribedbyId?: string;
  clearBtnProps?: ISheButton;
  onClear?(event: React.MouseEvent | React.KeyboardEvent): void;
}

export const SheClearButtonDefaultModel: ISheClearButton = {
  clearBtnClassName: undefined,
  clearBtnStyle: undefined,
  clearBtnValue: undefined,
  clearBtnValueColor: undefined,
  clearBtnBackgroundColor: undefined,
  clearBtnIcon: undefined,
  showClearBtn: undefined,
  disabled: undefined,
  isLoading: undefined,
  ariaDescribedbyId: undefined,
  clearBtnProps: undefined,
  onClear: undefined,
};
