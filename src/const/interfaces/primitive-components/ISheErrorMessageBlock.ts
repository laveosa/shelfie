import React from "react";

export interface ISheErrorMessageBlock {
  className?: string;
  style?: React.CSSProperties;
  error?: string;
  errorTransKey?: string;
  showError?: boolean;
}
