import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheBadge } from "@/const/interfaces/primitive-components/ISheBadge.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export interface ISheBadgeList<T>
  extends ISheLabel,
    ISheClearButton,
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
  onClick?(value: ISheBadge<T>): void;
  onClose?(value: ISheBadge<T>): void;
  onCloseAllExtra?(value: ISheBadge<T>[]): void;
  onClear?(value: null): void;
}
