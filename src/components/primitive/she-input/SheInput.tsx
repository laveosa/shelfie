import { useEffect, useRef, useState } from "react";
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
  icon = <Search />,
  error,
  errorTransKey,
  tooltip,
  tooltipTransKey,
  tooltipSide,
  tooltipAlign,
  showClearBtn,
  isSearch,
  isLoading,
  disabled,
  onChange,
  onBlur,
  onDelay,
  ...props
}: ISheInput) {
  const [value, setValue] = useState(props.value || props.defaultValue || "");
  const delaySearch = useDebounce(value);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current && onDelay) {
      onDelay(delaySearch);
    }
  }, [delaySearch]);

  const onChangeHandler = (e) => {
    isInitialized.current = true;
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const onBlurHandler = (e) => {
    const newValue = e.target.value;
    if (onBlur) onBlur(newValue);
  };

  const onClearHandler = () => {
    isInitialized.current = false;
    const newValue = "";
    setValue(newValue);
    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  };

  return (
    <div
      className={`${cs.sheInput || ""} ${className} ${icon ? cs.withIcon : ""}`}
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
                <SheButton variant="ghost" size="icon" onClick={onClearHandler}>
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
