import React from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";

export interface ISheDatePicker
  extends ISheLabel,
    ISheCalendar,
    ISheClearButton {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  calendarClassName?: string;
  calendarStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  placeholder?: string;
  placeholderTransKey?: string;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isOpen?: boolean;
  closeOnDateSelect?: boolean;
  required?: boolean;
  onOpenChange?: (value: any) => void;
}
