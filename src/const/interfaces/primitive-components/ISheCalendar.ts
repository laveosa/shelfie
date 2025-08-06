import React, { ComponentPropsWithRef } from "react";

import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

export interface ISheCalendar
  extends IShePrimitiveComponentWrapper,
    ComponentPropsWithRef<any> {
  calendarClassName?: string;
  calendarStyle?: React.CSSProperties;
  date?:
    | string
    | string[]
    | Date
    | Date[]
    | (Date | string)[]
    | { from: Date; to: Date }
    | { from: string; to: string }
    | { from: Date | string; to: Date | string };
  time?: Date;
  timePicker?: ISheTimePicker;
  dateFormat?: DateFormatEnum;
  markedDates?: (string | Date)[];
  mode?: "default" | "range" | "single" | "multiple";
  minAmountOfDates?: number;
  maxAmountOfDates?: number;
  disabled?: boolean;
  isLoading?: boolean;
  hideFilters?: boolean;
  hideTimePicker?: boolean;
  onSelectDate?(
    value: any,
    model?:
      | IOutputEventModel<any, ISheCalendar, React.MouseEvent>
      | React.KeyboardEvent,
  ): void;
}

export const SheCalendarDefaultModel: ISheCalendar = {
  calendarClassName: undefined,
  calendarStyle: undefined,
  date: undefined,
  time: undefined,
  timePicker: undefined,
  dateFormat: undefined,
  markedDates: undefined,
  mode: undefined,
  minAmountOfDates: undefined,
  maxAmountOfDates: undefined,
  disabled: undefined,
  isLoading: undefined,
  hideFilters: undefined,
  hideTimePicker: undefined,
  onSelectDate: undefined,
};
