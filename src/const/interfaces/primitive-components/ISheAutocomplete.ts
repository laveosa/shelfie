import React from "react";

import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

type NativeInputProps = Omit<ISheInput, "onSelect" | "id" | "size">;

export interface ISheAutocomplete extends NativeInputProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  popoverClassName?: string;
  popoverStyle?: React.CSSProperties;
  searchValue?: string;
  selectBtnProps?: ISheButton;
  showSelectBtn?: boolean;
  noDataPlaceholder?: string;
  noDataPlaceholderTransKey?: string;
  noSearchPlaceholder?: string;
  noSearchPlaceholderTransKey?: string;
  items?: ISheOption<string>[];
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  minAmount?: number;
  onSearch?(value: string): void;
  onSelect?(value: string): void;
  onSelectModel?(
    data: IOutputEventModel<
      string,
      ISheAutocomplete,
      React.MouseEvent | React.KeyboardEvent
    >,
  ): void;
  onIsOpen?(value: boolean): void;
}

export const SheAutocompleteDefaultModel: ISheAutocomplete = {
  id: undefined,
  className: undefined,
  style: undefined,
  elementClassName: undefined,
  elementStyle: undefined,
  popoverClassName: undefined,
  popoverStyle: undefined,
  searchValue: undefined,
  selectBtnProps: undefined,
  showSelectBtn: undefined,
  noDataPlaceholder: undefined,
  noDataPlaceholderTransKey: undefined,
  noSearchPlaceholder: undefined,
  noSearchPlaceholderTransKey: undefined,
  items: undefined,
  disabled: undefined,
  isLoading: undefined,
  isOpen: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  minAmount: undefined,
  onSearch: undefined,
  onSelect: undefined,
  onSelectModel: undefined,
  onIsOpen: undefined,
};
