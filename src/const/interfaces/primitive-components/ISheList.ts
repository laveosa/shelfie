import React, { ComponentPropsWithRef } from "react";

import { ISheListItem } from "@/const/interfaces/primitive-components/ISheListItem.ts";
import { ISheListHeader } from "@/const/interfaces/primitive-components/ISheListHeader.ts";
import { ISheListFooter } from "@/const/interfaces/primitive-components/ISheListFooter.ts";

export interface ISheList<T>
  extends ISheListHeader,
    ISheListFooter,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  items?: ISheListItem<T>[];
  selected?: T;
  selectedValues?: T[];
  emptySearchPlaceholder?: string;
  emptySearchPlaceholderTransKey?: string;
  selectAllItemPlaceholder?: string;
  selectAllItemPlaceholderTransKey?: string;
  selectNoneItemPlaceholder?: string;
  selectNoneItemPlaceholderTransKey?: string;
  noItemsPlaceholder?: string;
  noItemsPlaceholderTransKey?: string;
  mode?: "single" | "multi" | "default";
  view?: "normal" | "card";
  showSelectAll?: boolean;
  showSelectNone?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isDnd?: boolean;
}
