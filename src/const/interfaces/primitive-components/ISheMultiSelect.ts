import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";

export interface ISheMultiSelect
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elemClassName?: string;
  elemStyle?: React.CSSProperties;
  triggerRef?: React.RefObject<any>;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  options?: any[];
  selected?: any[];
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  placeholder?: string;
  placeholderTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  required?: boolean;
  onIsOpen?: (value: any) => void;
  onValueChange?: (values: any[]) => void;
}
