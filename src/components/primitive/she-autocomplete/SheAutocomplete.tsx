import React, { JSX, useEffect, useState } from "react";

import { ISheAutocomplete } from "@/const/interfaces/primitive-components/ISheAutocomplete.ts";
import cs from "@/components/primitive/she-input/SheInput.module.scss";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export default function SheAutocomplete({
  id,
  className = "",
  style,
  elementClassName = "",
  elementStyle,
  label,
  labelTransKey,
  icon,
  value,
  items,
  placeholder = "enter text...",
  placeholderTransKey = "PLACE_VALID_TRANS_KEY",
  size = "sizeNormal",
  autoFocus,
  showClearBtn,
  tooltip,
  disabled,
  isLoading,
  minWidth,
  maxWidth,
  fullWidth,
  required,
  delayTime,
  onChange,
  onBlur,
  onDelay,
  onSelect,
  ...props
}: ISheAutocomplete): JSX.Element {
  const [_textValue, setTextValue] = useState<string>(null);

  const ariaDescribedbyId = `${generateId()}_AUTOCOMPLETE_ID`;

  useEffect(() => {
    if (value !== _textValue) {
      setTextValue(value);
    }
  }, [value]);

  // ==================================================================== EVENT

  function onChangeHandler(data: string) {
    setTextValue(data);
    if (onChange) onChange(data);
  }

  function onBlurHandler(data: string) {
    if (onBlur) onBlur(data);
  }

  function onClearHandler() {
    const newValue = "";
    setTextValue(newValue);

    if (onChange) onChange(newValue as any);
    if (onBlur) onBlur(newValue as any);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheInput} ${className}  ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
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
              icon={icon}
              className={cs.iconBlock}
              aria-describedby={ariaDescribedbyId}
            />
            <SheInput
              className={elementClassName}
              style={elementStyle}
              icon={icon}
              value={_textValue}
              placeholder={placeholder}
              placeholderTransKey={placeholderTransKey}
              size={size}
              showClearBtn={showClearBtn}
              autoFocus={autoFocus}
              disabled={disabled}
              isLoading={isLoading}
              delayTime={delayTime}
              fullWidth
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              {...props}
            />
          </SheSkeleton>
          <SheClearButton
            value={_textValue}
            showClearBtn={showClearBtn}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearHandler}
          />
        </div>
      </div>
    </div>
  );
}
