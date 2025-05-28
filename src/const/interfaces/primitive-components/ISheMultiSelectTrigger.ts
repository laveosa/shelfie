import React, { ComponentPropsWithRef } from "react";

import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheMultiSelectTrigger
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  placeholder?: string;
  placeholderTransKey?: string;
  options?: ISheMultiSelectItem[];
  selectedValues?: string[];
  maxCount?: number;
  asChild?: boolean;
  ariaDescribedbyId?: string;
  required?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onTogglePopover?: (value: any) => void;
  onToggleOption?: (value: any) => void;
  onClearExtraOptions?: () => void;
  onClearAll?: () => void;
}
