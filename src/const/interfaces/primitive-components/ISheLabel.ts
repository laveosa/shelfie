import React from "react";

import { ISheTooltip } from "@/const/interfaces/complex-components/ISheTooltip.ts";

export interface ISheLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  labelTransKey?: string;
  tooltip?: ISheTooltip;
  ariaDescribedbyId?: string;
}
