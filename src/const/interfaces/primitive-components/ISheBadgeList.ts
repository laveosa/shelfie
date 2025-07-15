import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheBadgeList<T>
  extends ISheLabel,
    Omit<ISheClearButton, "onClear">,
    ComponentPropsWithRef<"div"> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
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
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  elementIcon?: Partial<ISheIcon> | string | React.FC<any>;
  placeholder?: string;
  placeholderTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  elementMinWidth?: string;
  elementMaxWidth?: string;
  elementFullWidth?: boolean;
  direction?: "row" | "column";
  textWrap?: "wrap" | "nowrap" | "dots";
  itemsWrap?: "wrap" | "nowrap";
  disabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  showCloseBtn?: boolean;
  componentView?: ComponentViewEnum;
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
  id: undefined,
  className: undefined,
  style: undefined,
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
  icon: undefined,
  elementIcon: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  elementMinWidth: undefined,
  elementMaxWidth: undefined,
  elementFullWidth: undefined,
  direction: undefined,
  textWrap: undefined,
  itemsWrap: undefined,
  disabled: undefined,
  isLoading: undefined,
  required: undefined,
  showCloseBtn: undefined,
  componentView: undefined,
  onClick: undefined,
  onClose: undefined,
  onCloseAllExtra: undefined,
  onClear: undefined,
};
