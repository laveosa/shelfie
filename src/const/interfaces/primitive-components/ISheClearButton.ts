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
  onClear?(value?: any): void;
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
  onClear: undefined,
};
