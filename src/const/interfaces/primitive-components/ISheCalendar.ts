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
  date?: string | Date;
  dateFormat?: DateFormatEnum;
  markedDates?: (string | Date)[];
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  required?: boolean;
  view?: ComponentViewEnum;
  onSelectDate?: (value: any) => void;
}
