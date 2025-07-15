import React, { ComponentPropsWithRef, RefObject } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheBadgeList } from "@/const/interfaces/primitive-components/ISheBadgeList.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheMultiSelectTrigger<T>
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  ref?: RefObject<HTMLButtonElement>;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  items?: ISheBadge<T>[];
  badgeListProps?: ISheBadgeList<T>;
  contextType?: "badges" | "string";
  placeholder?: string;
  placeholderTransKey?: string;
  maxCount?: number;
  autoFocus?: boolean;
  asChild?: boolean;
  ariaDescribedbyId?: string;
  required?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  onTogglePopover?(): void;
  onToggleOption?(value: T, event?: React.MouseEvent): void;
  onClearExtraOptions?(
    value: ISheBadge<T>[],
    model?: IOutputEventModel<T[] | string[], ISheBadge<T>[], React.MouseEvent>,
  ): void;
  onClearAll?(event: React.MouseEvent): void;
}

export const SheMultiSelectTriggerDefaultModel: ISheMultiSelectTrigger<any> = {
  ref: undefined,
  id: undefined,
  className: undefined,
  style: undefined,
  elementClassName: undefined,
  elementStyle: undefined,
  icon: undefined,
  items: undefined,
  badgeListProps: undefined,
  contextType: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  maxCount: undefined,
  autoFocus: undefined,
  asChild: undefined,
  ariaDescribedbyId: undefined,
  required: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  disabled: undefined,
  isLoading: undefined,
  isOpen: undefined,
  onTogglePopover: undefined,
  onToggleOption: undefined,
  onClearExtraOptions: undefined,
  onClearAll: undefined,
};
