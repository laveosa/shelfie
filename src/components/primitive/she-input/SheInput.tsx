import React, { JSX, useEffect, useRef, useState } from "react";
import _, { isRegExp } from "lodash";

import { Search } from "lucide-react";
import cs from "./SheInput.module.scss";
import { Input } from "@/components/ui/input.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";
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
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

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
    showHighlighted,
    onIsValid,
    onChange,
    onBlur,
    onDelay,
    onClear,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheInput,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);
  const restProps = removeCustomProps<ISheInput>(props, [
    SheInputDefaultModel,
    ShePrimitiveComponentWrapperDefaultModel,
  ]);

  // ==================================================================== STATE MANAGEMENT
  const [_textValue, setTextValue] = useState<string | number>(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isLengthValid, setIsLengthValid] = useState(isValid);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState(
    patternErrorMessageTransKey,
  );
  const [_isHighlighted, setIsHighlighted] = useState<boolean>(null);

  // ==================================================================== REFS
  const _inputRef = useDefaultRef<HTMLInputElement>(ref);
  const _isInitialized = useRef<boolean>(false);
  const _isTouched = useRef<boolean>(false);
  const _lastEventDataRef = useRef<any>(null);
  const _sourceValue = useRef<string | number>(null);

  // ==================================================================== UTILITIES
  const { translate, ariaDescribedbyId, setFocus } = useComponentUtilities({
    identifier: "ISheInput",
  });
  const iconToRender = icon || (isSearch && Search);
  const delayValue = useDebounce(_textValue, delayTime);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setIsHighlighted(false);
    _sourceValue.current = value;

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

  // ==================================================================== EVENT HANDLERS
  function onChangeHandler(event) {
    _isInitialized.current = true;
    _lastEventDataRef.current = event;
    const newValue = event.target.value;
    setTextValue(newValue);
    const tmpIsValid = _validateValue(newValue);
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

  function onBlurHandler(event: React.ChangeEvent<HTMLInputElement>) {
    _isTouched.current = true;
    const newValue = event.target.value.trim() || null;
    const tmpIsValid = _validateValue(newValue);
    setIsHighlighted(!_.isEqual(_sourceValue.current, newValue));
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

  function onClearHandler(event) {
    _isInitialized.current = false;
    _isTouched.current = false;
    updateIsValid(true);
    setIsLengthValid(true);
    _setErrorCondition(false);

    const newValue = "";
    setTextValue(newValue);
    _validateValue(newValue);
    setFocus(true, _inputRef);

    const outputModel: IOutputEventModel<null, ISheInput, any> = {
      value: null,
      model: props,
      event,
    };
    onChange?.(null, outputModel);
    onDelay?.(null, outputModel);
    onClear?.(null, outputModel);
  }

  // ==================================================================== PRIVATE
  function _validateValue(inputValue) {
    if (ignoreValidation || !_isTouched.current) return true;

    let validation = true;
    validation = _isRequiredValidCheck(inputValue, validation);
    validation = _isLengthValidCheck(inputValue, validation);
    validation = _isPatternValidCheck(inputValue, validation);
    updateIsValid(validation);
    return validation;
  }

  function updateIsValid(value: boolean) {
    onIsValid?.(value);
    setIsValid(value);
  }

  // ----------------------------- VALIDATION PATTERNS CHECK

  function _isRequiredValidCheck(inputValue, validation) {
    if (!required || !validation || !_isTouched.current) return validation;

    const result = inputValue?.length > 0;

    if (!result) setIsLengthValid(false);

    _setShowErrorCondition(result, "context is required", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function _isLengthValidCheck(inputValue, validation) {
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
    _setShowErrorCondition(result, "value length not valid", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function _isPatternValidCheck(inputValue, validation) {
    if (!pattern || pattern.length === 0 || !validation) return validation;
    if (!isRegExp(pattern)) return false;

    const result = pattern.test(inputValue);
    const message = patternErrorMessage || "error pattern validation";
    const messageTransKey = patternErrorMessageTransKey || "REPLACE.ME"; // TODO replace with valid translation key
    _setShowErrorCondition(result, message, messageTransKey);
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
      className={`${shePrimitiveComponentWrapperProps.className} ${cs.sheInput} ${showHighlighted && _isHighlighted ? cs.highlighted : ""} ${!_isValid ? cs.invalid : ""}`}
      icon={iconToRender}
      clearBtnValue={_textValue}
      ariaDescribedbyId={ariaDescribedbyId}
      contextLengthLimitsValue={_textValue}
      isContextLengthLimitsValid={_isLengthValid}
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
      <Input
        className={`componentTriggerElement`}
        ref={_inputRef}
        value={_textValue ?? ""}
        placeholder={translate(placeholderTransKey, placeholder)}
        type={type}
        step={step}
        autoFocus={autoFocus}
        aria-invalid={!isValid}
        aria-describedby={ariaDescribedbyId}
        disabled={disabled || isLoading}
        onKeyDown={onChangeHandler}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        {...restProps}
      />
    </ShePrimitiveComponentWrapper>
  );
}
