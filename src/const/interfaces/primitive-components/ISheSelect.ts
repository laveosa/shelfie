import React, { ComponentPropsWithRef } from "react";

import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheSelectItem extends ComponentPropsWithRef<any> {
  id?: string;
  value: any;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  disabled?: boolean;
}

export interface ISheSelect extends ComponentPropsWithRef<any> {
  label?: string;
  labelTransKey?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  selected?: any;
  items?: ISheSelectItem[];
  showClearBtn?: boolean;
  hideFirstOption?: boolean;
  tooltip?: ISheTooltip;
  required?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  isOpen?: boolean;
  onOpenChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}
