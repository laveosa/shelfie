import React from "react";

export interface ISheMultiSelectSearch {
  searchRef?: React.Ref<any>;
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
