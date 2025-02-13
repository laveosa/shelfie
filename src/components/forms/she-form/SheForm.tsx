import { FieldValues } from "react-hook-form";
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
import React from "react";
import {
  ISheFormFieldProps,
  ISheFormProps,
} from "@/const/interfaces/forms/ISheForm.ts";

export function SheForm<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: ISheFormProps<T>) {
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
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {React.cloneElement(children as React.ReactElement, {
              ...field,
              ...props,
            })}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
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
