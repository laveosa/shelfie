import React from "react";
import { FieldErrors } from "react-hook-form";

import cs from "./SheForm.module.scss";
import { Form } from "@/components/ui/form.tsx";
import { ISheFormProps } from "@/const/interfaces/forms/ISheForm.ts";
import SheFormHeader from "@/components/complex/she-form/components/she-form-header/SheFormHeader.tsx";
import SheFormFooter from "@/components/complex/she-form/components/she-form-footer/SheFormFooter.tsx";

export default function SheForm<T>({
  className,
  children,
  form,
  view,
  disabled,
  loading,
  headerPosition,
  footerPosition,
  onSubmit,
  onError,
  onCancel,
  ...props
}: ISheFormProps<T>): React.ReactNode {
  // ==================================================================== LOGIC

  function onSubmitHandler(data: T) {
    if (onSubmit) onSubmit(data);
  }

  function onErrorHandler(data: FieldErrors<T>) {
    if (onError) onError(data);
    console.error("Form error: ", data);
  }

  function onCancelHandler() {
    form.reset(
      { ...form.control._defaultValues },
      { keepErrors: false, keepDirty: false },
    );
    setTimeout(() => form.clearErrors(), 0);
    if (onCancel) onCancel(form.control._defaultValues);
  }

  // ==================================================================== PRIVATE

  return (
    <div
      className={`${className || ""} ${cs.sheForm} ${cs[view] || ""} ${disabled || loading ? "disabled" : ""}`}
    >
      <Form {...form}>
        <SheFormHeader {...props} headerPosition={headerPosition} />
        <form onSubmit={form.handleSubmit(onSubmitHandler, onErrorHandler)}>
          <div className={cs.sheFormContent}>{children}</div>
          <SheFormFooter
            {...props}
            footerPosition={footerPosition}
            isValid={form.formState.isValid}
            loading={loading}
            onSecondary={onCancelHandler}
          />
        </form>
      </Form>
    </div>
  );
}
