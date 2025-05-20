import React from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";

export interface ISheSelectItem {
  key?: any;
  id?: string; // reserved PRIVATE property, "DON'T USE" this property
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value: any;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  sideText?: string;
  sideTextTransKey?: string;
  sideDescription?: string;
  sideDescriptionTransKey?: string;
  colors?: string[];
  disabled?: boolean;
  isLoading?: boolean;
  showSelectIcon?: boolean;
  isItemsWithIcons?: boolean;
  isItemsWithColors?: boolean;
  ariaDescribedbyId?: string;
  tooltip?: ISheTooltip;
}
