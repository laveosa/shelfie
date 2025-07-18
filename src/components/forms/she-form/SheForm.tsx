import { FieldValues } from "react-hook-form";
import React from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  ISheForm,
  ISheFormFieldProps,
} from "@/const/interfaces/forms/ISheForm.ts";
import InfoIcon from "@/assets/icons/Info-icon.svg?react";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import cs from "./SheForm.module.scss";

export function SheForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: ISheForm<T>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  );
}

export function SheFormField({
  name,
  label,
  rules,
  children,
  description,
  ...props
}: ISheFormFieldProps) {
  return (
    <FormField
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {React.cloneElement(children as any, {
              ...field,
              ...props,
              className: [
                (children as any).props.className,
                fieldState.error ? cs.formItemError : "",
              ]
                .filter(Boolean)
                .join(" "),
            })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {fieldState.error && (
            <div className={cs.customErrorMessage}>
              <SheIcon className={cs.customErrorMessageIcon} icon={InfoIcon} />
              <FormMessage className={cs.customErrorMessageText} />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}

export function SheFormSubmit({ children }: { children: React.ReactNode }) {
  return <Button type="submit">{children}</Button>;
}

SheForm.Field = SheFormField;
SheForm.Submit = SheFormSubmit;
