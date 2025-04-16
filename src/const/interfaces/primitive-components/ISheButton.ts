import React, { ComponentPropsWithRef } from "react";

import { ButtonProps } from "@/components/ui/button.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheButton extends ComponentPropsWithRef<any>, ButtonProps {
  value?: string;
  valueTransKey?: string;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  color?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconPosition?: DirectionEnum;
}
