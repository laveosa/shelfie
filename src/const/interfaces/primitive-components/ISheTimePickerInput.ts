import { Period, TimePickerType } from "@/utils/helpers/time-picker-helper.ts";
import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import React from "react";

export interface ISheTimePickerInput extends ISheInput {
  picker: TimePickerType;
  date: Date | undefined;
  period?: Period;
  setDate: (
    date: Date | undefined,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  onBlurHandler: (
    date: Date | undefined,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}
