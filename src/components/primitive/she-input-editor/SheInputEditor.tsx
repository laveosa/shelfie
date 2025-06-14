import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";

import cs from "./SheInputEditor.module.scss";
import { ISheInputEditor } from "@/const/interfaces/primitive-components/ISheInputEditor.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import { Check, Pencil, X } from "lucide-react";

export default function SheInputEditor({
  id,
  className = "",
  style,
  textClassName = "",
  textStyle,
  label,
  labelTransKey,
  icon,
  value,
  noValuePlaceholder = "no text to display...",
  noValuePlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
  tooltip,
  disabled,
  isLoading,
  minWidth,
  maxWidth,
  fullWidth,
  required,
  isManage,
  size = "sizeNormal",
  inputProps,
  manageBtnProps,
  saveBtnProps,
  cancelBtnProps,
  onChange,
  onToggleManage,
  onSave,
  onCancel,
  ...props
}: ISheInputEditor): JSX.Element {
  const [_textValue, setTextValue] = useState<string | number>(null);
  const [_sourceValue, setSourceValue] = useState<string | number>(null);
  const [_isManage, setIsManage] = useState<boolean>(isManage ?? false);

  const ariaDescribedbyId = `${generateId()}_INPUT_EDITOR_ID`;

  useEffect(() => {
    const convertedValue = Array.isArray(value) ? value.join("\n") : value;

    if (convertedValue !== _textValue) {
      setSourceValue(convertedValue);
      setTextValue(convertedValue);
    }
  }, [value]);

  useEffect(() => {
    if (_isManage !== isManage) setIsManage(isManage);
  }, [isManage]);

  // ==================================================================== EVENT

  function onChangeHandler(data: string | number) {
    const tmpValue = typeof data === "string" ? data.trim() : data;
    setTextValue(tmpValue);
    if (onChange) onChange(tmpValue);
  }

  function onToggleManageHandler(isManage: boolean) {
    setIsManage(isManage);
    if (onToggleManage) onToggleManage(isManage);
  }

  function onSaveHandler() {
    setSourceValue(_textValue);
    onToggleManageHandler(false);
    if (onSave) onSave(_textValue);
  }

  function onCancelHandler() {
    setTextValue(_sourceValue);
    onToggleManageHandler(false);
    if (onCancel) onCancel(_sourceValue);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheInputEditor} ${className}  ${icon ? cs.withIcon : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheInputEditorComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.sheInputEditorControl}>
          {!_isManage && (
            <div className={cs.sheInputEditorTextContainer}>
              <SheIcon
                icon={icon}
                className={cs.iconBlock}
                size={size}
                aria-describedby={ariaDescribedbyId}
              />
              <div
                className={`${cs.sheInputEditorTextBlock} ${disabled || isLoading ? "disabled" : ""}`}
              >
                {_textValue && <span className="she-text">{_textValue}</span>}
                {!_textValue && (
                  <span className="she-placeholder">
                    <Trans i18nKey={noValuePlaceholderTransKey}>
                      {noValuePlaceholder}
                    </Trans>
                  </span>
                )}
              </div>
              <SheButton
                icon={Pencil}
                variant="ghost"
                view="viewCircle"
                size={size}
                disabled={disabled}
                isLoading={isLoading}
                onClick={() => onToggleManageHandler(true)}
              />
            </div>
          )}
          {_isManage && (
            <div className={cs.sheInputEditorInputContainer}>
              <SheInput
                icon={icon}
                value={_textValue}
                size={size}
                disabled={disabled}
                isLoading={isLoading}
                fullWidth
                autoFocus
                onChange={onChangeHandler}
                {...{ ...props, ...inputProps }}
              />
              <SheButton
                icon={Check}
                variant="ghost"
                view="viewCircle"
                size={size}
                disabled={disabled || _sourceValue === _textValue}
                isLoading={isLoading}
                onClick={onSaveHandler}
              />
              <SheButton
                icon={X}
                variant="ghost"
                view="viewCircle"
                size={size}
                disabled={disabled}
                isLoading={isLoading}
                onClick={onCancelHandler}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
