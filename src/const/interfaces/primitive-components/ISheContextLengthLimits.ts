import React from "react";

export interface ISheContextLengthLimits {
  className?: string;
  style?: React.CSSProperties;
  value?: any;
  isValid?: boolean;
  minLength?: number;
  maxLength?: number;
  type?: string;
}
