import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { isRegExp } from "lodash";

import cs from "./SheInput.module.scss";
import { Input } from "@/components/ui/input.tsx";
import { ISheInput } from "@/const/interfaces/primitive-components/ISheInput.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import SheTooltip from "@/components/complex/she-tooltip/SheTooltip.tsx";

export default function SheInput({
  className = "",
  styles,
  minWidth,
  maxWidth,
  label,
  labelTransKey,
  placeholder = "enter text...",
  placeholderTransKey,
  isLoading,
  isSearch,
  required,
  showClearBtn,
  fullWidth,
  isValid = true,
  showError,
  error,
  errorTransKey,
  strict,
  pattern,
  tooltip,
  disabled,
  minLength,
  maxLength,
  onChange,
  onBlur,
  onDelay,
  ...props
}: ISheInput) {
  const [value, setValue] = useState(props.value || props.defaultValue || "");
  const [icon, setIcon] = useState(
    !props.icon && isSearch ? <Search /> : props.icon,
  );
  const [_isValid, setIsValid] = useState(isValid);
  const [_isLengthValid, setIsLengthValid] = useState(isValid);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState(error);
  const [_errorTransKey, setErrorTransKey] = useState(errorTransKey);

  const delaySearch = useDebounce(value);
  const isInitialized = useRef(false);
  const isTouched = useRef(false);

  useEffect(() => {
    if (isInitialized.current && onDelay) {
      onDelay(delaySearch);
    }
  }, [delaySearch]);

  useEffect(() => {
    setIcon(!props.icon && isSearch ? <Search /> : props.icon);
  }, [props]);

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

    if (!result) {
      setShowError(true);
      setIsLengthValid(false);

      if (!error) {
        setShowError(true);
        setErrorCondition(true, "input context is required", "REPLACE.ME"); // TODO replace with valid translation key
      }
    } else {
      setShowError(false);
      setErrorCondition();
    }

    return result;
  }

  function isPatternValid(inputValue, validation) {
    if (!pattern || pattern.length === 0 || !validation) return validation;
    if (!isRegExp(pattern)) return false;

    const result = pattern.test(inputValue);

    if (!result) {
      setShowError(true);

      if (!error) {
        setShowError(true);
        setErrorCondition(true, "error pattern validation", "REPLACE.ME"); // TODO replace with valid translation key
      }
    } else {
      setShowError(false);
      setErrorCondition();
    }

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

    setIsLengthValid(valueLength >= minLength && valueLength <= maxLength);
  }

  function setErrorCondition(
    show: boolean = showError,
    text: string = error,
    transKey: string = errorTransKey,
  ) {
    setShowError(show);
    setError(text);
    setErrorTransKey(transKey);
  }

  // ==================================================================== LAYOUT

  return (
    <div
      className={`${className || ""} ${cs.sheInput || ""} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${!_isValid ? cs.invalid : ""} ${!_isLengthValid ? cs.lengthInvalid : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
      }}
    >
      <SheTooltip {...tooltip}>
        <div className={cs.sheInputComponent}>
          {label && <label className="she-text">{label}</label>}
          <div className={cs.sheInputControl}>
            {icon && <div className={cs.iconBlock}>{icon}</div>}
            <Input
              {...props}
              value={value}
              placeholder={placeholder}
              disabled={disabled || isLoading}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            {(showClearBtn || isSearch) && (
              <SheButton
                variant="ghost"
                size="icon"
                disabled={value.toString().length === 0}
                onClick={onClearHandler}
              >
                <X />
              </SheButton>
            )}
          </div>
          {(minLength || maxLength) && (
            <div className={cs.contextLengthRestriction}>
              <div className={cs.contextLengthBock}>
                {minLength && (
                  <span className="she-subtext">min: {minLength}</span>
                )}
                {props.type === "number" && (
                  <span className="she-subtext">value: {value as number}</span>
                )}
                {props.type !== "number" && (
                  <span className="she-subtext">
                    value: {value.toString().length}
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
              <span className="she-text-error">{_error}</span>
            </div>
          )}
        </div>
      </SheTooltip>
    </div>
  );
}
