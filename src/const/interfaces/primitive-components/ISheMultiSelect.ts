import React from "react";

import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheMultiSelectFooter } from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";
import { ISheMultiSelectSearch } from "@/const/interfaces/primitive-components/ISheMultiSelectSearch.ts";

export interface ISheMultiSelect
  extends ISheMultiSelectTrigger,
    ISheMultiSelectSearch,
    ISheMultiSelectFooter {
  popoverClassName?: string;
  popoverStyles?: React.CSSProperties;
  hideSelectAll?: boolean;
  options?: ISheMultiSelectItem[];
  selectedValues?: any[];
  emptySearchPlaceholder?: string;
  emptySearchPlaceholderTransKey?: string;
  selectAllPlaceholder?: string;
  selectAllPlaceholderTransKey?: string;
  isOpen?: boolean;
  onIsOpen?: (value: any) => void;
  onClear?: (value: any) => void;
  onValueChange?: (values: any[]) => void;
}

export const SheMultiSelectDefaultModel: ISheMultiSelect = {
  popoverClassName: undefined,
  popoverStyles: undefined,
  hideSelectAll: undefined,
  options: undefined,
  selectedValues: undefined,
  emptySearchPlaceholder: undefined,
  emptySearchPlaceholderTransKey: undefined,
  selectAllPlaceholder: undefined,
  selectAllPlaceholderTransKey: undefined,
  isOpen: undefined,
  onIsOpen: undefined,
  onClear: undefined,
  onValueChange: undefined,
};
