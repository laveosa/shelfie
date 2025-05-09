import React, { JSX, useEffect, useRef, useState } from "react";

import cs from "./SheTimePicker.module.scss";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import SheTimePickerInput from "@/components/primitive/she-time-picker/components/SheTimePickerInput.tsx";

export default function SheTimePicker({
  id,
  className = "",
  style,
  inputClassName,
  inputStyle,
  label,
  labelTransKey,
  icon,
  size,
  view,
  hhLabel = size === "small" ? "hh" : "Hours",
  hhLabelTransKey,
  mmLabel = size === "small" ? "mm" : "Minutes",
  mmLabelTransKey,
  ssLabel = size === "small" ? "ss" : "Seconds",
  ssLabelTransKey,
  date,
  showClearBtn,
  tooltip,
  disabled,
  isLoading,
  minWidth,
  maxWidth,
  fullWidth,
  required,
  delayTime,
  hideInputLabels,
  hoursRef,
  minutesRef,
  secondsRef,
  onSetDate,
  onDelay,
  onIsValid,
  ...props
}: ISheTimePicker): JSX.Element {
  const [_date, setDate] = useState<Date>(null);

  const ariaDescribedbyId = `${generateId()}_TIME_PICKER_ID`;
  const delayValue = useDebounce(date, delayTime);
  const isInitialized = useRef(false);

  // TODO combine related inner props with this logic, if there is hoursRef === null then crete local useRef etc.
  const hourRef = React.useRef<HTMLInputElement>(null);
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (date !== _date) {
      setDate(date);
    }
  }, [date]);

  /*useEffect(() => {
    if (isInitialized.current && onDelay) {
      onDelay(delayValue);
    }
  }, [delayValue]);*/

  // ==================================================================== EVENT

  function onSetDateHandler(value) {
    isInitialized.current = true;
    setDate(value);

    if (onSetDate) onSetDate(value);
  }

  function onClearHandler() {
    isInitialized.current = false;
    const newValue = new Date();
    setDate(newValue);

    if (onSetDate) onSetDate(newValue);
    if (onDelay) onDelay(newValue);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheTimePicker} ${className} ${cs[view] || ""} ${cs[size] || ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
      {...props}
    >
      <div className={cs.sheTimePickerComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.sheTimePickerControl}>
          <SheIcon
            icon={icon}
            className={cs.iconBlock}
            style={{ top: hideInputLabels ? "0" : "7px" }}
            aria-describedby={ariaDescribedbyId}
          />
          <div className={cs.sheTimePickerElementWrapper}>
            <div className={cs.sheTimePickerElementInputCell}>
              <SheTimePickerInput
                ref={hourRef}
                className={`${inputClassName} ${cs.sheTimePickerLabel}`}
                style={inputStyle}
                label={!hideInputLabels && hhLabel}
                labelTransKey={hhLabelTransKey}
                date={date}
                picker="hours"
                disabled={disabled}
                isLoading={isLoading}
                setDate={onSetDateHandler}
                onRightFocus={() => minuteRef.current?.focus()}
              />
            </div>
            <div className={cs.sheTimePickerElementInputCell}>
              <SheTimePickerInput
                ref={minuteRef}
                className={`${inputClassName} ${cs.sheTimePickerLabel}`}
                style={inputStyle}
                label={!hideInputLabels && mmLabel}
                labelTransKey={mmLabelTransKey}
                date={date}
                picker="minutes"
                disabled={disabled}
                isLoading={isLoading}
                setDate={onSetDateHandler}
                onLeftFocus={() => hourRef.current?.focus()}
                onRightFocus={() => secondRef.current?.focus()}
              />
            </div>
            <div className={cs.sheTimePickerElementInputCell}>
              <SheTimePickerInput
                ref={secondRef}
                className={`${inputClassName} ${cs.sheTimePickerLabel}`}
                style={inputStyle}
                label={!hideInputLabels && ssLabel}
                labelTransKey={ssLabelTransKey}
                date={date}
                picker="seconds"
                disabled={disabled}
                isLoading={isLoading}
                setDate={onSetDateHandler}
                onLeftFocus={() => minuteRef.current?.focus()}
              />
            </div>
          </div>
          <SheClearButton
            value={date}
            showClearBtn={showClearBtn}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            style={{
              alignSelf: "end",
              position: "relative",
              top: size === "small" ? "0px" : "-4px",
            }}
            onClear={onClearHandler}
          />
        </div>
      </div>
    </div>
  );
}
