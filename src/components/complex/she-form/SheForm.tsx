import React, { JSX, useEffect, useRef } from "react";
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
import _ from "lodash";

export default function SheForm<T>(props: ISheForm<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
    className = "",
    contentClassName = "",
    style,
    children,
    form,
    data,
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

  // ==================================================================== REF
  const isInitialMount = useRef<boolean>(true);
  const previousData = useRef<T | undefined>(null);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (data && !_.isEqual(data, previousData.current)) {
      form.reset(data);
      previousData.current = data;
    }
  }, [data]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (
      form.formState.isDirty &&
      !_.isEqual(formValue, form.control._defaultValues)
    ) {
      onChange?.(formValue as T, form);
    }
  }, [formValue, form.formState.isDirty]);

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
        <form onClick={(event) => event.preventDefault()}>
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
