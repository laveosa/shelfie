import React from "react";
import { DayPickerProps } from "react-day-picker";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";

export interface ISheCalendar
  extends ISheLabel,
    ISheClearButton,
    DayPickerProps {
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
  dateFormat?: DateFormatEnum;
  markedDates?: (string | Date)[];
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  view?: ComponentViewEnum;
  hideFilters?: boolean;
  onSelectDate?: (value: any) => void;
}
