import React from "react";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { SheToggleTypeEnum } from "@/const/enums/SheToggleTypeEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";

export interface ISheToggle extends ISheLabel {
  checked?: boolean;
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
  isLoading?: boolean;
  disabled?: boolean;
  required?: boolean;
  onChecked?(value: boolean, event?: React.MouseEvent): void;
}
