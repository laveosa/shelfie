import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";

export interface ISheMultiSelectItem extends ComponentPropsWithRef<any> {
  id?: string;
  key?: string;
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  value?: any;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  sideText?: string;
  sideTextTransKey?: string;
  sideDescription?: string;
  sideDescriptionTransKey?: string;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconProps?: ISheIcon;
  isSelected?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isItemsWithIcons?: boolean;
  isItemsWithColors?: boolean;
  ariaDescribedbyId?: string;
  tooltip?: ISheTooltip;
  toggleProps?: ISheToggle;
  onClick?: (value: any) => void;
}
