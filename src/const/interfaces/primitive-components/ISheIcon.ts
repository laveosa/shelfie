import { ComponentPropsWithRef } from "react";
import { IconViewEnum } from "@/const/enums/IconViewEnum.ts";

export interface ISheIcon extends ComponentPropsWithRef<"div"> {
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
