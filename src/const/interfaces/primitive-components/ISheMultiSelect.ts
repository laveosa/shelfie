import React from "react";

import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheMultiSelectFooter } from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";

export interface ISheMultiSelect
  extends ISheMultiSelectTrigger,
    ISheMultiSelectFooter {
  popoverClassName?: string;
  popoverStyles?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  options?: ISheMultiSelectItem[];
  selectedValues?: any[];
  searchPlaceholder?: string;
  searchPlaceholderTransKey?: string;
  emptySearchPlaceholder?: string;
  emptySearchPlaceholderTransKey?: string;
  selectAllPlaceholder?: string;
  selectAllPlaceholderTransKey?: string;
  isOpen?: boolean;
  showSearch?: boolean;
  showFooter?: boolean;
  hideSelectAll?: boolean;
  footerClassName?: string;
  footerStyle?: React.CSSProperties;
  onIsOpen?: (value: any) => void;
  onClear?: (value: any) => void;
  onValueChange?: (values: any[]) => void;
}
