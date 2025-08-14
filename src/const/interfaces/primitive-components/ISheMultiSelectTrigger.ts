import React, { ComponentPropsWithRef, RefObject } from "react";

import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheBadgeList } from "@/const/interfaces/primitive-components/ISheBadgeList.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export interface ISheMultiSelectTrigger<T>
  extends IShePrimitiveComponentWrapper,
    ComponentPropsWithRef<any> {
  ref?: RefObject<HTMLButtonElement>;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  items?: ISheBadge<T>[];
  badgeListProps?: ISheBadgeList<T>;
  contextType?: "badges" | "string";
  placeholder?: string;
  placeholderTransKey?: string;
  maxCount?: number;
  autoFocus?: boolean;
  isOpen?: boolean;
  onTogglePopover?(): void;
  onToggleOption?(value: any, event?: React.MouseEvent): void;
  onClearExtraOptions?(
    value: ISheBadge<T>[],
    model?: IOutputEventModel<T[] | string[], ISheBadge<T>[], React.MouseEvent>,
  ): void;
  onClearAll?(event: React.MouseEvent): void;
}

export const SheMultiSelectTriggerDefaultModel: ISheMultiSelectTrigger<any> = {
  elementClassName: undefined,
  elementStyle: undefined,
  items: undefined,
  badgeListProps: undefined,
  contextType: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  maxCount: undefined,
  autoFocus: undefined,
  isOpen: undefined,
  onTogglePopover: undefined,
  onToggleOption: undefined,
  onClearExtraOptions: undefined,
  onClearAll: undefined,
};
