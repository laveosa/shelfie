import { ComponentPropsWithRef } from "react";

import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheSelectItem extends ComponentPropsWithRef<"div"> {
  id?: any;
  value: any;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  disabled?: boolean;
}

export interface ISheSelect extends ComponentPropsWithRef<"div"> {
  label?: string;
  labelTransKey?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  icon?: any;
  selected?: ISheSelectItem;
  items?: ISheSelectItem[];
  showClearBtn?: boolean;
  tooltip?: ISheTooltip;
  minWidth?: number;
  maxWidth?: number;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onSelect?: (value: any) => void;
}
