import React from "react";

import { ISheTooltip } from "@/const/interfaces/primitive-components/ISheTooltip.ts";

export interface ISheLabel {
  labelClassName?: string;
  labelStyle?: React.CSSProperties;
  label?: string;
  labelTransKey?: string;
  tooltip?: ISheTooltip | string;
  tooltipTransKey?: string;
  ariaDescribedbyId?: string;
  htmlFor?: string;
}

export const SheLabelDefaultModel: ISheLabel = {
  labelClassName: undefined,
  labelStyle: undefined,
  label: undefined,
  labelTransKey: undefined,
  tooltip: undefined,
  tooltipTransKey: undefined,
  ariaDescribedbyId: undefined,
  htmlFor: undefined,
};
