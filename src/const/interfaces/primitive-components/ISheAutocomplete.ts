import React from "react";

import { ISheAutocompleteItem } from "@/const/interfaces/primitive-components/ISheAutocompleteItem.ts";
import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";

type NativeInputProps = Omit<ISheInput, "onSelect">;

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
  items?: ISheAutocompleteItem[];
  size?: "normal" | "small";
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  onSearch?: (value: string) => void;
  onSelect?: (value: string) => void;
  onIsOpen?: (value: boolean) => void;
}
