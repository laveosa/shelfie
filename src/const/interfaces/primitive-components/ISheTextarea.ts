import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";
import { TextareaProps } from "@/components/ui/textarea.tsx";

export interface ISheTextarea
  extends TextareaProps,
    ComponentPropsWithRef<any> {
  label?: string;
  labelTransKey?: string;
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
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  onDelay?: (value: any) => void;
}
