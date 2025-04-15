import { ComponentPropsWithRef } from "react";

import { ButtonProps } from "@/components/ui/button.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheButton extends ButtonProps, ComponentPropsWithRef<"div"> {
  value?: string;
  valueTransKey?: string;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  icon?: ISheIcon;
  iconPosition?: DirectionEnum;
}
