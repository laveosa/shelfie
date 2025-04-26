import React, { ComponentPropsWithRef } from "react";

import { ButtonProps } from "@/components/ui/button.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheButton extends ComponentPropsWithRef<any>, ButtonProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconPosition?: DirectionEnum;
  value?: string | number;
  valueTransKey?: string;
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
