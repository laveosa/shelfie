import React, { ComponentPropsWithRef, RefObject } from "react";

import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import { ISheButton } from "@/const/interfaces/primitive-components/ISheButton.ts";
import { ISheOption } from "@/const/interfaces/primitive-components/ISheOption.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export interface ISheAutocomplete
  extends Omit<
      IShePrimitiveComponentWrapper,
      | "contextLengthLimitsClassName"
      | "contextLengthLimitsStyle"
      | "contextLengthLimitsValue"
      | "isContextLengthLimitsValid"
      | "minLength"
      | "maxLength"
    >,
    Omit<ISheInput, "onSelect" | "id">,
    ComponentPropsWithRef<any> {
  popoverRef?: RefObject<HTMLDivElement>;
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
  minAmount?: number;
  onOpen?(value: boolean): void;
  onSearch?(value: string): void;
  onSelect?(
    value: string,
    data: IOutputEventModel<
      string,
      ISheAutocomplete,
      React.MouseEvent | React.KeyboardEvent
    >,
  ): void;
}

export const SheAutocompleteDefaultModel: ISheAutocomplete = {
  popoverRef: undefined,
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
  minAmount: undefined,
  onOpen: undefined,
  onSearch: undefined,
  onSelect: undefined,
};
