import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";
import { Period } from "@/utils/helpers/time-picker-helper.ts";
import { SheTimePickerTypeEnum } from "@/const/enums/SheTimePickerTypeEnum.ts";
import { ISheErrorMessageBlock } from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";

export interface ISheTimePicker
  extends ISheLabel,
    ISheClearButton,
    ISheErrorMessageBlock,
    ComponentPropsWithRef<"div"> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  selectClassName?: string;
  selectStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  size?: "normal" | "small";
  view?: ComponentViewEnum;
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
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  delayTime?: number;
  hideInputLabels?: boolean;
  hideSeconds?: boolean;
  hoursRef?: React.RefObject<HTMLInputElement>;
  minutesRef?: React.RefObject<HTMLInputElement>;
  secondsRef?: React.RefObject<HTMLInputElement>;
  periodsRef?: React.RefObject<HTMLButtonElement>;
  autoFocus?: boolean;
  onSetDate?: (value: any) => void;
  onDelay?: (value: any) => void;
  onBlur?: (value: any) => void;
  onTick?: (value: any) => void;
  onIsValid?: (value: boolean) => void;
}
