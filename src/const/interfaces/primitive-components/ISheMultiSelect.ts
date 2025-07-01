import React from "react";

import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheMultiSelectFooter } from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";
import { ISheMultiSelectSearch } from "@/const/interfaces/primitive-components/ISheMultiSelectSearch.ts";

export interface ISheMultiSelect<T>
  extends Omit<ISheMultiSelectTrigger, "items">,
    ISheMultiSelectSearch,
    ISheMultiSelectFooter {
  popoverClassName?: string;
  popoverStyle?: React.CSSProperties;
  hideSelectAll?: boolean;
  items?: ISheMultiSelectItem<T>[];
  selectedValues?: T[];
  emptySearchPlaceholder?: string;
  emptySearchPlaceholderTransKey?: string;
  selectAllPlaceholder?: string;
  selectAllPlaceholderTransKey?: string;
  isOpen?: boolean;
  onOpenChange?: (value: boolean) => void;
  onClear?: (value: null) => void;
  onValueChange?: (values: T[]) => void;
}

export const SheMultiSelectDefaultModel: ISheMultiSelect<any> = {
  popoverClassName: undefined,
  popoverStyle: undefined,
  hideSelectAll: undefined,
  items: undefined,
  selectedValues: undefined,
  emptySearchPlaceholder: undefined,
  emptySearchPlaceholderTransKey: undefined,
  selectAllPlaceholder: undefined,
  selectAllPlaceholderTransKey: undefined,
  isOpen: undefined,
  onOpenChange: undefined,
  onClear: undefined,
  onValueChange: undefined,
};
