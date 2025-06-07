import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { BadgeProps } from "@/components/ui/badge.tsx";

export interface ISheBadge extends BadgeProps, ComponentPropsWithRef<any> {
  key?: any;
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
  value?: any;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isCircle?: boolean;
  showCloseBtn?: boolean;
  onClick?: (value: any) => void;
  onClose?: (value?: any) => void;
}
