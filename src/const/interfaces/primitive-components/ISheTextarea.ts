import React from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";

export interface ISheTextarea extends ISheLabel {
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value?: string | number | readonly string[];
  placeholder?: string;
  placeholderTransKey?: string;
  disabled?: boolean;
  isLoading?: boolean;
  showClearBtn?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isValid?: boolean;
  ignoreValidation?: boolean;
  showError?: boolean;
  resize?: boolean;
  rows?: number;
  delayTime?: number;
  onChange?: (value: string | number | readonly string[]) => void;
  onBlur?: (value: string | number | readonly string[]) => void;
  onDelay?: (value: string | number | readonly string[]) => void;
  onIsValid?: (value: boolean) => void;
}
