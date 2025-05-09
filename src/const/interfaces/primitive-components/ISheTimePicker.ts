import React, { ComponentPropsWithRef } from "react";

import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";

export interface ISheTimePicker
  extends ISheLabel,
    ISheClearButton,
    ComponentPropsWithRef<"div"> {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  inputClassName?: string;
  inputStyle?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  size?: "normal" | "small";
  view?: ComponentViewEnum;
  hhLabel?: string;
  hhLabelTransKey?: string;
  mmLabel?: string;
  mmLabelTransKey?: string;
  ssLabel?: string;
  ssLabelTransKey?: string;
  date?: Date | undefined;
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  delayTime?: number;
  hideInputLabels?: boolean;
  hoursRef?: React.RefObject<HTMLInputElement>;
  minutesRef?: React.RefObject<HTMLInputElement>;
  secondsRef?: React.RefObject<HTMLInputElement>;
  onSetDate?: (value: any) => void;
  onDelay?: (value: any) => void;
}
