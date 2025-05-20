import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";

export interface ISheCalendar
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<any> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
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
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  view?: ComponentViewEnum;
  hideFilters?: boolean;
  hideTimePicker?: boolean;
  onSelectDate?: (value: any) => void;
}
