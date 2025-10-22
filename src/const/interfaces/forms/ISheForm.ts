import React, { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";

import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { FormSecondaryBtnBehaviorEnum } from "@/const/enums/FormSecondaryBtnBehaviorEnum.ts";
import {
  ISheFormFooter,
  SheFormFooterDefaultModel,
} from "@/const/interfaces/forms/ISheFormFooter.ts";
import {
  ISheFormHeader,
  SheFormHeaderDefaultModel,
} from "@/const/interfaces/forms/ISheFormHeader.ts";
import { AppFormType } from "@/const/types/AppFormType.ts";

export interface ISheForm<T> extends ISheFormHeader, ISheFormFooter {
  ref?: RefObject<HTMLFormElement>;
  id?: string;
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  form: UseFormReturn<AppFormType<T>>;
  defaultValues?: any;
  view?: ComponentViewEnum;
  secondaryBtnBehavior?: FormSecondaryBtnBehaviorEnum;
  disabled?: boolean;
  isLoading?: boolean;
  formPosition?: DirectionEnum;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  onSubmit?(value: T): void;
  onChange?(value: T, form?: UseFormReturn<AppFormType<T>>): void;
  onError?(value: any): void;
  onCancel?(value: T): void;
}

export const SheFormDefaultModel: ISheForm<any> = {
  ...SheFormHeaderDefaultModel,
  ...SheFormFooterDefaultModel,
  className: undefined,
  style: undefined,
  children: undefined,
  form: undefined,
  defaultValues: undefined,
  view: undefined,
  secondaryBtnBehavior: undefined,
  disabled: undefined,
  isLoading: undefined,
  formPosition: undefined,
  minWidth: undefined,
  maxWidth: undefined,
  fullWidth: undefined,
  onSubmit: undefined,
  onChange: undefined,
  onError: undefined,
  onCancel: undefined,
};
