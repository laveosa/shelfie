import React, { JSX, useEffect } from "react";
import { useWatch } from "react-hook-form";

import cs from "./SheForm.module.scss";
import SheFormHeader from "@/components/complex/she-form/components/she-form-header/SheFormHeader.tsx";
import SheFormFooter from "@/components/complex/she-form/components/she-form-footer/SheFormFooter.tsx";
import { Form } from "@/components/ui/form.tsx";
import { SheFormContextProvider } from "@/state/providers/she-form-context-provider.tsx";
import { DirectionEnum } from "@/const/enums/DirectionEnum.ts";
import { FormSecondaryBtnBehaviorEnum } from "@/const/enums/FormSecondaryBtnBehaviorEnum.ts";
import { ComponentViewEnum } from "@/const/enums/ComponentViewEnum.ts";
import {
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import {
  ISheForm,
  SheFormDefaultModel,
} from "@/const/interfaces/forms/ISheForm.ts";
import {
  ISheFormHeader,
  SheFormHeaderDefaultModel,
} from "@/const/interfaces/forms/ISheFormHeader.ts";
import {
  ISheFormFooter,
  SheFormFooterDefaultModel,
} from "@/const/interfaces/forms/ISheFormFooter.ts";

export default function SheForm<T>(props: ISheForm<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
    className = "",
    contentClassName = "",
    style,
    children,
    form,
    defaultValues,
    view = ComponentViewEnum.STANDARD,
    secondaryBtnBehavior = FormSecondaryBtnBehaviorEnum.CLEAR,
    disabled,
    isLoading,
    formPosition = DirectionEnum.LEFT,
    minWidth,
    maxWidth,
    fullWidth,
    onSubmit,
    onChange,
    onError,
    onCancel,
  } = props;
  const sheHeaderProps = getCustomProps<ISheForm<T>, ISheFormHeader>(
    props,
    SheFormHeaderDefaultModel,
  );
  const sheFooterProps = getCustomProps<ISheForm<T>, ISheFormFooter>(
    props,
    SheFormFooterDefaultModel,
  );
  const restProps = removeCustomProps<ISheForm<T>>(props, [
    SheFormDefaultModel,
    SheFormHeaderDefaultModel,
    SheFormFooterDefaultModel,
  ]);

  // ==================================================================== UTILITIES
  const formValue = useWatch({ control: form.control });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setTimeout(() => {
      onChange?.(formValue, form);
    });
  }, [formValue]);

  // ==================================================================== EVENT HANDLERS
  function onSubmitHandler(value: T) {
    onSubmit?.(value);
  }

  function onErrorHandler(value: any) {
    onError?.(value);
    console.error("Form error: ", value);
  }

  function onSecondaryHandler() {
    const value =
      secondaryBtnBehavior === FormSecondaryBtnBehaviorEnum.RESET
        ? form.control._defaultValues
        : defaultValues;
    form.reset({ ...value }, { keepErrors: false, keepDirty: false });
    setTimeout(() => form.clearErrors(), 0);
    onCancel?.(value);
  }

  // ==================================================================== LAYOUT
  return (
    <div
      className={`${cs.sheForm} ${className} ${cs[view]} ${cs[formPosition]} ${disabled || isLoading ? "disabled" : ""} ${fullWidth ? cs.fullWidth : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
      {...restProps}
    >
      <Form {...form}>
        <SheFormHeader {...sheHeaderProps} />
        <form>
          <SheFormContextProvider value={{ form: form }}>
            <div className={`${cs.sheFormContent} ${contentClassName}`}>
              {children}
            </div>
          </SheFormContextProvider>
          <SheFormFooter
            {...sheFooterProps}
            isValid={form.formState.isValid}
            isLoading={isLoading}
            onSecondaryBtnClick={onSecondaryHandler}
            onPrimaryBtnClick={form.handleSubmit(
              onSubmitHandler,
              onErrorHandler,
            )}
          />
        </form>
      </Form>
    </div>
  );
}
