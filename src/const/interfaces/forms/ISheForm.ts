import { FieldValues, UseFormReturn } from "react-hook-form";
import React, { ComponentPropsWithRef } from "react";
import { z } from "zod";

import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";

export interface ISheFormProps<T extends FieldValues>
  extends ComponentPropsWithRef<any> {
  form: UseFormReturn<z.output<z.ZodObject<IZodSchema<T>>>>;
  title?: string;
  text?: string;
  description?: string;
  notDisabled?: boolean;
  headerPosition?: ["left", "center", "right"];
  onSubmit?: (data: T) => void;
  onError?: (data: T) => void;
  onCancel?: (data: T) => void;
}

//TODO remove this interface when SheForm component will be completed
export interface ISheFormFieldProps {
  name: string;
  label?: string;
  rules?: object;
  children: React.ReactNode;
  description?: string;
}
