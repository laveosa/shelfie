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
import { generateId, isSheIconConfig } from "@/utils/helpers/quick-helper.ts";
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
  showError = true,
  patternErrorMessage,
  patternErrorMessageTransKey,
  pattern,
  tooltip,
  disabled,
  minLength,
  maxLength,
  style,
  onChange,
  onBlur,
  onDelay,
  onIsValid,
  ...props
}: ISheInput): JSX.Element {
  const { translate } = useAppTranslation();
  const [_value, setValue] = useState<any>(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isLengthValid, setIsLengthValid] = useState(isValid);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState(
    patternErrorMessageTransKey,
  );

  const ariaDescribedbyId = `${generateId()}_INPUT_ID`;
  const iconToRender = icon || (isSearch && Search);
  const delayValue = useDebounce(_value);
  const isInitialized = useRef(false);
  const isTouched = useRef(false);

  useEffect(() => {
    if (value !== _value) {
      isTouched.current = true;
      setValue(value);
      validateInput(value);
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
    updateIsValid(true);
    setIsLengthValid(true);
    setErrorCondition(false);

    const newValue = "";
    setValue(newValue);
    validateInput(newValue);

    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  function validateInput(inputValue) {
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
    if (!required || !validation) return validation;
    const result = inputValue.length > 0;
    if (!result) setIsLengthValid(false);
    setShowErrorCondition(result, "input context is required", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function isLengthValid(inputValue, validation) {
    if ((!minLength && !maxLength) || !validation) {
      setIsLengthValid(true);
      return validation;
    }

    const valueLength =
      props.type === "number"
        ? (inputValue as number)
        : inputValue.toString().length;
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
            <label className="she-text" aria-describedby={ariaDescribedbyId}>
              <Trans i18nKey={labelTransKey}>{label}</Trans>
            </label>
          )}
          <div className={cs.sheInputControl}>
            {iconToRender &&
              (isSheIconConfig(iconToRender) ? (
                <SheIcon
                  {...iconToRender}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
              ) : (
                <SheIcon
                  icon={iconToRender}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
              ))}
            <Input
              {...props}
              value={_value || ""}
              placeholder={translate(placeholderTransKey, placeholder)}
              aria-invalid={!isValid}
              aria-describedby={ariaDescribedbyId}
              disabled={disabled || isLoading}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            {(showClearBtn || isSearch) && (
              <SheButton
                variant="ghost"
                size="icon"
                icon={X}
                aria-describedby={ariaDescribedbyId}
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
                    value: {_value ? _value.toString().length : 0}
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
