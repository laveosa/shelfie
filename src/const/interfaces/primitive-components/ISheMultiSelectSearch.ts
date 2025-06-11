import React from "react";

export interface ISheMultiSelectSearch {
  searchRef?: React.Ref<HTMLInputElement>;
  searchClassName?: string;
  searchStyle?: React.CSSProperties;
  searchElementClassName?: string;
  searchElementStyle?: React.CSSProperties;
  searchValue?: string;
  searchPlaceholder?: string;
  searchPlaceholderTransKey?: string;
  hideSearchClearBtn?: boolean;
  showSearch?: boolean;
  onSearch?: (data: string) => void;
}

export const SheMultiSelectSearchDefaultModel: ISheMultiSelectSearch = {
  searchRef: undefined,
  searchClassName: undefined,
  searchStyle: undefined,
  searchElementClassName: undefined,
  searchElementStyle: undefined,
  searchValue: undefined,
  searchPlaceholder: undefined,
  searchPlaceholderTransKey: undefined,
  hideSearchClearBtn: undefined,
  showSearch: undefined,
  onSearch: undefined,
};
