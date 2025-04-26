import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheErrorMessageBlock } from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";
import { ISheContextLengthLimits } from "@/const/interfaces/primitive-components/ISheContextLengthLimits.ts";

export interface ISheTextarea
  extends ISheLabel,
    ISheClearButton,
    ISheContextLengthLimits,
    ISheErrorMessageBlock,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value?: string | number | readonly string[];
  placeholder?: string;
  placeholderTransKey?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isValid?: boolean;
  ignoreValidation?: boolean;
  resize?: boolean;
  rows?: number;
  delayTime?: number;
  onChange?: (value: string | number | readonly string[]) => void;
  onBlur?: (value: string | number | readonly string[]) => void;
  onDelay?: (value: string | number | readonly string[]) => void;
  onIsValid?: (value: boolean) => void;
}
