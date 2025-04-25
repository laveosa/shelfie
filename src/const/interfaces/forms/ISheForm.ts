import React, { ComponentPropsWithRef } from "react";

import { ISheFormHeader } from "@/const/interfaces/forms/ISheFormHeader.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheFormFooter } from "@/const/interfaces/forms/ISheFormFooter.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { FormSecondaryBtnBehaviorEnum } from "@/const/enums/FormSecondaryBtnBehaviorEnum.ts";

export interface ISheForm<T>
  extends ComponentPropsWithRef<any>,
    ISheFormHeader,
    ISheFormFooter {
  form: any;
  data?: T;
  defaultValues?: any;
  view?: ComponentViewEnum;
  secondaryBtnBehavior?: FormSecondaryBtnBehaviorEnum;
  disabled?: boolean;
  isLoading?: boolean;
  formPosition?: DirectionEnum;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  onSubmit?: (data: T) => void;
  onEnter?: (data: T) => void;
  onError?: (data: T) => void;
  onCancel?: (data: T) => void;
}

//TODO remove this interface when SheForm component will be completed
export interface ISheFormFieldProps extends ComponentPropsWithRef<any> {
  name: string;
  label?: string;
  rules?: object;
  children: React.ReactNode;
  description?: string;
  onDelay?: (event) => void;
}
