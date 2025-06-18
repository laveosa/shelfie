import React, { ComponentPropsWithRef, InputHTMLAttributes } from "react";

import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";
import { ISheIcon } from "@/const/interfaces/primitive-components/ISheIcon.ts";
import { ISheLabel } from "@/const/interfaces/primitive-components/ISheLabel.ts";
import { ISheClearButton } from "@/const/interfaces/primitive-components/ISheClearButton.ts";
import { ISheContextLengthLimits } from "@/const/interfaces/primitive-components/ISheContextLengthLimits.ts";
import { ISheErrorMessageBlock } from "@/const/interfaces/primitive-components/ISheErrorMessageBlock.ts";

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onBlur" | "size"
>;

export interface ISheInput
  extends ISheLabel,
    ISheClearButton,
    ISheContextLengthLimits,
    ISheErrorMessageBlock,
    NativeInputProps,
    ComponentPropsWithRef<any> {
  ref?: React.RefObject<HTMLInputElement>;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  icon?: Partial<ISheIcon> | string | React.FC<any>;
  value?: string | number | readonly string[];
  placeholder?: string;
  placeholderTransKey?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "tel"
    | "url"
    | "search"
    | "number"
    | "range"
    | "date"
    | "datetime-local"
    | "month"
    | "week"
    | "time"
    | "checkbox"
    | "radio"
    | "button"
    | "submit"
    | "reset"
    | "file"
    | "image"
    | "hidden"
    | "color";
  step?: number;
  size?: "normal" | "small";
  autoFocus?: boolean;
  isSearch?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isValid?: boolean;
  ignoreValidation?: boolean;
  pattern?: ContextPatternEnum | any;
  patternErrorMessage?: string;
  patternErrorMessageTransKey?: string;
  delayTime?: number;
  onIsValid?: (value: boolean) => void;
  onChange?: (value: string | number | readonly string[]) => void;
  onBlur?: (value: string | number | readonly string[]) => void;
  onDelay?: (value: string | number | readonly string[]) => void;
  onClear?: (value: null) => void;
}

export const SheInputDefaultModel: ISheInput = {
  ref: undefined,
  id: undefined,
  className: undefined,
  style: undefined,
  label: undefined,
  labelTransKey: undefined,
  icon: undefined,
  value: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  type: undefined,
  step: undefined,
  size: undefined,
  autoFocus: undefined,
  isSearch: undefined,
  showClearBtn: undefined,
  tooltip: undefined,
  disabled: undefined,
  isLoading: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  required: undefined,
  minLength: undefined,
  maxLength: undefined,
  isValid: undefined,
  ignoreValidation: undefined,
  showError: undefined,
  pattern: undefined,
  patternErrorMessage: undefined,
  patternErrorMessageTransKey: undefined,
  delayTime: undefined,
  children: undefined,
  onIsValid: undefined,
  onChange: undefined,
  onBlur: undefined,
  onDelay: undefined,
  onClear: undefined,
};
