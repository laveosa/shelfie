import React from "react";

export interface ISheContextLengthLimits {
  className?: string;
  style?: React.CSSProperties;
  value?: any;
  lengthInvalid?: boolean;
  minLength?: number;
  maxLength?: number;
}
