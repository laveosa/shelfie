import React, { ComponentPropsWithRef } from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ButtonProps } from "@/components/ui/button.tsx";

type NativeButtonProps = Omit<ButtonProps, "size">;

export interface ISheButton
  extends NativeButtonProps,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconPosition?: DirectionEnum;
  twistIcon?: boolean;
  value?: string | number;
  valueTransKey?: string;
  valueWrap?: boolean;
  size?: "normal" | "small";
  view?: "viewNormal" | "viewCircle";
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  minHeight?: string;
  maxHeight?: string;
  txtColor?: string;
  bgColor?: string;
}
