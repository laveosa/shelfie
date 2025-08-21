import React, { JSX } from "react";

import cs from "./SheForm.module.scss";
import { Form } from "@/components/ui/form.tsx";
import SheFormHeader from "@/components/complex/she-form/components/she-form-header/SheFormHeader.tsx";
import SheFormFooter from "@/components/complex/she-form/components/she-form-footer/SheFormFooter.tsx";
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
import {SheFormContextProvider} from "@/state/providers/she-form-context-provider.tsx";

export default function SheForm<T>(props: ISheForm<T>): JSX.Element {
  // ==================================================================== PROPS
  const {
    className = "",
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
    onEnter,
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
        <form onSubmit={form.handleSubmit(onSubmitHandler, onErrorHandler)}>
          <SheFormContextProvider value={{ form: form }}>
            <div className={cs.sheFormContent}>{children}</div>
          </SheFormContextProvider>
          <SheFormFooter
            {...sheFooterProps}
            isValid={form.formState.isValid}
            isLoading={isLoading}
            onSecondaryBtnClick={onSecondaryHandler}
          />
        </form>
      </Form>
    </div>
  );
}
