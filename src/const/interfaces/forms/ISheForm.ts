import { FieldValues, UseFormReturn } from "react-hook-form";
import React, { ComponentPropsWithRef } from "react";
import { z } from "zod";

import { IZodSchema } from "@/const/interfaces/IZodSchema.ts";
import { ISheFormHeader } from "@/const/interfaces/forms/ISheFormHeader.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import { ISheFormFooter } from "@/const/interfaces/forms/ISheFormFooter.ts";

export interface ISheFormProps<T extends FieldValues>
  extends ComponentPropsWithRef<any>,
    ISheFormHeader,
    ISheFormFooter {
  form: UseFormReturn<z.output<z.ZodObject<IZodSchema<T>>>>;
  view?: ComponentViewEnum;
  disabled?: boolean;
  loading?: boolean;
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
