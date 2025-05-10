import React from "react";

import { ISheSelect } from "@/const/interfaces/primitive-components/ISheSelect.ts";
import { Period } from "@/utils/helpers/time-picker-helper.ts";

export interface ISheTimePickerSelect extends ISheSelect {
  ref: React.RefObject<any>;
  date: Date | undefined;
  period: Period;
  setDate: (date: Date | undefined) => void;
  setPeriod: (m: Period) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}
