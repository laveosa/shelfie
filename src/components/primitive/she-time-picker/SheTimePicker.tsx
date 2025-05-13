import React, { JSX, useEffect, useRef, useState } from "react";
import moment from "moment";

import cs from "./SheTimePicker.module.scss";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheIcon from "@/components/primitive/she-icon/SheIcon.tsx";
import SheTimePickerInput from "@/components/primitive/she-time-picker/components/she-time-picker-input/SheTimePickerInput.tsx";
import { Period } from "@/utils/helpers/time-picker-helper.ts";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";
import SheTimePickerSelect from "@/components/primitive/she-time-picker/components/she-time-picker-select/SheTimePickerSelect.tsx";
import { SheTimePickerTypeEnum } from "@/const/enums/SheTimePickerTypeEnum.ts";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";

export default function SheTimePicker({
  id,
  className = "",
  style,
  inputClassName = "",
  inputStyle,
  selectClassName = "",
  selectStyle,
  label,
  labelTransKey,
  icon,
  size,
  view,
  type = SheTimePickerTypeEnum.TIME_PICKER,
  hhLabel = size === "small" ? "hh" : "Hours",
  hhLabelTransKey,
  mmLabel = size === "small" ? "mm" : "Minutes",
  mmLabelTransKey,
  ssLabel = size === "small" ? "ss" : "Seconds",
  ssLabelTransKey,
  periodLabel = size === "small" ? "am/pm" : "Period",
  periodLabelTransKey,
  date,
  timeFormat,
  timePeriod,
  clockWorksheets = "24",
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
  periodsRef,
  autoFocus,
  onSetDate,
  onDelay,
  onBlur,
  ...props
}: ISheTimePicker): JSX.Element {
  const [_date, setDate] = useState<Date>(date ?? new Date());
  const [_period, setPeriod] = useState<Period>(timePeriod);
  const [_isDateValid, setIsDateValid] = useState<boolean>(null);

  const ariaDescribedbyId = `${generateId()}_TIME_PICKER_ID`;
  const delayValue = useDebounce(_date, delayTime);
  const isInitialized = useRef(false);

  const internalHourRef = React.useRef<HTMLInputElement>(null);
  const internalMinuteRef = React.useRef<HTMLInputElement>(null);
  const internalSecondRef = React.useRef<HTMLInputElement>(null);
  const internalPeriodRef = React.useRef<HTMLButtonElement>(null);

  const hourRef = hoursRef ?? internalHourRef;
  const minuteRef = minutesRef ?? internalMinuteRef;
  const secondRef = secondsRef ?? internalSecondRef;
  const periodRef = periodsRef ?? internalPeriodRef;

  useEffect(() => {
    if (date !== _date) {
      setDate(setDefaultDate(date));
    }

    checkDateValidation(date);
    configurePeriod(date);
  }, [date]);

  useEffect(() => {
    if (isInitialized.current && onDelay) {
      onDelay(
        timeFormat && delayValue
          ? moment(delayValue).format(timeFormat)
          : delayValue,
      );
    }
  }, [delayValue]);

  useEffect(() => {
    if (!_date || isNaN(_date.getTime())) return;

    if (
      type === SheTimePickerTypeEnum.CLOCK ||
      type === SheTimePickerTypeEnum.TIMER
    ) {
      const interval = setInterval(() => {
        const now = new Date();

        if (type === SheTimePickerTypeEnum.CLOCK) {
          setDate(now);
          checkDateValidation(now);
          configurePeriod(now);
        }

        if (type === SheTimePickerTypeEnum.TIMER) {
          const now = new Date();
          const msDiff = now.getTime() - (date?.getTime() || 0);

          const hours = Math.floor(msDiff / (1000 * 60 * 60));
          const minutes = Math.floor((msDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((msDiff % (1000 * 60)) / 1000);

          const newDate = new Date();
          newDate.setHours(hours);
          newDate.setMinutes(minutes);
          newDate.setSeconds(seconds);
          newDate.setMilliseconds(0);

          setDate(newDate);
          checkDateValidation(newDate);
          configurePeriod(newDate);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [type, _date]);

  // ==================================================================== EVENT

  function onSetDateHandler(value: Date) {
    isInitialized.current = true;
    checkDateValidation(value);
    setDate(value);

    if (onSetDate)
      onSetDate(timeFormat && value ? moment(value).format(timeFormat) : value);
  }

  function onSetPeriodHandler(period: Period) {
    setPeriod(period);
  }

  function onBlurHandler(value: Date) {
    if (onBlur)
      onBlur(timeFormat && value ? moment(value).format(timeFormat) : value);
  }

  function onClearHandler() {
    isInitialized.current = false;
    let newValue = setDefaultDate();
    checkDateValidation(newValue);
    setDate(newValue);

    if (onSetDate)
      onSetDate(timeFormat ? moment(newValue).format(timeFormat) : newValue);
    if (onDelay)
      onDelay(timeFormat ? moment(newValue).format(timeFormat) : newValue);
    if (onBlur)
      onBlur(
        timeFormat && newValue ? moment(newValue).format(timeFormat) : newValue,
      );
  }

  // ==================================================================== PRIVATE

  function setDefaultDate(value?: Date) {
    return value ?? new Date(new Date().setHours(0, 0, 0, 0));
  }

  function checkDateValidation(value: Date) {
    setIsDateValid(
      value && moment(value).format(TimeFormatEnum.HH_MM_SS) !== "00:00:00",
    );
  }

  function configurePeriod(value: Date) {
    if (timePeriod) return setPeriod(timePeriod);
    setPeriod(value?.getHours() >= 12 ? "PM" : "AM");
  }

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheTimePicker} ${className} ${cs[view] || ""} ${cs[type] || ""} ${cs[size] || ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
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
            <div
              className={`${cs.sheTimePickerElementInputCell} ${cs.sheTimePickerClockViewCell}`}
            >
              <SheTimePickerInput
                ref={hourRef}
                className={`${inputClassName} ${cs.sheTimePickerLabel}`}
                style={inputStyle}
                label={!hideInputLabels && hhLabel}
                labelTransKey={hhLabelTransKey}
                date={_date}
                picker={
                  clockWorksheets === "12" &&
                  type !== SheTimePickerTypeEnum.TIMER
                    ? "12hours"
                    : "hours"
                }
                period={_period}
                disabled={disabled}
                isLoading={isLoading}
                autoFocus={autoFocus}
                setDate={onSetDateHandler}
                onBlurHandler={onBlurHandler}
                onRightFocus={() => minuteRef.current?.focus()}
              />
            </div>
            <div
              className={`${cs.sheTimePickerElementInputCell} ${!hideSeconds ? cs.sheTimePickerClockViewCell : ""}`}
            >
              <SheTimePickerInput
                id={clockWorksheets === "12" ? "minutes12" : ""}
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
                onBlurHandler={onBlurHandler}
                onLeftFocus={() => hourRef.current?.focus()}
                onRightFocus={() =>
                  hideSeconds
                    ? periodRef.current?.focus()
                    : secondRef.current?.focus()
                }
              />
            </div>
            {!hideSeconds && (
              <div className={cs.sheTimePickerElementInputCell}>
                <SheTimePickerInput
                  id={clockWorksheets === "12" ? "seconds12" : ""}
                  ref={secondRef}
                  className={`${inputClassName} ${cs.sheTimePickerLabel}`}
                  style={inputStyle}
                  label={!hideInputLabels && ssLabel}
                  labelTransKey={ssLabelTransKey}
                  date={_date}
                  picker="seconds"
                  period={_period}
                  disabled={disabled}
                  isLoading={isLoading}
                  setDate={onSetDateHandler}
                  onBlurHandler={onBlurHandler}
                  onLeftFocus={() => minuteRef.current?.focus()}
                  onRightFocus={() => periodRef.current?.focus()}
                />
              </div>
            )}
            {clockWorksheets === "12" && (
              <div className={cs.sheTimePickerElementInputCell}>
                <SheTimePickerSelect
                  ref={periodRef}
                  className={`${selectClassName} ${cs.sheTimePickerLabel} ${cs.sheTimePickerSelect}`}
                  style={selectStyle}
                  label={!hideInputLabels && periodLabel}
                  labelTransKey={periodLabelTransKey}
                  date={_date}
                  period={_period}
                  disabled={disabled}
                  isLoading={isLoading}
                  setDate={onSetDateHandler}
                  setPeriod={onSetPeriodHandler}
                  onLeftFocus={() =>
                    hideSeconds
                      ? minuteRef.current?.focus()
                      : secondRef.current?.focus()
                  }
                />
              </div>
            )}
          </div>
          {type === SheTimePickerTypeEnum.TIME_PICKER && (
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
          )}
        </div>
      </div>
    </div>
  );
}
