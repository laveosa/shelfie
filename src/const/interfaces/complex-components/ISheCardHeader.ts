import React from "react";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheCardHeader {
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  view?: ComponentViewEnum;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  isMinimized?: boolean;
  isLoading?: boolean;
  showHeader?: boolean;
  showToggleButton?: boolean;
  showCloseButton?: boolean;
  onHeaderToggleClick?(value?: any): void;
  onHeaderCloseClick?(value?: any): void;
}

export const SheCardHeaderDefaultModel: ISheCardHeader = {
  headerClassName: undefined,
  headerStyle: undefined,
  view: undefined,
  icon: undefined,
  title: undefined,
  titleTransKey: undefined,
  text: undefined,
  textTransKey: undefined,
  description: undefined,
  descriptionTransKey: undefined,
  isLoading: undefined,
  showHeader: undefined,
  showToggleButton: undefined,
  showCloseButton: undefined,
  onHeaderToggleClick: undefined,
  onHeaderCloseClick: undefined,
};
