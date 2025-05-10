import React, { JSX, useEffect, useRef, useState } from "react";
import moment from "moment";

import cs from "./SheTimePicker.module.scss";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import SheTimePickerInput from "@/components/primitive/she-time-picker/components/SheTimePickerInput.tsx";
import { Period } from "@/utils/helpers/time-picker-helper.ts";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";

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
  dateFormat,
  timePeriod = "PM",
  timeFormat = "24",
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
  hideSeconds,
  hoursRef,
  minutesRef,
  secondsRef,
  onSetDate,
  onDelay,
  onIsValid,
  ...props
}: ISheTimePicker): JSX.Element {
  const [_date, setDate] = useState<Date>(date ?? new Date());
  const [_period, setPeriod] = useState<Period>(timePeriod);
  const [_isDateValid, setIsDateValid] = useState<boolean>(null);

  const ariaDescribedbyId = `${generateId()}_TIME_PICKER_ID`;
  const delayValue = useDebounce(_date, delayTime);
  const isInitialized = useRef(false);

  // TODO combine related inner props with this logic, if there is hoursRef === null then crete local useRef etc.
  const hourRef = React.useRef<HTMLInputElement>(null);
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (date !== _date) {
      setDate(date);
    }

    checkDateValidation(date);
  }, [date]);

  useEffect(() => {
    if (isInitialized.current && onDelay) {
      onDelay(
        dateFormat && delayValue
          ? moment(delayValue).format(dateFormat)
          : delayValue,
      );
    }
  }, [delayValue]);

  // ==================================================================== EVENT

  function onSetDateHandler(value) {
    isInitialized.current = true;
    checkDateValidation(value);
    setDate(value);

    if (onSetDate)
      onSetDate(dateFormat && value ? moment(value).format(dateFormat) : value);
  }

  function onClearHandler() {
    isInitialized.current = false;
    let newValue = new Date();
    newValue.setHours(0, 0, 0, 0);
    checkDateValidation(newValue);
    setDate(newValue);

    if (onSetDate)
      onSetDate(dateFormat ? moment(newValue).format(dateFormat) : newValue);
    if (onDelay)
      onDelay(dateFormat ? moment(newValue).format(dateFormat) : newValue);
  }

  // ==================================================================== PRIVATE

  function checkDateValidation(value: Date) {
    setIsDateValid(
      value && moment(value).format(TimeFormatEnum.HH_MM_SS) !== "00:00:00",
    );
  }

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
                date={_date}
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
                date={_date}
                picker="minutes"
                disabled={disabled}
                isLoading={isLoading}
                setDate={onSetDateHandler}
                onLeftFocus={() => hourRef.current?.focus()}
                onRightFocus={() => secondRef.current?.focus()}
              />
            </div>
            {!hideSeconds && (
              <div className={cs.sheTimePickerElementInputCell}>
                <SheTimePickerInput
                  ref={secondRef}
                  className={`${inputClassName} ${cs.sheTimePickerLabel}`}
                  style={inputStyle}
                  label={!hideInputLabels && ssLabel}
                  labelTransKey={ssLabelTransKey}
                  date={_date}
                  picker="seconds"
                  disabled={disabled}
                  isLoading={isLoading}
                  setDate={onSetDateHandler}
                  onLeftFocus={() => minuteRef.current?.focus()}
                />
              </div>
            )}
          </div>
          <SheClearButton
            value={_isDateValid ? _date : null}
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
