import React, { ComponentPropsWithRef } from "react";

import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";
import { SheTimePickerTypeEnum } from "@/const/enums/SheTimePickerTypeEnum.ts";
import { Period } from "@/utils/helpers/time-picker-helper.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheTimePicker
  extends Omit<
      IShePrimitiveComponentWrapper,
      "iconPosition" | "clearBtnPosition" | "clearBtnValue"
    >,
    ComponentPropsWithRef<"div"> {
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  selectClassName?: string;
  selectStyle?: React.CSSProperties;
  size?: "normal" | "small";
  type?: SheTimePickerTypeEnum;
  hhLabel?: string;
  hhLabelTransKey?: string;
  mmLabel?: string;
  mmLabelTransKey?: string;
  ssLabel?: string;
  ssLabelTransKey?: string;
  periodLabel?: string;
  periodLabelTransKey?: string;
  date?: Date | undefined;
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  timeFormat?: TimeFormatEnum;
  timePeriod?: Period;
  clockWorksheets?: "12" | "24";
  isValid?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  delayTime?: number;
  hideInputLabels?: boolean;
  hideSeconds?: boolean;
  hoursRef?: React.RefObject<HTMLInputElement>;
  minutesRef?: React.RefObject<HTMLInputElement>;
  secondsRef?: React.RefObject<HTMLInputElement>;
  periodsRef?: React.RefObject<HTMLButtonElement>;
  autoFocus?: boolean;
  onSetDate?(
    value: any,
    model?:
      | IOutputEventModel<any, ISheTimePicker, React.MouseEvent>
      | React.KeyboardEvent,
  ): void;
  onDelay?(
    value: any,
    model?:
      | IOutputEventModel<any, ISheTimePicker, React.MouseEvent>
      | React.KeyboardEvent,
  ): void;
  onBlur?(
    value: any,
    model?:
      | IOutputEventModel<any, ISheTimePicker, React.MouseEvent>
      | React.KeyboardEvent,
  ): void;
  onTick?(
    value: any,
    model?:
      | IOutputEventModel<any, ISheTimePicker, React.MouseEvent>
      | React.KeyboardEvent,
  ): void;
  onIsValid?(value: boolean): void;
}

export const SheTimePickerDefaultModel: ISheTimePicker = {
  inputClassName: undefined,
  inputStyle: undefined,
  selectClassName: undefined,
  selectStyle: undefined,
  size: undefined,
  type: undefined,
  hhLabel: undefined,
  hhLabelTransKey: undefined,
  mmLabel: undefined,
  mmLabelTransKey: undefined,
  ssLabel: undefined,
  ssLabelTransKey: undefined,
  periodLabel: undefined,
  periodLabelTransKey: undefined,
  date: undefined,
  startDate: undefined,
  endDate: undefined,
  timeFormat: undefined,
  timePeriod: undefined,
  clockWorksheets: undefined,
  isValid: undefined,
  disabled: undefined,
  isLoading: undefined,
  delayTime: undefined,
  hideInputLabels: undefined,
  hideSeconds: undefined,
  hoursRef: undefined,
  minutesRef: undefined,
  secondsRef: undefined,
  periodsRef: undefined,
  autoFocus: undefined,
  onSetDate: undefined,
  onDelay: undefined,
  onBlur: undefined,
  onTick: undefined,
  onIsValid: undefined,
};
