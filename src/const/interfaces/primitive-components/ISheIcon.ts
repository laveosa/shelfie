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
  size?: "normal" | "small";
  color?: string;
  fullWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  hoverEffect?: boolean;
}
