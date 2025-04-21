import React, { ComponentPropsWithRef } from "react";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheToggle extends ComponentPropsWithRef<"div"> {
  checked?: boolean;
  label?: string;
  labelTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  type?: SheToggleTypeEnum;
  view?: ComponentViewEnum;
  tooltip?: ISheTooltip;
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChecked?: (value: boolean) => void;
}
