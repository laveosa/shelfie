import { ComponentPropsWithRef } from "react";

import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";
import { IBaseComponent } from "@/const/interfaces/IBaseComponent.ts";

export interface ISheSelectItem extends IBaseComponent {
  id?: any;
  value: any;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  disabled?: boolean;
}

export interface ISheSelect extends IBaseComponent {
  label?: string;
  labelTransKey?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  icon?: any;
  selected?: any;
  items?: ISheSelectItem[];
  showClearBtn?: boolean;
  hideFirstOption?: boolean;
  tooltip?: ISheTooltip;
  required?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onSelect?: (value: any) => void;
}
