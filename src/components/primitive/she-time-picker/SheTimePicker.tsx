import React, { JSX, useEffect, useRef, useState } from "react";
import moment from "moment";
import _ from "lodash";

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
import { SheErrorMessageBlock } from "@/components/primitive/she-error-message-block/SheErrorMessageBlock.tsx";
import SheDescriptionBlock from "@/components/primitive/she-description-block/SheDescriptionBlock.tsx";

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
  startDate,
  endDate,
  timeFormat,
  timePeriod,
  clockWorksheets = "24",
  isValid = true,
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
  descriptionClassName,
  descriptionStyle,
  description,
  descriptionTransKey,
  showDescription,
  showError,
  error,
  errorTransKey,
  onSetDate,
  onDelay,
  onBlur,
  onTick,
  onIsValid,
  ...props
}: ISheTimePicker): JSX.Element {
  const [_date, setDate] = useState<Date>(date ?? new Date());
  const [_startDate, setStartDate] = useState<Date>(startDate ?? null);
  const [_period, setPeriod] = useState<Period>(timePeriod);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isDateValid, setIsDateValid] = useState<boolean>(null);
  const [_showError, setShowError] = useState(showError);
  const [_error, setError] = useState<string>(error ?? null);
  const [_errorTransKey, setErrorTransKey] = useState(errorTransKey ?? null);
  const [_description, setDescription] = useState<string>(description ?? null);
  const [_descriptionTransKey, setDescriptionTransKey] = useState(
    descriptionTransKey ?? null,
  );

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
  }, [delayValue, timeFormat, onDelay]);

  useEffect(() => {
    if (description !== _description) setDescription(description);
    if (descriptionTransKey !== _descriptionTransKey)
      setDescriptionTransKey(descriptionTransKey);

    if (_startDate && endDate && !_description) {
      setDescription(
        `from: ${moment(startDate).format(TimeFormatEnum.HH_MM_SS)} to: ${moment(endDate).format(TimeFormatEnum.HH_MM_SS)}`,
      );
      setDescriptionTransKey(
        "DESCRIPTION DEFAULT TEXT TRANS KET - add here when it will be created...",
      );
    }
  }, [description, descriptionTransKey]);

  useEffect(() => {
    let interval = null;

    if (type === SheTimePickerTypeEnum.TIMER) {
      if (!_startDate) {
        setStartDate(new Date());
        return;
      }

      interval = setInterval(() => {
        const now = new Date();
        const msDiff = now.getTime() - _startDate.getTime();

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
        validateTimerValue(newDate);

        if (onTick) {
          const start = _startDate ?? _date ?? new Date();
          onTick({
            startTime:
              timeFormat && start ? moment(start).format(timeFormat) : start,
            currentTime:
              timeFormat && newDate
                ? moment(newDate).format(timeFormat)
                : newDate,
          });
        }
      }, 1000);
    }

    if (type !== SheTimePickerTypeEnum.TIMER) {
      setStartDate(null);
    }

    if (type === SheTimePickerTypeEnum.CLOCK) {
      interval = setInterval(() => {
        const now = new Date();
        setDate(now);
        checkDateValidation(now);
        configurePeriod(now);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [type, _startDate]);

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
    return (value ?? type === SheTimePickerTypeEnum.CLOCK)
      ? new Date()
      : new Date(new Date().setHours(0, 0, 0, 0));
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

  function validateTimerValue(value: Date) {
    if (
      !value ||
      type !== SheTimePickerTypeEnum.TIMER ||
      (!startDate && !endDate)
    )
      return;

    if (moment(new Date()).isAfter(endDate)) {
      setError("expire time error");
      setErrorTransKey(
        "PLACE HERE VALID DEFAULT ERROR MESSAGE TRANS-KEY WHEN IT WILL BE AVAILABLE",
      );
      setShowError(!_.isNil(showError) ? showError : true);
      updateIsValid(false);
    } else {
      updateIsValid(true);
    }
  }

  function updateIsValid(value: boolean) {
    if (onIsValid) onIsValid(value);

    setIsValid(value);
  }

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheTimePicker} ${className} ${cs[view] || ""} ${cs[type] || ""} ${cs[size] || ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${!_isValid ? cs.invalid : ""}`}
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
        <SheDescriptionBlock
          className={descriptionClassName}
          style={descriptionStyle}
          description={_description}
          descriptionTransKey={_descriptionTransKey}
          showDescription={showDescription}
        />
        <SheErrorMessageBlock
          error={_error}
          errorTransKey={_errorTransKey}
          showError={_showError}
        />
      </div>
    </div>
  );
}
