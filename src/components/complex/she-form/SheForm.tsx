import React from "react";

import cs from "./SheForm.module.scss";
import { Form } from "@/components/ui/form.tsx";
import { ISheForm } from "@/const/interfaces/forms/ISheForm.ts";
import SheFormHeader from "@/components/complex/she-form/components/she-form-header/SheFormHeader.tsx";
import SheFormFooter from "@/components/complex/she-form/components/she-form-footer/SheFormFooter.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";

export default function SheForm<T>({
  className,
  children,
  form,
  view,
  disabled,
  loading,
  formPosition = DirectionEnum.LEFT,
  minWidth,
  maxWidth,
  fullWidth,
  onSubmit,
  onError,
  onCancel,
  ...props
}: ISheForm<T>): React.ReactNode {
  // ==================================================================== LOGIC

  function onSubmitHandler(data: T) {
    if (onSubmit) onSubmit(data);
  }

  function onErrorHandler(data: any) {
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
      className={`${className || ""} ${cs.sheForm} ${cs[view] || ""} ${disabled || loading ? "disabled" : ""} ${cs[formPosition] || ""} ${fullWidth ? cs.fullWidth : ""}`}
      style={{
        minWidth,
        maxWidth,
      }}
    >
      <Form {...form}>
        <SheFormHeader {...props} />
        <form onSubmit={form.handleSubmit(onSubmitHandler, onErrorHandler)}>
          <div className={cs.sheFormContent}>{children}</div>
          <SheFormFooter
            {...props}
            isValid={form.formState.isValid}
            loading={loading}
            onSecondary={onCancelHandler}
          />
        </form>
      </Form>
    </div>
  );
}
