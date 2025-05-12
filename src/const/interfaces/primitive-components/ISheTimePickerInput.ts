import { ComponentPropsWithRef } from "react";

import { Period, TimePickerType } from "@/utils/helpers/time-picker-helper.ts";
import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";

export interface ISheTimePickerInput
  extends ISheInput,
    ComponentPropsWithRef<"input"> {
  picker: TimePickerType;
  date: Date | undefined;
  period?: Period;
  setDate: (date: Date | undefined) => void;
  onBlurHandler: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}
