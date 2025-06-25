import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";

export interface ISheOption<T> extends ComponentPropsWithRef<"div"> {
  id?: string;
  key?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  isLoading?: boolean;
  ariaDescribedbyId?: string;
  mode?: "single" | "multiple" | "plain";
  view?: "normal" | "card";
  value?: T;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconProps?: ISheIcon;
  colors?: string[];
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  sideText?: string;
  sideTextTransKey?: string;
  sideDescription?: string;
  sideDescriptionTransKey?: string;
  isSelected?: boolean;
  showIconsColumn?: boolean;
  showColorsColumn?: boolean;
  tooltip?: ISheTooltip;
  toggleProps?: ISheToggle;
  onCheck?(data: T, event?: React.MouseEvent): void;
  onClick?(data: T, event?: React.MouseEvent): void;
}
