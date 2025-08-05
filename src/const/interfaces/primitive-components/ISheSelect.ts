import React, { ComponentPropsWithRef, RefObject } from "react";

import { Select } from "@/components/ui/select.tsx";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export interface ISheSelect<T>
  extends IShePrimitiveComponentWrapper,
    ComponentPropsWithRef<typeof Select> {
  popoverRef?: RefObject<HTMLDivElement>;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  triggerRef?: React.RefObject<any>;
  items?: ISheSelectItem<T>[];
  selected?: T;
  hideFirstOption?: boolean;
  placeholder?: string;
  placeholderTransKey?: string;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  showSelectIcon?: boolean;
  autoFocus?: boolean;
  openOnFocus?: boolean;
  onOpen?(value: boolean): void;
  onSelect?(
    value: T,
    model?: IOutputEventModel<
      T,
      ISheSelect<T>,
      React.MouseEvent | React.KeyboardEvent
    >,
  ): void;
  onTriggerKeyDown?(value: any): void;
}

export const SheSelectDefaultModel: ISheSelect<any> = {
  popoverRef: undefined,
  elementClassName: undefined,
  elementStyle: undefined,
  triggerRef: undefined,
  items: undefined,
  selected: undefined,
  hideFirstOption: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  disabled: undefined,
  isLoading: undefined,
  isOpen: undefined,
  showSelectIcon: undefined,
  autoFocus: undefined,
  openOnFocus: undefined,
  onOpen: undefined,
  onSelect: undefined,
  onTriggerKeyDown: undefined,
};
