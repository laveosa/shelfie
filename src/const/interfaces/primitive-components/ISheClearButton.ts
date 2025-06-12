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
  onClear?: (value?: any) => void;
}
