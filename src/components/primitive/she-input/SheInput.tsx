import { useEffect, useState } from "react";
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

export default function SheInput(props: ISheInput) {
  const [value, setValue] = useState(props.value || props.defaultValue || "");
  const [icon] = useState(props.isSearch ? <Search /> : props.icon);
  const delaySearch = useDebounce(value);

  useEffect(() => {
    if (props.onDelay) props.onDelay(delaySearch);
  }, [delaySearch]);

  function onChange(e) {
    const value = e.target.value;
    setValue(() => {
      if (props.onChange) props.onChange(value);
      return value;
    });
  }

  function onBlur(e) {
    const value = e.target.value;
    setValue(() => {
      if (props.onBlur) props.onBlur(value);
      return value;
    });
  }

  function onCleat() {
    const value = "";
    setValue(() => {
      if (props.onChange) props.onChange(value);
      if (props.onBlur) props.onBlur(value);
      return value;
    });
  }

  return (
    <div
      className={`${cs.sheInput || ""} ${props.className || ""} ${icon ? cs.withIcon : ""}`}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cs.sheInputComponent}>
            {props.label && <label className="she-text">{props.label}</label>}
            <div className={cs.sheInputControl}>
              {icon && <div className={cs.iconBlock}>{icon}</div>}
              <Input
                value={value}
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                title={props.title}
                readOnly={props.readOnly}
                required={props.required}
                pattern={props.pattern}
                disabled={props.disabled || props.isLoading}
                maxLength={props.maxLength}
                minLength={props.minLength}
                autoFocus={props.autoFocus}
                aria-label={props["aria-label"]}
                onChange={(e) => onChange(e)}
                onBlur={(e) => onBlur(e)}
              />
              {props.showCleatBtn && (
                <SheButton variant="ghost" size="icon" onClick={onCleat}>
                  <X />
                </SheButton>
              )}
            </div>
            {props.error && (
              <div className={cs.errorMessageBlock}>
                <span className="she-text-error">{props.error}</span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        {props.showTooltip && <TooltipContent>{props.tooltip}</TooltipContent>}
      </Tooltip>
    </div>
  );
}
