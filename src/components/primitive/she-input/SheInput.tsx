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
  showError = true,
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
  const [isInputValid, setIsInputValid] = useState(isValid);
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
    const newValue = "";
    setValue(newValue);
    validateInput(newValue);
    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  function validateInput(inputValue) {
    let validation = !isInitialized.current;
    if (!validation) validation = !isTouched.current;
    if (!validation) validation = validateLength(inputValue);
    if (!validation) validation = validatePattern(inputValue);
    setIsInputValid(validation);
  }

  function validateLength(inputValue): boolean {
    if (!minLength && !maxLength) return true;
    const valueLength =
      props.type === "number"
        ? (inputValue as number)
        : inputValue.toString().length;
    return valueLength >= minLength && valueLength <= maxLength;
  }

  function validatePattern(inputValue) {
    if (!pattern || pattern.length === 0) return true;
    if (!isRegExp(pattern)) return false;
    return pattern.test(inputValue);
  }

  // ==================================================================== LAYOUT

  return (
    <div
      className={`${className} ${cs.sheInput || ""} ${
        icon ? cs.withIcon : ""
      } ${fullWidth ? cs.fullWidth : ""} ${
        !isInputValid ? cs.invalid : ""
      } ${required ? cs.required : ""}`}
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
          {showError && error && (
            <div className={cs.errorMessageBlock}>
              <span className="she-text-error">{error}</span>
            </div>
          )}
        </div>
      </SheTooltip>
    </div>
  );

  /*return (
    <div
      className={`${className} ${cs.sheInput || ""} ${
        icon ? cs.withIcon : ""
      } ${fullWidth ? cs.fullWidth : ""} ${
        !isInputValid ? cs.invalid : ""
      } ${required ? cs.required : ""}`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
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
                    <span className="she-subtext">
                      value: {value as number}
                    </span>
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
            {showError && error && (
              <div className={cs.errorMessageBlock}>
                <span className="she-text-error">{error}</span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent side={tooltipSide} align={tooltipAlign}>
            {tooltip}
          </TooltipContent>
        )}
      </Tooltip>
    </div>
  );*/
}
