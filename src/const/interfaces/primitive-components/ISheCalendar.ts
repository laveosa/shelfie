import React, { ComponentPropsWithRef } from "react";

import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { IDateRange } from "@/const/interfaces/IDateRange.ts";
import { CalendarModeEnum } from "@/const/enums/CalendarModeEnum.ts";

export interface ISheCalendar
  extends Omit<
      IShePrimitiveComponentWrapper,
      | "clearBtnValue"
      | "clearBtnPosition"
      | "iconPosition"
      | "minWidth"
      | "maxWidth"
      | "fullWidth"
    >,
    ComponentPropsWithRef<any> {
  calendarClassName?: string;
  calendarStyle?: React.CSSProperties;
  date?: string | Date | (Date | string)[] | IDateRange;
  time?: Date;
  timePicker?: ISheTimePicker;
  dateFormat?: DateFormatEnum;
  markedDates?: (string | Date)[];
  mode?: CalendarModeEnum;
  minAmountOfDates?: number;
  maxAmountOfDates?: number;
  disabled?: boolean;
  isLoading?: boolean;
  hideFilters?: boolean;
  hideTimePicker?: boolean;
  onSelectDate?(
    value: any,
    model?: IOutputEventModel<any, ISheCalendar, React.MouseEvent>,
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
