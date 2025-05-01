import React from "react";

import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheLabel {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  labelTransKey?: string;
  tooltip?: ISheTooltip | string;
  ariaDescribedbyId?: string;
}
