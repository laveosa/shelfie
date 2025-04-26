import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";

export interface ISheSelectItem extends ComponentPropsWithRef<any> {
  id?: string; // reserved PRIVATE property, don't use
  className?: string;
  style?: React.CSSProperties;
  value: any;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  disabled?: boolean;
}

export interface ISheSelect
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  items?: ISheSelectItem[];
  selected?: any;
  hideFirstOption?: boolean;
  placeholder?: string;
  placeholderTransKey?: string;
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  isOpen?: boolean;
  onOpenChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}
