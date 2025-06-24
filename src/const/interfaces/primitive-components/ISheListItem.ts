import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";

export interface ISheListItem<T> extends ComponentPropsWithRef<any> {
  id?: string;
  key?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconProps?: ISheIcon;
  colors?: string[];
  value?: T;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  sideText?: string;
  sideTextTransKey?: string;
  sideDescription?: string;
  sideDescriptionTransKey?: string;
  isSelected?: boolean;
  isDnd?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isItemsWithIcons?: boolean;
  isItemsWithColors?: boolean;
  tooltip?: ISheTooltip;
  toggleProps?: ISheToggle;
  ariaDescribedbyId?: string;
  mode?: "single" | "multi" | "default";
  view?: "normal" | "card";
  onClick?: (data: T) => void;
  onSelect?: (data: T) => void;
}

export const SheListItemDefaultModel: ISheListItem<any> = {
  id: undefined,
  key: undefined,
  className: undefined,
  style: undefined,
  colors: undefined,
  value: undefined,
  text: undefined,
  textTransKey: undefined,
  description: undefined,
  descriptionTransKey: undefined,
  sideText: undefined,
  sideTextTransKey: undefined,
  sideDescription: undefined,
  sideDescriptionTransKey: undefined,
  icon: undefined,
  iconProps: undefined,
  isSelected: undefined,
  isDnd: undefined,
  disabled: undefined,
  isLoading: undefined,
  isItemsWithIcons: undefined,
  isItemsWithColors: undefined,
  tooltip: undefined,
  toggleProps: undefined,
  ariaDescribedbyId: undefined,
  mode: undefined,
  view: undefined,
  onClick: undefined,
  onSelect: undefined,
};
