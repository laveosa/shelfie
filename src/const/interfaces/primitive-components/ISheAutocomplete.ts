import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheAutocomplete {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  text?: string;
  value?: any;
}

export interface ISheAutocomplete
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value?: string;
  items?: ISheAutocomplete[];
  placeholder?: string;
  placeholderTransKey?: string;
  size?: "sizeNormal" | "sizeSmall";
  autoFocus?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  delayTime?: number;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  onDelay?: (value: string) => void;
  onSelect?: (value: string) => void;
}
