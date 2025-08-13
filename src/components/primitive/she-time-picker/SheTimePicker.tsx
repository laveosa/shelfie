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
import useDefaultRef from "@/utils/hooks/useDefaultRef.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheTimePicker } from "@/const/interfaces/primitive-components/ISheTimePicker.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import { IOutputEventModel } from "@/const/interfaces/IOutputEventModel.ts";

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
  const [_date, setDate] = useState<Date>(
    new Date(new Date().setHours(0, 0, 0, 0)),
  );
  const [_startDate, setStartDate] = useState<Date>(startDate ?? null);
  const [_period, setPeriod] = useState<Period>(null);
  const [_isValid, setIsValid] = useState(isValid);
  const [_isDateValid, setIsDateValid] = useState<boolean>(null);
  const [_description, setDescription] = useState<string>(null);
  const [_descriptionTransKey, setDescriptionTransKey] = useState<string>(null);
  const [_error, setError] = useState<string>(null);
  const [_errorTransKey, setErrorTransKey] = useState<string>(null);
  const [_showError, setShowError] = useState<boolean>(
    !shePrimitiveComponentWrapperProps?.hideErrorMessage,
  );
  const [_isHighlighted, setIsHighlighted] = useState<boolean>(null);

  // ==================================================================== REFS
  const _isInitialized = useRef<boolean>(false);
  const _hourRef = useDefaultRef(hoursRef);
  const _minuteRef = useDefaultRef(minutesRef);
  const _secondRef = useDefaultRef(secondsRef);
  const _periodRef = useDefaultRef(periodsRef);
  const _lastEventDataRef = useRef<any>(null);
  const _sourceValue = useRef<Date>(new Date(new Date().setHours(0, 0, 0, 0)));

  // ==================================================================== UTILITIES
  const { ariaDescribedbyId } = useComponentUtilities({
    identifier: "SheTimePicker",
  });
  const delayValue = useDebounce(_date, delayTime);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setIsHighlighted(false);

    console.log("DATE: ", date);

    if (date && date !== _date) {
      const defaultDate = _setDefaultDate(date);
      setDate(defaultDate);
      _sourceValue.current = defaultDate;
      _checkDateValidation(date);
      _configurePeriod(date);
    } else {
      _checkDateValidation(_date);
      _configurePeriod(_date);
      _sourceValue.current = _date;
    }
  }, [date]);

  useEffect(() => {
    if (timePeriod && timePeriod !== _period) setPeriod(timePeriod);
  }, [timePeriod]);

  useEffect(() => {
    if (_isInitialized.current && onDelay) {
      const outputModel = _getOutputModel(
        delayValue,
        _lastEventDataRef.current,
      );

      onDelay(outputModel.value, outputModel.model);
    }
  }, [delayValue, timeFormat]);

  useEffect(() => {
    if (description !== _description) setDescription(description);
    if (descriptionTransKey !== _descriptionTransKey)
      setDescriptionTransKey(descriptionTransKey);

    if ((_startDate || endDate) && !_description) {
      setDescription(
        `from: ${startDate ? moment(startDate).format(TimeFormatEnum.HH_MM_SS) : "not set"} to: ${endDate ? moment(endDate).format(TimeFormatEnum.HH_MM_SS) : "not set"}`,
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
        _checkDateValidation(newDate);
        _configurePeriod(newDate);
        _validateTimerValue(newDate);

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
        _checkDateValidation(now);
        _configurePeriod(now);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [type, _startDate]);

  // ==================================================================== EVENT HANDLERS
  function onSetDateHandler(
    value: Date,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    _isInitialized.current = true;
    _checkDateValidation(value);
    setDate(value);
    const outputModel = _getOutputModel(value, event);
    onSetDate?.(outputModel.value, outputModel.model);
  }

  function onSetPeriodHandler(value: Period) {
    setPeriod(value);
  }

  function onBlurHandler(
    value: Date,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const outputModel = _getOutputModel(value, event);
    setIsHighlighted(!_.isEqual(_sourceValue.current, outputModel.value));
    onBlur?.(outputModel.value, outputModel.model);
  }

  function onClearHandler(event: React.MouseEvent | React.KeyboardEvent) {
    _isInitialized.current = false;
    const value = _setDefaultDate();
    const outputModel = _getOutputModel(value, event);

    _checkDateValidation(value);
    setDate(value);
    onSetDate?.(outputModel.value, outputModel.model);
    onDelay?.(outputModel.value, outputModel.model);
    onBlur?.(outputModel.value, outputModel.model);
  }

  // ==================================================================== PRIVATE
  function _setDefaultDate(value?: Date) {
    return value ?? new Date(new Date().setHours(0, 0, 0, 0));
  }

  function _checkDateValidation(value: Date) {
    setIsDateValid(
      value && moment(value).format(TimeFormatEnum.HH_MM_SS) !== "00:00:00",
    );
  }

  function _configurePeriod(value: Date) {
    if (timePeriod) return setPeriod(timePeriod);
    setPeriod(value?.getHours() >= 12 ? "PM" : "AM");
  }

  function _validateTimerValue(value: Date) {
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
      _updateIsValid(false);
    } else {
      setError(shePrimitiveComponentWrapperProps.errorMessage);
      setErrorTransKey(shePrimitiveComponentWrapperProps.errorMessageTransKey);
      setShowError(false);
      _updateIsValid(true);
    }
  }

  function _updateIsValid(value: boolean) {
    setIsValid(value);
    onIsValid?.(value);
  }

  function _getValueWithTimeFormat(value: Date) {
    return timeFormat && value ? moment(value).format(timeFormat) : value;
  }

  function _getOutputModel(
    value: Date,
    event: any,
  ): {
    value: any;
    model?: IOutputEventModel<any, ISheTimePicker, any>;
  } {
    _lastEventDataRef.current = event;
    const outputValue = _getValueWithTimeFormat(value);
    const outputModel = {
      value: outputValue,
      model: props,
      event: _lastEventDataRef.current,
    };

    return {
      value: outputValue,
      model: outputModel,
    };
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
      clearBtnValue={
        moment(_date).format(TimeFormatEnum.HH_MM_SS) !== "00:00:00"
      }
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
            className={`${inputClassName} ${cs.sheTimePickerLabel} ${_isHighlighted ? cs.highlighted : ""}`}
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
            className={`${inputClassName} ${cs.sheTimePickerLabel} ${_isHighlighted ? cs.highlighted : ""}`}
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
              className={`${inputClassName} ${cs.sheTimePickerLabel} ${_isHighlighted ? cs.highlighted : ""}`}
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
        {clockWorksheets === "12" &&
          type === SheTimePickerTypeEnum.TIME_PICKER && (
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
