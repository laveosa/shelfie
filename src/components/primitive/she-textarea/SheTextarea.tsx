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
  delayTime,
  rows = 4,
  style,
  onChange,
  onBlur,
  onDelay,
  ...props
}: ISheTextarea): JSX.Element {
  const { translate } = useAppTranslation();
  const [textValue, setTextValue] = useState<
    string | number | readonly string[]
  >("");

  const ariaDescribedbyId = `${generateId()}_INPUT_ID`;
  const delayValue = useDebounce(textValue, delayTime);
  const isInitialized = useRef(false);
  const isTouched = useRef(false);

  useEffect(() => {
    const converted = Array.isArray(value) ? value.join("\n") : value;
    if (converted !== textValue) {
      setTextValue(converted);
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
    setTextValue(newValue);
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
    setTextValue(newValue);

    if (onChange) onChange(newValue);
    if (onBlur) onBlur(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== RENDER

  return (
    <div
      className={`${className || ""} ${cs.sheTextArea || ""} ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${resize ? cs.resize : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheTextAreaComponent}>
        {(label || tooltip) && (
          <label
            className="she-text"
            htmlFor={ariaDescribedbyId}
            aria-describedby={ariaDescribedbyId}
          >
            <Trans i18nKey={labelTransKey}>{label}</Trans>
            {tooltip?.text?.length > 0 && (
              <SheTooltip
                {...tooltip}
                id={ariaDescribedbyId}
                side={"right"}
                align={"end"}
              >
                <div className={cs.tooltipIcon}>!</div>
              </SheTooltip>
            )}
          </label>
        )}
        <div className={cs.sheTextAreaControl}>
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
            value={textValue ?? ""}
            placeholder={translate(placeholderTransKey, placeholder)}
            aria-describedby={ariaDescribedbyId}
            disabled={disabled || isLoading}
            rows={rows}
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
                !textValue ||
                textValue.toString().length === 0 ||
                disabled ||
                isLoading
              }
              onClick={onClearHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}
