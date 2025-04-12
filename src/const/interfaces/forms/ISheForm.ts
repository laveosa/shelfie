import { FieldValues } from "react-hook-form";
import React, { ComponentPropsWithRef } from "react";

import { ISheFormHeader } from "@/const/interfaces/forms/ISheFormHeader.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheFormFooter } from "@/const/interfaces/forms/ISheFormFooter.ts";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export interface ISheForm<T extends FieldValues>
  extends ComponentPropsWithRef<any>,
    ISheFormHeader,
    ISheFormFooter {
  form?: any;
  data?: T;
  view?: ComponentViewEnum;
  disabled?: boolean;
  loading?: boolean;
  formPosition?: DirectionEnum;
  minWidth?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  onSubmit?: (data: T) => void;
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
