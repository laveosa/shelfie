import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { Select } from "@/components/ui/select.tsx";

export interface ISheSelect<T>
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<typeof Select> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  triggerRef?: React.RefObject<any>;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  items?: ISheSelectItem<T>[];
  selected?: T;
  hideFirstOption?: boolean;
  placeholder?: string;
  placeholderTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  required?: boolean;
  showSelectIcon?: boolean;
  autoFocus?: boolean;
  onOpen?(value: boolean): void;
  onSelect?(value: T): void;
  onSelectModel?(
    data: IOutputEventModel<T, ISheSelect<T>, React.MouseEvent>,
  ): void;
}

export const SheSelectDefaultModel: ISheSelect<any> = {
  id: undefined,
  className: undefined,
  style: undefined,
  elementClassName: undefined,
  elementStyle: undefined,
  triggerRef: undefined,
  icon: undefined,
  items: undefined,
  selected: undefined,
  hideFirstOption: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  disabled: undefined,
  isLoading: undefined,
  isOpen: undefined,
  required: undefined,
  showSelectIcon: undefined,
  autoFocus: undefined,
  onOpen: undefined,
  onSelect: undefined,
  onSelectModel: undefined,
};
