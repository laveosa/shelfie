import React, { RefObject } from "react";

import { ISheMultiSelectTrigger } from "@/const/interfaces/primitive-components/ISheMultiSelectTrigger.ts";
import { ISheMultiSelectItem } from "@/const/interfaces/primitive-components/ISheMultiSelectItem.ts";
import { ISheMultiSelectFooter } from "@/const/interfaces/primitive-components/ISheMultiSelectFooter.ts";
import { ISheMultiSelectSearch } from "@/const/interfaces/primitive-components/ISheMultiSelectSearch.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheMultiSelect<T>
  extends Omit<ISheMultiSelectTrigger, "items">,
    ISheMultiSelectSearch,
    ISheMultiSelectFooter {
  popoverRef?: RefObject<HTMLDivElement>;
  popoverClassName?: string;
  popoverStyle?: React.CSSProperties;
  hideSelectAll?: boolean;
  items?: ISheMultiSelectItem<T>[];
  selectedValues?: T[];
  emptySearchPlaceholder?: string;
  emptySearchPlaceholderTransKey?: string;
  selectAllPlaceholder?: string;
  selectAllPlaceholderTransKey?: string;
  openOnFocus?: boolean;
  isOpen?: boolean;
  onOpen?: (value: boolean) => void;
  onClear?(value: null): void;
  onSelect?(values: T[]): void;
  onSelectModel?(
    data: IOutputEventModel<
      T[],
      ISheMultiSelect<T>,
      React.MouseEvent | React.KeyboardEvent
    >,
  ): void;
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
  openOnFocus: undefined,
  isOpen: undefined,
  onOpen: undefined,
  onClear: undefined,
  onSelect: undefined,
  onSelectModel: undefined,
};
