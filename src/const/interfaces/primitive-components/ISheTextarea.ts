import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheTextarea extends ComponentPropsWithRef<any> {
  value?: string | number | readonly string[];
  label?: string;
  labelTransKey?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  showClearBtn?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  tooltip?: ISheTooltip;
  isLoading?: boolean;
  disabled?: boolean;
  resize?: boolean;
  delayTime?: number;
  rows?: number;
  required?: boolean;
  style?: any;
  onChange?: (value: string | number | readonly string[]) => void;
  onBlur?: (value: string | number | readonly string[]) => void;
  onDelay?: (value: string | number | readonly string[]) => void;
}
