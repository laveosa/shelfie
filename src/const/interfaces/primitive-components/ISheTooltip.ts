import React, { ComponentPropsWithRef } from "react";
import { ALIGN_OPTIONS, SIDE_OPTIONS } from "@radix-ui/react-popper";

import { SheTooltipEnum } from "@/const/enums/SheTooltipEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";

export interface ISheTooltip extends ComponentPropsWithRef<any> {
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  title?: string;
  titleTransKey?: string;
  text?: string;
  textTransKey?: string;
  description?: string;
  descriptionTransKey?: string;
  side?: (typeof SIDE_OPTIONS)[number];
  align?: (typeof ALIGN_OPTIONS)[number];
  view?: SheTooltipEnum;
  delayDuration?: any;
  ariaDescribedbyId?: string;
  showDefaultIcon?: boolean;
  onClick?: (value: any) => any;
}
