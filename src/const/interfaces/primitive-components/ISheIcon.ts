import React, { ComponentPropsWithRef } from "react";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

export interface ISheIcon extends ComponentPropsWithRef<"div"> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  icon?: any;
  iconView?: IconViewEnum;
  color?: string;
  fullWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  hoverEffect?: boolean;
}

export const SheIconDefaultModel: ISheIcon = {
  id: undefined,
  className: undefined,
  style: undefined,
  elementClassName: undefined,
  elementStyle: undefined,
  icon: undefined,
  iconView: undefined,
  color: undefined,
  fullWidth: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  hoverEffect: undefined,
};
