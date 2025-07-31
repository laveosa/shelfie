import React, { JSX, useEffect, useRef, useState } from "react";
import { isRegExp } from "lodash";

import { Search } from "lucide-react";
import cs from "./SheInput.module.scss";
import { Input } from "@/components/ui/input.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import {
  getCustomProps,
  removeCustomProps,
} from "@/utils/helpers/props-helper.ts";
import {
  ISheInput,
  SheInputDefaultModel,
} from "@/const/interfaces/primitive-components/ISheInput.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function SheInput(props: ISheInput): JSX.Element {
  // ==================================================================== PROPS
  const {
    ref,
    icon,
    value,
    placeholder = "enter text...",
    placeholderTransKey,
    type,
    step,
    autoFocus,
    isSearch,
    disabled,
    isLoading,
    minLength,
    maxLength,
    required,
    isValid = true,
    ignoreValidation,
    showError = true,
    pattern,
    patternErrorMessage,
    patternErrorMessageTransKey,
    delayTime,
    onIsValid,
    onChange,
    onBlur,
    onDelay,
    onClear,
  } = props;
  const sheInputProps = getCustomProps<ISheInput, ISheInput>(
    props,
    SheInputDefaultModel,
  );
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheInput,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);
  const restProps = removeCustomProps<ISheInput>(props, [
    SheInputDefaultModel,
    ShePrimitiveComponentWrapperDefaultModel,
  ]);

  // console.log("input props: ", sheInputProps);
  // console.log("wrapper props: ", shePrimitiveComponentWrapperProps);
  // console.log("rest props: ", restProps);

  // ==================================================================== STATE MANAGEMENT
  const [_textValue, setTextValue] = useState<string | number>(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isLengthValid, setIsLengthValid] = useState(isValid);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState(
    patternErrorMessageTransKey,
  );

  // ==================================================================== REFS
  const isInitialized = useRef(false);
  const isTouched = useRef(false);

  // ==================================================================== UTILITIES
  const { translate, ariaDescribedbyId } = useComponentUtilities({
    identifier: "ISheInput",
  });
  const iconToRender = icon || (isSearch && Search);
  const delayValue = useDebounce(_textValue, delayTime);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    const convertedValue = Array.isArray(value) ? value.join("\n") : value;

    if (convertedValue !== _textValue) {
      isTouched.current = true;
      setTextValue(convertedValue);
      validateValue(convertedValue);
    }
  }, [value]);

  useEffect(() => {
    if (isInitialized.current && onDelay) {
      onDelay(delayValue);
    }
  }, [delayValue]);

  useEffect(() => {
    setIsValid(isValid);

    if (isValid) {
      isInitialized.current = false;
      isTouched.current = false;
      setIsLengthValid(true);
      setErrorCondition(false);
    }
  }, [isValid]);

  // ==================================================================== EVENT HANDLERS
  function onChangeHandler(e) {
    isInitialized.current = true;
    const newValue = e.target.value;
    setTextValue(newValue);
    validateValue(newValue);
    onChange?.(newValue);
  }

  function onBlurHandler(e) {
    isTouched.current = true;
    const newValue = e.target.value;
    validateValue(newValue);
    onBlur?.(newValue);
  }

  function onClearHandler() {
    isInitialized.current = false;
    isTouched.current = false;
    updateIsValid(true);
    setIsLengthValid(true);
    setErrorCondition(false);

    const newValue = "";
    setTextValue(newValue);
    validateValue(newValue);

    onChange?.(newValue);
    onBlur?.(newValue);
    onDelay?.(newValue);
    onClear?.(null);
  }

  // ==================================================================== PRIVATE
  function validateValue(inputValue) {
    if (ignoreValidation || !isTouched.current) return true;

    let validation = true;
    validation = isRequiredValid(inputValue, validation);
    validation = isLengthValid(inputValue, validation);
    validation = isPatternValid(inputValue, validation);
    updateIsValid(validation);
  }

  function updateIsValid(value: boolean) {
    if (onIsValid) onIsValid(value);

    setIsValid(value);
  }

  // ----------------------------- VALIDATION PATTERNS CHECK

  function isRequiredValid(inputValue, validation) {
    if (!required || !validation || !isTouched.current) return validation;

    const result = inputValue?.length > 0;

    if (!result) setIsLengthValid(false);

    setShowErrorCondition(result, "context is required", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function isLengthValid(inputValue, validation) {
    if ((!minLength && !maxLength) || !validation) {
      setIsLengthValid(true);
      return validation;
    }

    const valueLength =
      type === "number"
        ? (inputValue as number)
        : inputValue?.toString().trim().length;
    const isMinOk =
      typeof minLength === "number" ? valueLength >= minLength : true;
    const isMaxOk =
      typeof maxLength === "number" ? valueLength <= maxLength : true;
    const result = isMinOk && isMaxOk;

    setIsLengthValid(result);
    setShowErrorCondition(result, "value length not valid", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function isPatternValid(inputValue, validation) {
    if (!pattern || pattern.length === 0 || !validation) return validation;
    if (!isRegExp(pattern)) return false;

    const result = pattern.test(inputValue);
    const message = patternErrorMessage || "error pattern validation";
    const messageTransKey = patternErrorMessageTransKey || "REPLACE.ME"; // TODO replace with valid translation key
    setShowErrorCondition(result, message, messageTransKey);
    return result;
  }

  // ----------------------------- ERROR CONDITION

  function setShowErrorCondition(
    isValid: boolean,
    message?: string,
    messageTransKey?: string,
  ) {
    !isValid
      ? setErrorCondition(true, message, messageTransKey)
      : setErrorCondition(false);
  }

  function setErrorCondition(
    show: boolean,
    text?: string,
    errTransKey?: string,
  ) {
    if (showError && show) setShowError(show);

    setError(text);
    setErrorTransKey(errTransKey);
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${cs.sheInput} ${shePrimitiveComponentWrapperProps.className} ${!_isValid ? cs.invalid : ""}`}
      icon={iconToRender}
      clearBtnValue={_textValue}
      ariaDescribedbyId={ariaDescribedbyId}
      contextLengthLimitsValue={_textValue}
      isContextLengthLimitsValid={_isLengthValid}
      errorMessage={_error}
      errorMessageTransKey={_errorTransKey}
      hideErrorMessage={!_showError}
      onClear={onClearHandler}
    >
      <Input
        className={`componentTriggerElement`}
        ref={ref}
        value={_textValue ?? ""}
        placeholder={translate(placeholderTransKey, placeholder)}
        type={type}
        step={step}
        autoFocus={autoFocus}
        aria-invalid={!isValid}
        aria-describedby={ariaDescribedbyId}
        disabled={disabled || isLoading}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        {...restProps}
      />
    </ShePrimitiveComponentWrapper>
  );

  /*return (
    <div
      id={id}
      className={`${cs.sheInput} ${className}  ${iconToRender ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${!_isValid ? cs.invalid : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheInputComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.sheInputControl}>
          <SheSkeleton isLoading={isLoading} fullWidth>
            <SheIcon
              icon={iconToRender}
              className={cs.iconBlock}
              aria-describedby={ariaDescribedbyId}
            />
            <Input
              ref={ref}
              value={_textValue ?? ""}
              placeholder={translate(placeholderTransKey, placeholder)}
              type={type}
              step={step}
              autoFocus={autoFocus}
              aria-invalid={!isValid}
              aria-describedby={ariaDescribedbyId}
              disabled={disabled || isLoading}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              {...props}
            />
          </SheSkeleton>
          <SheClearButton
            clearBtnValue={_textValue}
            showClearBtn={showClearBtn || isSearch}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearHandler}
          />
        </div>
        <SheContextLengthLimits
          contextLengthLimitsValue={_textValue}
          isContextLengthLimitsValid={_isLengthValid}
          minLength={minLength}
          maxLength={maxLength}
          type={type}
        />
        <SheErrorMessageBlock
          errorMessage={_error}
          errorMessageTransKey={_errorTransKey}
          hideErrorMessage={!_showError}
        />
      </div>
    </div>
  );*/
}
