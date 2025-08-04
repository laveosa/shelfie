import React, { ComponentPropsWithRef } from "react";

import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export interface ISheBadgeList<T>
  extends Omit<
      IShePrimitiveComponentWrapper,
      "onClear" | "iconPosition" | "clearBtnPosition"
    >,
    ComponentPropsWithRef<"div"> {
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  items?: ISheBadge<T>[];
  extraBudge?: ISheBadge<T>;
  maxBadgeAmount?: number;
  autoBadgeAmount?: boolean;
  variant?: "default" | "secondary" | "destructive" | "outline";
  color?: string;
  textColor?: string;
  iconColor?: string;
  elementIcon?: Partial<ISheIcon> | string | React.FC<any>;
  placeholder?: string;
  placeholderTransKey?: string;
  elementMinWidth?: string;
  elementMaxWidth?: string;
  elementFullWidth?: boolean;
  direction?: "row" | "column";
  textWrap?: "wrap" | "nowrap" | "dots";
  itemsWrap?: "wrap" | "nowrap";
  disabled?: boolean;
  isLoading?: boolean;
  showCloseBtn?: boolean;
  onClick?(
    value: ISheBadge<T>,
    model?: IOutputEventModel<T | string, ISheBadge<T>, React.MouseEvent>,
  ): void;
  onClose?(
    value: ISheBadge<T>,
    model?: IOutputEventModel<T | string, ISheBadge<T>, React.MouseEvent>,
  ): void;
  onCloseAllExtra?(
    value: ISheBadge<T>[],
    model?: IOutputEventModel<T[] | string[], ISheBadge<T>[], React.MouseEvent>,
  ): void;
  onClear?(
    value: null,
    model?: IOutputEventModel<null, ISheBadgeList<T>, React.MouseEvent>,
  ): void;
}

export const SheBadgeListDefaultModel: ISheBadgeList<any> = {
  elementClassName: undefined,
  elementStyle: undefined,
  items: undefined,
  extraBudge: undefined,
  maxBadgeAmount: undefined,
  autoBadgeAmount: undefined,
  variant: undefined,
  color: undefined,
  textColor: undefined,
  iconColor: undefined,
  elementIcon: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  elementMinWidth: undefined,
  elementMaxWidth: undefined,
  elementFullWidth: undefined,
  direction: undefined,
  textWrap: undefined,
  itemsWrap: undefined,
  disabled: undefined,
  isLoading: undefined,
  showCloseBtn: undefined,
  onClick: undefined,
  onClose: undefined,
  onCloseAllExtra: undefined,
  onClear: undefined,
};
