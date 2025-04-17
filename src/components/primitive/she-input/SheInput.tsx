import React, { JSX, useEffect, useRef, useState } from "react";
import { isRegExp } from "lodash";
import { Trans } from "react-i18next";

import cs from "./SheInput.module.scss";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input.tsx";
import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import SheTooltip from "@/components/complex/she-tooltip/SheTooltip.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { isSheIconConfig } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";

export default function SheInput({
  className,
  value,
  minWidth,
  maxWidth,
  fullWidth,
  label,
  labelTransKey,
  placeholder = "enter text...",
  placeholderTransKey,
  icon,
  isLoading,
  isSearch,
  isValid = true,
  ignoreValidation,
  required,
  showClearBtn,
  showError,
  error,
  errorTransKey,
  pattern,
  tooltip,
  disabled,
  minLength,
  maxLength,
  style,
  onChange,
  onBlur,
  onDelay,
  ...props
}: ISheInput): JSX.Element {
  const { translate } = useAppTranslation();
  const [_value, setValue] = useState<any>(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isLengthValid, setIsLengthValid] = useState(isValid);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState(error);
  const [_errorTransKey, setErrorTransKey] = useState(errorTransKey);

  const iconToRender = icon || (isSearch && Search);
  const delayValue = useDebounce(_value);
  const isInitialized = useRef(false);
  const isTouched = useRef(false);

  useEffect(() => {
    if (value !== _value) {
      setValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (isInitialized.current && onDelay) {
      onDelay(delayValue);
    }
  }, [delayValue]);

  // ==================================================================== EVENT

  function onChangeHandler(e) {
    isInitialized.current = true;
    const newValue = e.target.value;
    setValue(newValue);
    validateInput(newValue);
    if (onChange) onChange(newValue);
  }

  function onBlurHandler(e) {
    isTouched.current = true;
    const newValue = e.target.value;
    validateInput(newValue);
    if (onBlur) onBlur(newValue);
  }

  function onClearHandler() {
    isInitialized.current = false;
    isTouched.current = false;
    setIsValid(true);
    setIsLengthValid(true);
    setErrorCondition();

    const newValue = "";
    setValue(newValue);
    validateInput(newValue);

    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  function validateInput(inputValue) {
    if (!isTouched.current) return true;
    let validation = true;
    validation = isRequiredValid(inputValue, validation);
    validation = isPatternValid(inputValue, validation);
    isLengthValid(inputValue);
    setIsValid(validation);
  }

  function isRequiredValid(inputValue, validation) {
    if (!required || !validation) return validation;
    const result = inputValue.length > 0;
    if (!result) setIsLengthValid(false);
    setShowErrorCondition(result, "input context is required", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function isPatternValid(inputValue, validation) {
    if (!pattern || pattern.length === 0 || !validation) return validation;
    if (!isRegExp(pattern)) return false;
    const result = pattern.test(inputValue);
    setShowErrorCondition(result, "error pattern validation", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function isLengthValid(inputValue) {
    if (!minLength && !maxLength) {
      setIsLengthValid(true);
      return;
    }

    const valueLength =
      props.type === "number"
        ? (inputValue as number)
        : inputValue.toString().length;

    const isMinOk =
      typeof minLength === "number" ? valueLength >= minLength : true;
    const isMaxOk =
      typeof maxLength === "number" ? valueLength <= maxLength : true;
    setIsLengthValid(isMinOk && isMaxOk);

    // setIsLengthValid(valueLength >= minLength && valueLength <= maxLength);
  }

  function setShowErrorCondition(
    isValid: boolean,
    message: string,
    messageTransKey?: string,
  ) {
    if (!isValid) {
      setShowError(true);

      if (!error) {
        setShowError(true);
        setErrorCondition(true, message, messageTransKey);
      }
    } else {
      setShowError(false);
      setErrorCondition();
    }
  }

  function setErrorCondition(
    show: boolean = showError,
    text: string = error,
    errTransKey: string = errorTransKey,
  ) {
    setShowError(show);
    setError(text);
    setErrorTransKey(errTransKey);
  }

  // ==================================================================== LAYOUT

  return (
    <div
      id={`${props.id ? props.id + "_COVER" : ""}`}
      className={`${className || ""} ${cs.sheInput || ""} ${iconToRender ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${!_isValid ? cs.invalid : ""} ${!_isLengthValid ? cs.lengthInvalid : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <SheTooltip {...tooltip}>
        <div className={cs.sheInputComponent}>
          {label && (
            <label className="she-text">
              <Trans i18nKey={labelTransKey}>{label}</Trans>
            </label>
          )}
          <div className={cs.sheInputControl}>
            {iconToRender &&
              (isSheIconConfig(iconToRender) ? (
                <SheIcon {...iconToRender} className={cs.iconBlock} />
              ) : (
                <SheIcon icon={iconToRender} className={cs.iconBlock} />
              ))}
            <Input
              {...props}
              value={_value || ""}
              placeholder={translate(placeholderTransKey, placeholder)}
              disabled={disabled || isLoading}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            {(showClearBtn || isSearch) && (
              <SheButton
                variant="ghost"
                size="icon"
                icon={X}
                disabled={
                  !_value ||
                  _value.toString().length === 0 ||
                  disabled ||
                  isLoading
                }
                onClick={onClearHandler}
              />
            )}
          </div>
          {(minLength || maxLength) && (
            <div className={cs.contextLengthRestriction}>
              <div className={cs.contextLengthBock}>
                {minLength && (
                  <span className="she-subtext">min: {minLength}</span>
                )}
                {props.type === "number" && (
                  <span className="she-subtext">value: {_value as number}</span>
                )}
                {props.type !== "number" && (
                  <span className="she-subtext">
                    value: {_value?.toString().length}
                  </span>
                )}
                {maxLength && (
                  <span className="she-subtext">max: {maxLength}</span>
                )}
              </div>
            </div>
          )}
          {_showError && _error && (
            <div className={cs.errorMessageBlock}>
              <span className="she-text-error">
                <Trans i18nKey={_errorTransKey}>{_error}</Trans>
              </span>
            </div>
          )}
        </div>
      </SheTooltip>
    </div>
  );
}
