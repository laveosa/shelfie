import React, { JSX, useEffect, useState } from "react";
import { Trans } from "react-i18next";

import { Check, Pencil, X } from "lucide-react";
import cs from "./SheInputEditor.module.scss";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheInputEditor } from "@/const/interfaces/primitive-components/ISheInputEditor.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";

export default function SheInputEditor(props: ISheInputEditor): JSX.Element {
  // ==================================================================== PROPS
  const {
    icon,
    value,
    noValuePlaceholder = "no text to display...",
    noValuePlaceholderTransKey = "PLACE_VALID_TRANS_KEY",
    disabled,
    isLoading,
    showClearBtn,
    isManage,
    saveOnBlur,
    inputProps,
    manageBtnProps,
    saveBtnProps,
    cancelBtnProps,
    onChange,
    onToggleManage,
    onSave,
    onCancel,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheInputEditor,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_textValue, setTextValue] = useState<string | number>("");
  const [_sourceValue, setSourceValue] = useState<string | number>("");
  const [_isManage, setIsManage] = useState<boolean>(isManage ?? false);

  // ==================================================================== UTILITIES
  const { ariaDescribedbyId } = useComponentUtilities({
    identifier: "ISheInputEditor",
  });

  // ==================================================================== SIDE EFFECTS
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

  // ==================================================================== EVENT HANDLERS
  function onChangeHandler(data: string | number, { event }) {
    const tmpValue = typeof data === "string" ? data.trim() : data;
    setTextValue(tmpValue);
    onChange?.(tmpValue, {
      value: tmpValue,
      model: props,
      event,
    });
  }

  function onBlurHandler(__, { event }) {
    if (saveOnBlur) onSaveHandler(event);
  }

  function onInputKeyDownHandler(event: React.KeyboardEvent) {
    if (event.code === "Enter") {
      onSaveHandler(event);
    }
  }

  function onToggleManageHandler(isManage: boolean) {
    setIsManage(isManage);
    onToggleManage?.(isManage);
  }

  function onSaveHandler(
    event: React.KeyboardEvent | React.MouseEvent | React.ChangeEvent,
  ) {
    setSourceValue(_textValue);
    onToggleManageHandler(false);
    onSave?.(_textValue, {
      value: _textValue,
      model: props,
      event,
    });
  }

  function onCancelHandler(event) {
    setTextValue(_sourceValue);
    onToggleManageHandler(false);
    onCancel?.(_sourceValue, {
      value: _sourceValue,
      model: props,
      event,
    });
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${shePrimitiveComponentWrapperProps.className} ${cs.sheInputEditor} ${icon ? cs.withIcon : ""}`}
      ariaDescribedbyId={ariaDescribedbyId}
      icon={null}
      showClearBtn={false}
    >
      <div className={cs.sheInputEditorControl}>
        {!_isManage && (
          <div className={cs.sheInputEditorTextContainer}>
            <SheIcon
              icon={icon}
              className={cs.iconBlock}
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
              className={cs.iconBlock}
              icon={Pencil}
              variant="ghost"
              disabled={disabled}
              isLoading={isLoading}
              size="small"
              onClick={() => onToggleManageHandler(true)}
              {...manageBtnProps}
            />
          </div>
        )}
        {_isManage && (
          <div className={cs.sheInputEditorInputContainer}>
            <SheInput
              icon={icon}
              value={_textValue}
              disabled={disabled}
              isLoading={isLoading}
              fullWidth
              autoFocus
              showClearBtn={showClearBtn}
              onKeyDown={onInputKeyDownHandler}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              {...inputProps}
            />
            <SheButton
              className={cs.iconBlock}
              icon={Check}
              variant="ghost"
              disabled={disabled || String(_sourceValue) === String(_textValue)}
              isLoading={isLoading}
              size="small"
              onClick={onSaveHandler}
              {...saveBtnProps}
            />
            <SheButton
              className={cs.iconBlock}
              icon={X}
              variant="ghost"
              disabled={disabled}
              isLoading={isLoading}
              onClick={onCancelHandler}
              size="small"
              {...cancelBtnProps}
            />
          </div>
        )}
      </div>
    </ShePrimitiveComponentWrapper>
  );
}
