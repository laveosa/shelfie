import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface ISheSelect
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
  items?: ISheSelectItem[];
  selected?: any;
  hideFirstOption?: boolean;
  placeholder?: string;
  placeholderTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  required?: boolean;
  showSelectIcon?: boolean;
  selectedColor?: string;
  onTriggerKeyDown?: (value: any) => void;
  onOpenChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}
