import { FieldValues, UseFormReturn } from "react-hook-form";
import React, { ComponentPropsWithRef } from "react";

export interface ISheFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
  className?: string;
}

export interface ISheFormFieldProps extends ComponentPropsWithRef<any> {
  name: string;
  label?: string;
  rules?: object;
  children: React.ReactNode;
  description?: string;
  onDelay?: (event) => void;
}
