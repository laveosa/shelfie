import React, { JSX, useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";

import cs from "./SheTextArea.module.scss";
import { Textarea } from "@/components/ui/textarea.tsx";
import { ISheTextarea } from "@/const/interfaces/primitive-components/ISheTextarea.ts";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import SheTooltip from "@/components/complex/she-tooltip/SheTooltip.tsx";
import { generateId, isSheIconConfig } from "@/utils/helpers/quick-helper.ts";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import { X } from "lucide-react";

export default function SheTextArea({
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
  required,
  showClearBtn,
  tooltip,
  disabled,
  resize,
  style,
  onChange,
  onBlur,
  onDelay,
  ...props
}: ISheTextarea): JSX.Element {
  const { translate } = useAppTranslation();
  const [_value, setValue] = useState<any>(null);

  const ariaDescribedbyId = `${generateId()}_INPUT_ID`;
  const iconToRender = icon;
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
    if (onChange) onChange(newValue);
  }

  function onBlurHandler(e) {
    isTouched.current = true;
    const newValue = e.target.value;
    if (onBlur) onBlur(newValue);
  }

  function onClearHandler() {
    isInitialized.current = false;
    isTouched.current = false;

    const newValue = "";
    setValue(newValue);

    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <div
      className={`${className || ""} ${cs.sheTextArea || ""} ${iconToRender ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${resize ? cs.resize : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <SheTooltip {...tooltip}>
        <div className={cs.sheTextAreaComponent}>
          {label && (
            <label className="she-text" aria-describedby={ariaDescribedbyId}>
              <Trans i18nKey={labelTransKey}>{label}</Trans>
            </label>
          )}
          <div className={cs.sheTextAreaControl}>
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
            <Textarea
              {...props}
              value={_value || ""}
              placeholder={translate(placeholderTransKey, placeholder)}
              aria-describedby={ariaDescribedbyId}
              disabled={disabled || isLoading}
              onChange={(e) => onChangeHandler(e)}
              onBlur={(e) => onBlurHandler(e)}
            />
            {showClearBtn && (
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
        </div>
      </SheTooltip>
    </div>
  );
}
