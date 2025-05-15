import React, { ComponentPropsWithRef } from "react";

import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheLabel extends ComponentPropsWithRef<any> {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  labelTransKey?: string;
  tooltip?: ISheTooltip;
  htmlFor?: string;
  ariaDescribedbyId?: string;
}
