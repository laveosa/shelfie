import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";
import { ISheToggle } from "@/const/interfaces/primitive-components/ISheToggle.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { ISelectable } from "@/const/interfaces/primitive-components/ISelecteble.ts";

export interface ISheOption<T>
  extends ISelectable<T>,
    Omit<ComponentPropsWithRef<"div">, "onClick"> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  toggleClassName?: string;
  toggleStyle?: React.CSSProperties;
  iconClassName?: string;
  iconStyle?: React.CSSProperties;
  colorsClassName?: string;
  colorsStyle?: React.CSSProperties;
  infoClassName?: string;
  infoStyle?: React.CSSProperties;
  tooltipClassName?: string;
  tooltipStyle?: React.CSSProperties;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  ariaDescribedbyId?: string;
  mode?: "single" | "multiple" | "plain";
  view?: "normal" | "card";
  showIconsColumn?: boolean;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconProps?: ISheIcon;
  showColorsColumn?: boolean;
  colors?: string[];
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  sideText?: string;
  sideTextTransKey?: string;
  sideDescription?: string;
  sideDescriptionTransKey?: string;
  tooltip?: ISheTooltip;
  toggleProps?: ISheToggle;
  checkOnClick?: boolean;
  onCheck?(
    data: IOutputEventModel<
      T,
      ISheOption<T>,
      React.MouseEvent | React.KeyboardEvent
    >,
  ): void;
  onClick?(
    data: IOutputEventModel<
      T,
      ISheOption<T>,
      React.MouseEvent | React.KeyboardEvent
    >,
  ): void;
}

export const SheOptionDefaultModel: ISheOption<any> = {
  id: undefined,
  className: undefined,
  style: undefined,
  toggleClassName: undefined,
  toggleStyle: undefined,
  iconClassName: undefined,
  iconStyle: undefined,
  colorsClassName: undefined,
  colorsStyle: undefined,
  infoClassName: undefined,
  infoStyle: undefined,
  tooltipClassName: undefined,
  tooltipStyle: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  disabled: undefined,
  isLoading: undefined,
  ariaDescribedbyId: undefined,
  mode: undefined,
  view: undefined,
  value: undefined,
  showIconsColumn: undefined,
  icon: undefined,
  iconProps: undefined,
  showColorsColumn: undefined,
  colors: undefined,
  text: undefined,
  textTransKey: undefined,
  description: undefined,
  descriptionTransKey: undefined,
  sideText: undefined,
  sideTextTransKey: undefined,
  sideDescription: undefined,
  sideDescriptionTransKey: undefined,
  isSelected: undefined,
  tooltip: undefined,
  toggleProps: undefined,
  checkOnClick: undefined,
  onCheck: undefined,
  onClick: undefined,
};
