import React, { JSX, useEffect, useRef, useState } from "react";
import moment from "moment";
import _ from "lodash";

import cs from "./SheTimePicker.module.scss";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import SheTimePickerInput from "@/components/primitive/she-time-picker/components/she-time-picker-input/SheTimePickerInput.tsx";
import SheTimePickerSelect from "@/components/primitive/she-time-picker/components/she-time-picker-select/SheTimePickerSelect.tsx";
import { SheTimePickerTypeEnum } from "@/const/enums/SheTimePickerTypeEnum.ts";
import { TimeFormatEnum } from "@/const/enums/TimeFormatEnum.ts";
import { Period } from "@/utils/helpers/time-picker-helper.ts";
import { useDebounce } from "@/utils/hooks/useDebounce.ts";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";

export default function SheTimePicker(props: ISheTimePicker): JSX.Element {
  // ==================================================================== PROPS
  const {
    inputClassName = "",
    inputStyle,
    selectClassName = "",
    selectStyle,
    size,
    type = SheTimePickerTypeEnum.TIME_PICKER,
    hhLabel = size === "small" || type !== SheTimePickerTypeEnum.TIME_PICKER
      ? "hh"
      : "Hours",
    hhLabelTransKey,
    mmLabel = size === "small" || type !== SheTimePickerTypeEnum.TIME_PICKER
      ? "mm"
      : "Minutes",
    mmLabelTransKey,
    ssLabel = size === "small" || type !== SheTimePickerTypeEnum.TIME_PICKER
      ? "ss"
      : "Seconds",
    ssLabelTransKey,
    periodLabel = size === "small" || type !== SheTimePickerTypeEnum.TIME_PICKER
      ? "am/pm"
      : "Period",
    periodLabelTransKey,
    date,
    startDate,
    endDate,
    timeFormat,
    timePeriod,
    clockWorksheets = "24",
    isValid = true,
    disabled,
    isLoading,
    delayTime,
    hideInputLabels,
    hideSeconds,
    hoursRef,
    minutesRef,
    secondsRef,
    periodsRef,
    autoFocus,
    description,
    descriptionTransKey,
    errorMessage,
    errorMessageTransKey,
    onSetDate,
    onDelay,
    onBlur,
    onTick,
    onIsValid,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheTimePicker,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_date, setDate] = useState<Date>(new Date());
  const [_startDate, setStartDate] = useState<Date>(startDate ?? null);
  const [_period, setPeriod] = useState<Period>(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isDateValid, setIsDateValid] = useState<boolean>(null);
  const [_description, setDescription] = useState<string>(null);
  const [_descriptionTransKey, setDescriptionTransKey] = useState<string>(null);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState<string>(null);
  const [_showError, setShowError] = useState<boolean>(
    !shePrimitiveComponentWrapperProps?.hideErrorMessage ?? null,
  );

  // ==================================================================== REFS
  const _isInitialized = useRef<boolean>(false);
  const _hourRef = useDefaultRef(hoursRef);
  const _minuteRef = useDefaultRef(minutesRef);
  const _secondRef = useDefaultRef(secondsRef);
  const _periodRef = useDefaultRef(periodsRef);

  // ==================================================================== UTILITIES
  const { ariaDescribedbyId } = useComponentUtilities({
    identifier: "SheTimePicker",
  });
  const delayValue = useDebounce(_date, delayTime);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    if (date && date !== _date) {
      setDate(setDefaultDate(date));
      checkDateValidation(date);
      configurePeriod(date);
    } else {
      checkDateValidation(_date);
      configurePeriod(_date);
    }
  }, [date]);

  useEffect(() => {
    if (timePeriod && timePeriod !== _period) setPeriod(timePeriod);
  }, [timePeriod]);

  useEffect(() => {
    if (_isInitialized.current && onDelay) {
      onDelay(
        timeFormat && delayValue
          ? moment(delayValue).format(timeFormat)
          : delayValue,
      );
    }
  }, [delayValue, timeFormat]);

  useEffect(() => {
    if (description !== _description) setDescription(description);
    if (descriptionTransKey !== _descriptionTransKey)
      setDescriptionTransKey(descriptionTransKey);

    if (_startDate && endDate && !_description) {
      setDescription(
        `from: ${moment(startDate).format(TimeFormatEnum.HH_MM_SS)} to: ${moment(endDate).format(TimeFormatEnum.HH_MM_SS)}`,
      );
      setDescriptionTransKey("TRANS_KEY");
    }
  }, [description, descriptionTransKey]);

  useEffect(() => {
    if (errorMessage !== _error) setError(errorMessage);
    if (errorMessageTransKey !== _errorTransKey)
      setErrorTransKey(errorMessageTransKey);
  }, [errorMessage, errorMessageTransKey]);

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

  // ==================================================================== EVENT HANDLERS
  function onSetDateHandler(value: Date) {
    _isInitialized.current = true;
    checkDateValidation(value);
    setDate(value);

    if (onSetDate)
      onSetDate(timeFormat && value ? moment(value).format(timeFormat) : value);
  }

  function onSetPeriodHandler(value: Period) {
    setPeriod(value);
  }

  function onBlurHandler(value: Date) {
    if (onBlur)
      onBlur(timeFormat && value ? moment(value).format(timeFormat) : value);
  }

  function onClearHandler() {
    _isInitialized.current = false;
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
      setErrorTransKey("TRANS-KEY");
      setShowError(!_.isNil(_showError) ? _showError : true);
      updateIsValid(false);
    } else {
      setError(shePrimitiveComponentWrapperProps.errorMessage);
      setErrorTransKey(shePrimitiveComponentWrapperProps.errorMessageTransKey);
      setShowError(false);
      updateIsValid(true);
    }
  }

  function updateIsValid(value: boolean) {
    if (onIsValid) onIsValid(value);

    setIsValid(value);
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${shePrimitiveComponentWrapperProps.className} ${cs.sheTimePicker} ${!hideInputLabels ? cs.sheTimePickerWithLabels : ""} ${cs[type] || ""} ${cs[size] || ""} ${!_isValid ? cs.invalid : ""}`}
      ariaDescribedbyId={ariaDescribedbyId}
      iconProps={{ className: cs.sheTimePickerIcon }}
      iconPosition="out"
      clearBtnPosition="out"
      clearBtnValue={_isDateValid ? _date : null}
      clearBtnClassName={`${shePrimitiveComponentWrapperProps.clearBtnClassName} ${cs.sheTimePickerClearButton}`}
      showClearBtn={
        type === SheTimePickerTypeEnum.TIME_PICKER &&
        shePrimitiveComponentWrapperProps.showClearBtn
      }
      description={_description}
      descriptionTransKey={_descriptionTransKey}
      errorMessage={_error}
      errorMessageTransKey={_errorTransKey}
      hideErrorMessage={!_showError}
      onClear={onClearHandler}
    >
      <div className={cs.sheTimePickerElementWrapper}>
        <div
          className={`${cs.sheTimePickerElementInputCell} ${cs.sheTimePickerClockViewCell}`}
        >
          <SheTimePickerInput
            ref={_hourRef}
            className={`${inputClassName} ${cs.sheTimePickerLabel}`}
            style={inputStyle}
            label={!hideInputLabels && hhLabel}
            labelTransKey={hhLabelTransKey}
            date={_date}
            picker={
              clockWorksheets === "12" && type !== SheTimePickerTypeEnum.TIMER
                ? "12hours"
                : "hours"
            }
            period={_period}
            disabled={disabled}
            isLoading={isLoading}
            autoFocus={autoFocus}
            setDate={onSetDateHandler}
            onBlurHandler={onBlurHandler}
            onRightFocus={() => _minuteRef.current?.focus()}
          />
        </div>
        <div
          className={`${cs.sheTimePickerElementInputCell} ${!hideSeconds ? cs.sheTimePickerClockViewCell : ""}`}
        >
          <SheTimePickerInput
            ref={_minuteRef}
            id={clockWorksheets === "12" ? "minutes12" : ""}
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
            onLeftFocus={() => _hourRef.current?.focus()}
            onRightFocus={() =>
              hideSeconds
                ? _periodRef.current?.focus()
                : _secondRef.current?.focus()
            }
          />
        </div>
        {!hideSeconds && (
          <div className={cs.sheTimePickerElementInputCell}>
            <SheTimePickerInput
              ref={_secondRef}
              id={clockWorksheets === "12" ? "seconds12" : ""}
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
              onLeftFocus={() => _minuteRef.current?.focus()}
              onRightFocus={() => _periodRef.current?.focus()}
            />
          </div>
        )}
        {clockWorksheets === "12" && (
          <div className={cs.sheTimePickerElementInputCell}>
            <SheTimePickerSelect
              ref={_periodRef}
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
                  ? _minuteRef.current?.focus()
                  : _secondRef.current?.focus()
              }
            />
          </div>
        )}
      </div>
    </ShePrimitiveComponentWrapper>
  );
}
