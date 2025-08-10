import React, { JSX, useEffect, useRef, useState } from "react";

import cs from "./SheTextarea.module.scss";
import { Textarea } from "@/components/ui/textarea.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";
import { ISheTextarea } from "@/const/interfaces/primitive-components/ISheTextarea.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import _ from "lodash";

export default function SheTextArea(props: ISheTextarea): JSX.Element {
  const {
    value,
    icon,
    iconPosition,
    placeholder = "enter text...",
    placeholderTransKey,
    autoFocus,
    disabled,
    isLoading,
    required,
    minLength,
    maxLength,
    isValid = true,
    ignoreValidation,
    showError = true,
    resize,
    rows = 4,
    rowToExtend,
    delayTime,
    contextLengthLimitsClassName = "",
    descriptionBlockClassName = "",
    descriptionIcon,
    errorMessageBlockClassName = "",
    errorMessageIcon,
    onIsValid,
    onChange,
    onBlur,
    onDelay,
    onClear,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheTextarea,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_textValue, setTextValue] = useState<string>(null);
  const [_isValid, setIsValid] = useState<boolean>(isValid);
  const [_isLengthValid, setIsLengthValid] = useState<boolean>(isValid);
  const [_showError, setShowError] = useState<boolean>(showError);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState<string>(null);

  // ==================================================================== REFS
  const _textAreaRef = useRef<HTMLTextAreaElement>(null);
  const _isInitialized = useRef(false);
  const _isTouched = useRef(false);
  const _lastEventDataRef = useRef<any>(null);

  // ==================================================================== UTILITIES
  const { translate, ariaDescribedbyId, setFocus } = useComponentUtilities({
    identifier: "ISheTextarea",
  });
  const delayValue = useDebounce(_textValue, delayTime);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (value !== _textValue) {
      _isTouched.current = true;
      setTextValue(value);
      _validateValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (_isInitialized.current && onDelay) {
      onDelay(delayValue, {
        value: delayValue,
        model: {
          ...props,
          value: delayValue,
          isValid: _isValid,
        },
        event: _lastEventDataRef.current,
      });
    }
  }, [delayValue]);

  useEffect(() => {
    setIsValid(isValid);

    if (isValid) {
      _isInitialized.current = false;
      _isTouched.current = false;
      setIsLengthValid(true);
      _setErrorCondition(false);
    }
  }, [isValid]);

  // ==================================================================== EVENT

  function onChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    _isInitialized.current = true;
    _lastEventDataRef.current = event;
    const newValue = event.target.value;
    setTextValue(newValue);
    const tmpIsValid = _validateValue(newValue);
    _calculateRowToExtend();
    onChange?.(newValue, {
      value: newValue,
      model: {
        ...props,
        value: newValue,
        isValid: tmpIsValid,
      },
      event,
    });
  }

  function onBlurHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    _isTouched.current = true;
    const newValue = event.target.value;
    const tmpIsValid = _validateValue(newValue);
    onBlur?.(newValue, {
      value: newValue,
      model: {
        ...props,
        value: newValue,
        isValid: tmpIsValid,
      },
      event,
    });
  }

  function onClearHandler(event: React.KeyboardEvent) {
    _isInitialized.current = false;
    _isTouched.current = false;
    updateIsValid(true);
    setIsLengthValid(true);
    _setErrorCondition(false);

    const newValue = "";
    setTextValue(newValue);
    _validateValue(newValue);
    setFocus(true, _textAreaRef);
    const textarea = _textAreaRef.current;
    textarea.rows = rows;

    const outputModel: IOutputEventModel<null, ISheTextarea, any> = {
      value: null,
      model: props,
      event,
    };
    onChange?.(null, outputModel);
    onDelay?.(null, outputModel);
    onClear?.(null, outputModel);
  }

  // ==================================================================== PRIVATE
  function _validateValue(textValue) {
    if (ignoreValidation || !_isTouched.current) return true;

    let validation = true;
    validation = _isRequiredValidCheck(textValue, validation);
    validation = _isLengthValidCheck(textValue, validation);
    updateIsValid(validation);
  }

  function updateIsValid(value: boolean) {
    if (onIsValid) onIsValid(value);

    setIsValid(value);
  }

  function _calculateRowToExtend() {
    if (!rowToExtend || !_textAreaRef.current) return;

    const textarea = _textAreaRef.current;
    textarea.rows = rows;
    const currentRows = Math.floor(textarea.scrollHeight / 22);
    textarea.rows = Math.min(currentRows, rowToExtend);
  }

  // ----------------------------- VALIDATION PATTERNS CHECK

  function _isRequiredValidCheck(textValue, validation) {
    if (!required || !validation || !_isTouched.current) return validation;

    const result = textValue?.length > 0;

    if (!result) setIsLengthValid(false);

    _setShowErrorCondition(result, "context is required", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function _isLengthValidCheck(textValue, validation) {
    if ((!minLength && !maxLength) || !validation) {
      setIsLengthValid(true);
      return validation;
    }

    const valueLength = textValue?.toString().trim().length;
    const isMinOk =
      typeof minLength === "number" ? valueLength >= minLength : true;
    const isMaxOk =
      typeof maxLength === "number" ? valueLength <= maxLength : true;
    const result = isMinOk && isMaxOk;

    setIsLengthValid(result);
    _setShowErrorCondition(result, "value length not valid", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  // ----------------------------- ERROR CONDITION

  function _setShowErrorCondition(
    isValid: boolean,
    message?: string,
    messageTransKey?: string,
  ) {
    !isValid
      ? _setErrorCondition(true, message, messageTransKey)
      : _setErrorCondition(false);
  }

  function _setErrorCondition(
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
      className={`${shePrimitiveComponentWrapperProps.className} ${cs.sheTextArea} ${!_isValid ? cs.invalid : ""} ${resize ? cs.resize : ""} ${icon && iconPosition === "out" ? cs.sheInputWithIconOut : ""}`}
      clearBtnValue={_textValue}
      ariaDescribedbyId={ariaDescribedbyId}
      contextLengthLimitsValue={_textValue}
      isContextLengthLimitsValid={_isLengthValid}
      contextLengthLimitsClassName={`${contextLengthLimitsClassName}  ${cs.sheContextLengthLimits}`}
      descriptionBlockClassName={`${descriptionBlockClassName} ${!descriptionIcon ? cs.sheInputDescriptionBlock : ""}`}
      errorMessageBlockClassName={`${errorMessageBlockClassName} ${!errorMessageIcon ? cs.sheInputErrorBlock : ""}`}
      errorMessage={shePrimitiveComponentWrapperProps.errorMessage ?? _error}
      errorMessageTransKey={
        shePrimitiveComponentWrapperProps.errorMessageTransKey ?? _errorTransKey
      }
      hideErrorMessage={
        !_.isNil(shePrimitiveComponentWrapperProps.hideErrorMessage)
          ? shePrimitiveComponentWrapperProps.hideErrorMessage
          : !_showError
      }
      onClear={onClearHandler}
    >
      <Textarea
        className={`componentTriggerElement`}
        ref={_textAreaRef}
        value={_textValue ?? ""}
        placeholder={translate(placeholderTransKey, placeholder)}
        aria-invalid={!isValid}
        aria-describedby={ariaDescribedbyId}
        autoFocus={autoFocus}
        disabled={disabled || isLoading}
        rows={rows}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </ShePrimitiveComponentWrapper>
  );
}
