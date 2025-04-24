import React from "react";

export interface ISheClearButton {
  className?: string;
  style?: React.CSSProperties;
  value?: any;
  showClearBtn?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  ariaDescribedbyId?: string;
  onClearHandler: () => void;
}
