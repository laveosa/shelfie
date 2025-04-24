import React, { ComponentPropsWithRef } from "react";

import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheLabel extends ComponentPropsWithRef<"label"> {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  labelTransKey?: string;
  tooltip?: ISheTooltip;
  ariaDescribedbyId?: string;
}
