import React from "react";

import cs from "./SheForm.module.scss";
import { Form } from "@/components/ui/form.tsx";
import { ISheForm } from "@/const/interfaces/forms/ISheForm.ts";
import SheFormHeader from "@/components/complex/she-form/components/she-form-header/SheFormHeader.tsx";
import SheFormFooter from "@/components/complex/she-form/components/she-form-footer/SheFormFooter.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { FormSecondaryBtnBehaviorEnum } from "@/const/enums/FormSecondaryBtnBehaviorEnum.ts";

export default function SheForm<T>({
  className,
  children,
  form,
  defaultValues,
  view,
  secondaryBtnBehavior = FormSecondaryBtnBehaviorEnum.CLEAR,
  disabled,
  isLoading,
  formPosition = DirectionEnum.LEFT,
  minWidth,
  maxWidth,
  fullWidth,
  onSubmit,
  onEnter,
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

  function onSecondaryHandler() {
    const model =
      secondaryBtnBehavior === FormSecondaryBtnBehaviorEnum.RESET
        ? form.control._defaultValues
        : defaultValues;
    form.reset({ ...model }, { keepErrors: false, keepDirty: false });
    setTimeout(() => form.clearErrors(), 0);
    if (onCancel) onCancel(form.control._defaultValues);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <div
      className={`${className || ""} ${cs.sheForm} ${cs[view] || ""} ${disabled || isLoading ? "disabled" : ""} ${cs[formPosition] || ""} ${fullWidth ? cs.fullWidth : ""}`}
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
            isLoading={isLoading}
            onSecondary={onSecondaryHandler}
          />
        </form>
      </Form>
    </div>
  );
}
