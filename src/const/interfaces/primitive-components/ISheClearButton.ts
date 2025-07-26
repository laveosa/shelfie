import React from "react";

export interface ISheClearButton {
  className?: string;
  style?: React.CSSProperties;
  value?: any;
  color?: string;
  showClearBtn?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  ariaDescribedbyId?: string;
  clearBtnPosition?: "in" | "out";
  onClear?(event: React.MouseEvent | React.KeyboardEvent): void;
}

export const SheClearButtonDefaultModel: ISheClearButton = {
  className: undefined,
  style: undefined,
  value: undefined,
  color: undefined,
  showClearBtn: undefined,
  disabled: undefined,
  isLoading: undefined,
  ariaDescribedbyId: undefined,
  clearBtnPosition: undefined,
  onClear: undefined,
};
