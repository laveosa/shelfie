import { ComponentPropsWithRef } from "react";

import { InputProps } from "@/components/ui/input.tsx";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";
import { InputPatternEnum } from "@/const/enums/InputPatternEnum.ts";

export interface ISheInput extends InputProps, ComponentPropsWithRef<any> {
  label?: string;
  labelTransKey?: string;
  placeholderTransKey?: string;
  icon?: any;
  isSearch?: boolean;
  isValid?: boolean;
  showClearBtn?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  showError?: boolean;
  error?: string;
  errorTransKey?: string;
  strict?: boolean;
  transKey?: string;
  pattern?: InputPatternEnum | any;
  tooltip?: ISheTooltip;
  isLoading?: boolean;
  disabled?: boolean;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onDelay?: (value: any) => void;
}
