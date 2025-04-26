import React, { JSX, useEffect, useRef, useState } from "react";
import { isRegExp } from "lodash";

import cs from "./SheInput.module.scss";
import { Input } from "@/components/ui/input.tsx";
import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { SheContextLengthLimits } from "@/components/primitive/she-context-length-limits/SheContextLengthLimits.tsx";
import { SheErrorMessageBlock } from "@/components/primitive/she-error-message-block/SheErrorMessageBlock.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { Search } from "lucide-react";

export default function SheInput({
  id,
  className = "",
  style,
  label,
  labelTransKey,
  icon,
  value,
  type,
  placeholder = "enter text...",
  placeholderTransKey,
  isSearch,
  showClearBtn,
  tooltip,
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
  pattern,
  patternErrorMessage,
  patternErrorMessageTransKey,
  delayTime,
  onChange,
  onBlur,
  onDelay,
  onIsValid,
  ...props
}: ISheInput): JSX.Element {
  const { translate } = useAppTranslation();
  const [_textValue, setTextValue] = useState<
    string | number | readonly string[]
  >(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isLengthValid, setIsLengthValid] = useState(isValid);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState(
    patternErrorMessageTransKey,
  );

  const ariaDescribedbyId = `${generateId()}_INPUT_ID`;
  const iconToRender = icon || (isSearch && Search);
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
    if (!required || !validation) return validation;

    const result = inputValue.length > 0;

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
      type === "number" ? (inputValue as number) : inputValue.toString().length;
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
              {...props}
              value={_textValue ?? ""}
              placeholder={translate(placeholderTransKey, placeholder)}
              type={type}
              aria-invalid={!isValid}
              aria-describedby={ariaDescribedbyId}
              disabled={disabled || isLoading}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </SheSkeleton>
          <SheClearButton
            value={_textValue}
            showClearBtn={showClearBtn || isSearch}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearHandler}
          />
        </div>
        <SheContextLengthLimits
          value={_textValue}
          isValid={_isLengthValid}
          minLength={minLength}
          maxLength={maxLength}
          type={type}
        />
        <SheErrorMessageBlock
          error={_error}
          errorTransKey={_errorTransKey}
          showError={_showError}
        />
      </div>
    </div>
  );
}
