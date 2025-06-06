import React from "react";

import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheMultiSelect extends ISheMultiSelectTrigger {
  popoverClassName?: string;
  popoverStyles?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  options?: ISheMultiSelectItem[];
  selectedValues?: any[];
  isOpen?: boolean;
  searchPlaceholder?: string;
  searchPlaceholderTransKey?: string;
  emptySearchPlaceholder?: string;
  emptySearchPlaceholderTransKey?: string;
  onIsOpen?: (value: any) => void;
  onClear?: (value: any) => void;
  onValueChange?: (values: any[]) => void;
}
