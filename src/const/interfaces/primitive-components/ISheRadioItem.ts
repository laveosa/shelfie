import React, { ComponentPropsWithRef } from "react";

import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export interface ISheRadioItem<T> extends ComponentPropsWithRef<any> {
  key?: any;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  elementClassName?: string;
  elementStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value: T;
  text: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  disabled?: boolean;
  isLoading?: boolean;
  ariaDescribedbyId?: string;
  tooltip?: ISheTooltip;
  view?: ComponentViewEnum;
}
