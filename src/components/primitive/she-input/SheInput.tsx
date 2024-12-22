import { ReactNode, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import cs from "./SheInput.module.scss";
import { Input } from "@/components/ui/input.tsx";
import { ISheInput } from "@/const/interfaces/complex-components/ISheInput.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";

export default function SheInput({
  className = "",
  label,
  labelTransKey,
  placeholder = "enter text...",
  placeholderTransKey,
  isLoading,
  isSearch,
  isInvalid,
  required,
  showClearBtn,
  fullWidth,
  error,
  errorTransKey,
  tooltip,
  tooltipTransKey,
  tooltipSide,
  tooltipAlign,
  disabled,
  onChange,
  onBlur,
  onDelay,
  ...props
}: ISheInput) {
  const [value, setValue] = useState(props.value || props.defaultValue || "");
  const [icon, setIcon] = useState(
    !props.icon && isSearch ? <Search /> : props.icon,
  );
  const delaySearch = useDebounce(value);
  const isInitialized = useRef(false);

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
    if (onChange) onChange(newValue);
  }

  function onBlurHandler(e) {
    const newValue = e.target.value;
    if (onBlur) onBlur(newValue);
  }

  function onClearHandler() {
    isInitialized.current = false;
    const newValue = "";
    setValue(newValue);
    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div
      className={`
      ${className} 
      ${cs.sheInput || null} 
      ${icon ? cs.withIcon : null}  
      ${fullWidth ? cs.fullWidth : null} 
      ${isInvalid ? cs.invalid : null} 
      ${required ? cs.required : null}`}
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
            {error && (
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
  );
}
