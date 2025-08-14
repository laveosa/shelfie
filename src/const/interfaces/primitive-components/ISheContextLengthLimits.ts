import React from "react";

export interface ISheContextLengthLimits {
  contextLengthLimitsClassName?: string;
  contextLengthLimitsStyle?: React.CSSProperties;
  contextLengthLimitsValue?: any;
  isContextLengthLimitsValid?: boolean;
  minLength?: number;
  maxLength?: number;
  type?: string;
}

export const SheContextLengthLimitsDefaultModel: ISheContextLengthLimits = {
  contextLengthLimitsClassName: undefined,
  contextLengthLimitsStyle: undefined,
  contextLengthLimitsValue: undefined,
  isContextLengthLimitsValid: undefined,
  minLength: undefined,
  maxLength: undefined,
  type: undefined,
};
