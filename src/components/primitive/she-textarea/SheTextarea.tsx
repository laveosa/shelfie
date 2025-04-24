import React, { JSX, useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";

import cs from "./SheTextArea.module.scss";
import { Textarea } from "@/components/ui/textarea.tsx";
import { ISheTextarea } from "@/const/interfaces/primitive-components/ISheTextarea.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { generateId, isSheIconConfig } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { SheContextLengthLimits } from "@/components/primitive/she-context-length-limits/SheContextLengthLimits.tsx";

export default function SheTextArea({
  className = "",
  style,
  icon,
  value,
  placeholder = "enter text...",
  placeholderTransKey,
  disabled,
  isLoading,
  minWidth,
  maxWidth,
  fullWidth,
  required,
  minLength,
  maxLength,
  isValid = true,
  ignoreValidation,
  showError = true,
  resize,
  rows = 4,
  delayTime,
  onChange,
  onBlur,
  onDelay,
  onIsValid,
  ...props
}: ISheTextarea): JSX.Element {
  const { translate } = useAppTranslation();
  const [_textValue, setTextValue] = useState<
    string | number | readonly string[]
  >(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isLengthValid, setIsLengthValid] = useState(isValid);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState<string>(null);

  const ariaDescribedbyId = `${generateId()}_TEXTAREA_ID`;
  const delayValue = useDebounce(_textValue, delayTime);
  const isInitialized = useRef(false);
  const isTouched = useRef(false);

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

  // ==================================================================== EVENT

  function onChangeHandler(e) {
    isInitialized.current = true;
    const newValue = e.target.value;
    setTextValue(newValue);
    validateValue(newValue);
    if (onChange) onChange(newValue);
  }

  function onBlurHandler(e) {
    isTouched.current = true;
    const newValue = e.target.value;
    validateValue(newValue);
    if (onBlur) onBlur(newValue);
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

    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  function validateValue(textValue) {
    if (ignoreValidation || !isTouched.current) return true;

    let validation = true;
    validation = isRequiredValid(textValue, validation);
    validation = isLengthValid(textValue, validation);
    updateIsValid(validation);
  }

  function updateIsValid(value: boolean) {
    if (onIsValid) onIsValid(value);

    setIsValid(value);
  }

  // ----------------------------- VALIDATION PATTERNS CHECK

  function isRequiredValid(textValue, validation) {
    if (!required || !validation) return validation;

    const result = textValue?.length > 0;

    if (!result) setIsLengthValid(false);

    setShowErrorCondition(result, "context is required", "REPLACE.ME"); // TODO replace with valid translation key
    return result;
  }

  function isLengthValid(textValue, validation) {
    if ((!minLength && !maxLength) || !validation) {
      setIsLengthValid(true);
      return validation;
    }

    const valueLength = textValue.toString().length;
    const isMinOk =
      typeof minLength === "number" ? valueLength >= minLength : true;
    const isMaxOk =
      typeof maxLength === "number" ? valueLength <= maxLength : true;
    const result = isMinOk && isMaxOk;

    setIsLengthValid(result);
    setShowErrorCondition(result, "value length not valid", "REPLACE.ME"); // TODO replace with valid translation key
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
      className={`${cs.sheTextArea} ${className} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""}  ${required ? cs.required : ""} ${resize ? cs.resize : ""} ${!_isValid ? cs.invalid : ""} ${!_isLengthValid ? cs.lengthInvalid : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheTextAreaComponent}>
        <SheLabel {...props} ariaDescribedbyId={ariaDescribedbyId} />
        <div className={cs.sheTextAreaControl}>
          <SheSkeleton isLoading={isLoading} fullWidth>
            {icon &&
              (isSheIconConfig(icon) ? (
                <SheIcon
                  {...icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
              ) : (
                <SheIcon
                  icon={icon}
                  className={cs.iconBlock}
                  aria-describedby={ariaDescribedbyId}
                />
              ))}
            <Textarea
              {...props}
              value={_textValue ?? ""}
              placeholder={translate(placeholderTransKey, placeholder)}
              aria-describedby={ariaDescribedbyId}
              disabled={disabled || isLoading}
              rows={rows}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
          </SheSkeleton>
          <SheClearButton
            {...props}
            value={_textValue}
            isLoading={isLoading}
            disabled={disabled}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearHandler}
          />
        </div>
        <SheContextLengthLimits
          {...props}
          value={_textValue}
          minLength={minLength}
          maxLength={maxLength}
          lengthInvalid={_isLengthValid}
        />
        {_showError && _error && (
          <div className={cs.errorMessageBlock}>
            <span className="she-text-error">
              <Trans i18nKey={_errorTransKey}>{_error}</Trans>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
