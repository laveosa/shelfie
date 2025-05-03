import React from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { DayPickerProps } from "react-day-picker";

export interface ISheDatePicker
  extends ISheLabel,
    ISheClearButton,
    DayPickerProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  calendarClassName?: string;
  calendarStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  date?: string | Date;
  formatPattern?: string;
  placeholder?: string;
  placeholderTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  required?: boolean;
  onOpenChange?: (value: any) => void;
  onSelectDate?: (value: any) => void;
}
