import React from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

export interface ISheSelect extends ISheLabel, ISheClearButton {
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
  showSelectIcon?: boolean;
  onOpenChange?: (value: any) => void;
  onSelect?: (value: any) => void;
}
