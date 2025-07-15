import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { BadgeProps } from "@/components/ui/badge.tsx";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheBadge<T>
  extends Omit<BadgeProps, "onClick">,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  color?: string;
  textColor?: string;
  iconColor?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  text?: string | number;
  textTransKey?: string;
  textWrap?: "wrap" | "nowrap" | "dots";
  value?: T | string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isCircle?: boolean;
  showCloseBtn?: boolean;
  onClick?(
    value: T | string,
    model?: IOutputEventModel<T | string, ISheBadge<T>, React.MouseEvent>,
  ): void;
  onClose?(
    value: T | string,
    model?: IOutputEventModel<T | string, ISheBadge<T>, React.MouseEvent>,
  ): void;
}

export const SheBadgeDefaultModel: ISheBadge<any> = {
  id: undefined,
  className: undefined,
  style: undefined,
  elementClassName: undefined,
  elementStyle: undefined,
  color: undefined,
  textColor: undefined,
  iconColor: undefined,
  icon: undefined,
  text: undefined,
  textTransKey: undefined,
  textWrap: undefined,
  value: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  disabled: undefined,
  isLoading: undefined,
  isCircle: undefined,
  showCloseBtn: undefined,
  onClick: undefined,
  onClose: undefined,
};
