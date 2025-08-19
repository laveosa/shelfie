import React from "react";

import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheFormHeader {
  headerClassName?: string;
  headerStyles?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  iconProps?: ISheIcon;
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  headerPosition?: DirectionEnum;
  hideHeader?: boolean;
}

export const SheFormHeaderDefaultModel: ISheFormHeader = {
  headerClassName: undefined,
  headerStyles: undefined,
  icon: undefined,
  title: undefined,
  titleTransKey: undefined,
  text: undefined,
  textTransKey: undefined,
  description: undefined,
  descriptionTransKey: undefined,
  headerPosition: undefined,
  hideHeader: undefined,
};
