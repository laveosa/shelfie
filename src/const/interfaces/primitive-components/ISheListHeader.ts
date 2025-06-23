import React, { RefObject } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheListHeader {
  searchRef?: RefObject<HTMLInputElement>;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  searchClassName?: string;
  searchStyle?: React.CSSProperties;
  searchValue?: string;
  searchPlaceholder?: string;
  searchPlaceholderTransKey?: string;
  hideSearchClearBtn?: boolean;
  clearBtnIcon?: Partial<ISheIcon> | string | React.FC<any>;
  showHeader?: boolean;
  onSearch?: (data: string) => void;
}

export const SheListHeaderDefaultModel: ISheListHeader = {
  searchRef: undefined,
  headerClassName: undefined,
  headerStyle: undefined,
  searchClassName: undefined,
  searchStyle: undefined,
  searchValue: undefined,
  searchPlaceholder: undefined,
  searchPlaceholderTransKey: undefined,
  hideSearchClearBtn: undefined,
  clearBtnIcon: undefined,
  showHeader: undefined,
  onSearch: undefined,
};
