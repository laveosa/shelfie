import { ComponentPropsWithRef, InputHTMLAttributes } from "react";

import { ContextPatternEnum } from "@/const/enums/ContextPatternEnum.ts";
import { IShePrimitiveComponentWrapper } from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

type NativeInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "onBlur" | "size"
>;

export interface ISheInput
  extends IShePrimitiveComponentWrapper,
    NativeInputProps,
    ComponentPropsWithRef<any> {
  ref?: any;
  value?: string | number;
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
  autoFocus?: boolean;
  isSearch?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
  ignoreValidation?: boolean;
  showError?: boolean;
  pattern?: ContextPatternEnum | any;
  patternErrorMessage?: string;
  patternErrorMessageTransKey?: string;
  delayTime?: number;
  onIsValid?: (value: boolean) => void;
  onChange?: (value: string | number) => void;
  onBlur?: (value: string | number) => void;
  onDelay?: (value: string | number) => void;
  onClear?: (value: null) => void;
}

export const SheInputDefaultModel: ISheInput = {
  ref: undefined,
  value: undefined,
  placeholder: undefined,
  placeholderTransKey: undefined,
  type: undefined,
  step: undefined,
  autoFocus: undefined,
  isSearch: undefined,
  disabled: undefined,
  isLoading: undefined,
  isValid: undefined,
  ignoreValidation: undefined,
  showError: undefined,
  pattern: undefined,
  patternErrorMessage: undefined,
  patternErrorMessageTransKey: undefined,
  delayTime: undefined,
  onIsValid: undefined,
  onChange: undefined,
  onBlur: undefined,
  onDelay: undefined,
  onClear: undefined,
};
