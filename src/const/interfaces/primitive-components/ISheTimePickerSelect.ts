import React from "react";

import { ISheSelect } from "@/const/interfaces/primitive-components/ISheSelect.ts";
import { Period } from "@/utils/helpers/time-picker-helper.ts";

export interface ISheTimePickerSelect extends ISheSelect<string> {
  ref: React.RefObject<any>;
  date: Date | undefined;
  period: Period;
  setDate: (
    date: Date | undefined,
    event: React.MouseEvent | React.KeyboardEvent,
  ) => void;
  setPeriod: (m: Period) => void;
  onRightFocus?: (value: React.KeyboardEvent) => void;
  onLeftFocus?: (value: React.KeyboardEvent) => void;
}
