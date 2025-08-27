import React, { JSX, useEffect, useState } from "react";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import moment from "moment";
import _ from "lodash";

import cs from "./SheCalendar.module.scss";
import { Calendar } from "@/components/ui/calendar.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import useValueWithEvent from "@/utils/hooks/useValueWithEvent.ts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const startYear = getYear(new Date()) - 100;
const endYear = getYear(new Date()) + 100;
const years = Array.from(
  { length: endYear - startYear + 1 },
  (_, i) => startYear + i,
);

export default function SheCalendar(props: ISheCalendar): JSX.Element {
  // ==================================================================== PROPS
  const {
    calendarClassName = "",
    calendarStyle,
    date,
    time,
    timePicker,
    dateFormat,
    markedDates,
    mode = "single",
    minAmountOfDates,
    maxAmountOfDates,
    disabled,
    isLoading,
    hideTimePicker,
    onSelectDate,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheCalendar,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);

  // ==================================================================== STATE MANAGEMENT
  const [_date, setDate] = React.useState<
    | string
    | string[]
    | Date
    | Date[]
    | (Date | string)[]
    | { from: Date; to: Date }
    | { from: string; to: string }
    | { from: Date | string; to: Date | string }
  >(null);
  const [_selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()],
  );
  const [_selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [_selectedTime, setSelectedTime] = useState<Date>(time ?? new Date());

  // ==================================================================== UTILITIES
  const { ariaDescribedbyId, updateFormValue, resetFormField } =
    useComponentUtilities<ISheCalendar>({
      props,
      identifier: "SheCalendar",
    });
  const markedParsedDates = React.useMemo(() => {
    if (!Array.isArray(markedDates)) return null;
    return (markedDates || [])
      .map(_parseCalendarSingleDate)
      .filter(Boolean) as Date[];
  }, [markedDates]);
  const {
    eventHandler: eventSelectDateHandler,
    valueHandler: valueSelectDateHandler,
  } = useValueWithEvent<any, any>(onSelectDateHandler);

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    const parsed: Date | Date[] | { from: Date; to: Date } =
      _parseValidDate(date);

    if (parsed && !_.isEqual(parsed, _date)) {
      const convertedDate = _getParsedModel(parsed);
      updateFormValue(parsed);
      setDate(parsed);
      setSelectedMonth(months[getMonth(convertedDate)]);
      setSelectedYear(getYear(convertedDate));
    }
  }, [date]);

  // ==================================================================== EVENT HANDLERS
  function onMonthSelectHandler(month: string) {
    setTimeout(() => {
      setSelectedMonth(month);
    });
  }

  function onYearSelectHandler(year: number) {
    setTimeout(() => {
      setSelectedYear(year);
    });
  }

  function onSelectDateHandler(selectedDate, event) {
    const normalizedDate =
      _inferCalendarMode(selectedDate) === "multiple"
        ? _sortDateListByDate(selectedDate)
        : selectedDate;

    if (normalizedDate !== _date) setDate(normalizedDate);

    const dateWithTime = _formatSelectedDateModel(normalizedDate);
    updateFormValue(dateWithTime);
    setDate(dateWithTime);
    onSelectDate?.(dateWithTime, {
      value: dateWithTime,
      model: props,
      event,
    });
  }

  function onClearHandler(event: React.MouseEvent) {
    setDate(null);
    setSelectedTime(null);
    setSelectedMonth(months[new Date().getMonth()]);
    setSelectedYear(new Date().getFullYear());
    resetFormField(null);
    onSelectDate?.(null, {
      value: null,
      model: props,
      event,
    });
  }

  function onTimeChangeHandler(value: Date) {
    setSelectedTime(value);
  }

  function onTimeDelayHandler(value: Date, { event }) {
    setSelectedTime(value);
    const dateWithTime = _formatSelectedDateModel(_date, value);

    setTimeout(() => {
      updateFormValue(dateWithTime);
    }, 100);

    onSelectDate?.(dateWithTime, {
      value: dateWithTime,
      model: props,
      event,
    });
  }

  // ==================================================================== PRIVATE
  function _getParsedModel(parsed: any): Date {
    switch (_inferCalendarMode(parsed)) {
      case "multiple":
        return parsed[parsed.length - 1];
      case "range":
        return parsed.to;
      case "single":
        return parsed as Date;
    }
  }

  function _inferCalendarMode(value: any): "single" | "multiple" | "range" {
    if (_isCalendarMultipleDateValue(value)) return "multiple";
    if (_isCalendarRangeDateValue(value)) return "range";
    if (_isCalendarSingleDateValue(value)) return "single";
    return null;
  }

  // -------------------------------------------------------------- DATE FORMAT AND SORT

  function _formatSelectedDateModel(
    selectedDate: any,
    timeOverride?: Date,
  ): any {
    const timeToUse: Date = timeOverride ?? _selectedTime;

    if (_isCalendarMultipleDateValue(selectedDate)) {
      return selectedDate.map((item) => {
        item = _combineDateAndTime(item as Date, timeToUse);
        return dateFormat ? moment(item).format(dateFormat) : item;
      });
    }

    if (_isCalendarRangeDateValue(selectedDate)) {
      selectedDate.from = _combineDateAndTime(
        selectedDate.from as Date,
        timeToUse,
      );
      selectedDate.to = _combineDateAndTime(selectedDate.to as Date, timeToUse);

      const dateRangeModel = {
        from: selectedDate.from
          ? dateFormat
            ? moment(selectedDate.from).format(dateFormat)
            : selectedDate.from
          : null,
        to: selectedDate.to
          ? dateFormat
            ? moment(selectedDate.to).format(dateFormat)
            : selectedDate.to
          : null,
      };

      if (dateRangeModel?.from && dateRangeModel?.to) {
        return dateRangeModel;
      }
    }

    if (_isCalendarSingleDateValue(selectedDate)) {
      selectedDate = _combineDateAndTime(selectedDate as Date, timeToUse);
      return dateFormat
        ? moment(selectedDate).format(dateFormat)
        : selectedDate;
    }
  }

  function _sortDateListByDate(list: Date[]): Date[] {
    if (!list || list.length === 0) return null;
    return list.sort((a, b) => b.getTime() - a.getTime()).reverse();
  }

  function _normalizeDateFormat(input: string | Date): string {
    const date = typeof input === "string" ? new Date(input) : input;

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function _combineDateAndTime(datePart: Date, timePart: Date): Date {
    if (!datePart || !timePart) return datePart;

    const combined = new Date(datePart);
    combined.setHours(timePart.getHours());
    combined.setMinutes(timePart.getMinutes());
    combined.setSeconds(timePart.getSeconds());
    combined.setMilliseconds(timePart.getMilliseconds());

    return combined;
  }

  // -------------------------------------------------------------- CALENDAR MODE DETECTION

  function _isCalendarMultipleDateValue(value: unknown): boolean {
    if (!value || !Array.isArray(value) || value.length === 0) return null;

    let isValueDates = true;
    const invalidDateIndexes: number[] = [];

    for (const item of value) {
      if (isValueDates) {
        isValueDates = !!_parseCalendarSingleDate(item);
      }

      if (!_parseCalendarSingleDate(item)) {
        invalidDateIndexes.push(value.indexOf(item));
      }
    }

    if (invalidDateIndexes.length > 0) {
      console.error(
        "Invalid Multiple Date value indexes: ",
        invalidDateIndexes,
      );
    }

    return isValueDates;
  }

  function _isCalendarRangeDateValue(
    value: any,
  ): value is { from: Date | string; to: Date | string } {
    return (
      value &&
      typeof value === "object" &&
      "from" in value &&
      "to" in value &&
      (typeof (value as any).from === "string" ||
        (value as any).from instanceof Date) &&
      (typeof (value as any).to === "string" ||
        (value as any).to instanceof Date) &&
      !!_parseCalendarSingleDate(value.from) &&
      !!_parseCalendarSingleDate(value.to)
    );
  }

  function _isCalendarSingleDateValue(value: any): boolean {
    if (!value || (typeof value === "object" && value.from)) return null;

    const tmpDate: Date = _parseCalendarSingleDate(value);

    if (!tmpDate) {
      console.error("Invalid single Date value : ", value);
    }

    return tmpDate && typeof tmpDate === "object";
  }

  // -------------------------------------------------------------- DATE PARSERS

  function _parseValidDate(
    value: any,
  ): Date | Date[] | { from: Date; to: Date } {
    if (!value) return null;

    switch (_inferCalendarMode(value)) {
      case "multiple":
        return _parseCalendarMultipleDate(value);
      case "range":
        return _parseCalendarRangeDate(value);
      case "single":
        return _parseCalendarSingleDate(value);
      default: {
        console.error("Invalid date to parse: ", value);
        return null;
      }
    }
  }

  function _parseCalendarMultipleDate(
    value: string[] | Date[] | (string | Date)[],
  ): Date[] | null {
    if (!_isCalendarMultipleDateValue(value)) return null;

    const dateList = value
      .map((item) => {
        const date = new Date(_normalizeDateFormat(item));
        if (isNaN(date.getTime())) {
          console.warn("Invalid date:", item);
          return null;
        }
        return date;
      })
      .filter(Boolean) as Date[];

    return _sortDateListByDate(dateList);
  }

  function _parseCalendarRangeDate(
    value:
      | { from: string; to: string }
      | { from: Date; to: Date }
      | { from: string | Date; to: string | Date },
  ): { from: Date; to: Date } | null {
    if (!_isCalendarRangeDateValue(value)) return null;

    const from = new Date(_normalizeDateFormat(value.from));
    let to = new Date(_normalizeDateFormat(value.to));

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
      console.error("Invalid date input.");
      return null;
    }

    if (moment(from).isSameOrAfter(to)) {
      console.error(`FROM: "${from}" date can't be after TO: "${to}" date!`);
      const fromDateCopy = _.clone(from);
      to = new Date(fromDateCopy.setDate(fromDateCopy.getDate() + 1));
    }

    return { from, to };
  }

  function _parseCalendarSingleDate(value: string | Date): Date | null {
    if (!value) return null;

    if (value instanceof Date && !isNaN(value.getTime())) return value;

    if (typeof value === "string") {
      const patterns = [
        /\b(\d{2})[./-](\d{2})[./-](\d{4})\b/, // MM.DD.YYYY / MM-DD-YYYY / MM/DD/YYYY
      ];
      value = _normalizeDateFormat(value);

      for (const pattern of patterns) {
        const match = value.match(pattern);
        if (match) {
          const [_, mm, dd, yyyy] = match;
          const date = new Date(+yyyy, +mm - 1, +dd);
          if (!isNaN(date.getTime())) return date;
        }
      }
    }

    return null;
  }

  // ==================================================================== LAYOUT

  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${shePrimitiveComponentWrapperProps.className} ${cs.sheCalendar}`}
      ariaDescribedbyId={ariaDescribedbyId}
      iconPosition="out"
      clearBtnPosition="out"
      clearBtnValue={_date && _date.toString().length > 0}
      clearBtnClassName={`${shePrimitiveComponentWrapperProps.clearBtnClassName} ${cs.sheCalendarClearButton}`}
      onClear={onClearHandler}
    >
      <div className={cs.sheCalendarContextBlock}>
        <div className={cs.sheCalendarFilterContainer}>
          <SheSelect<string>
            items={months.map(
              (item): ISheSelectItem<string> => ({
                text: item.toString(),
                value: item,
              }),
            )}
            placeholder="Month"
            selected={_selectedMonth}
            hideFirstOption
            maxWidth="138px"
            minWidth="122px"
            isLoading={isLoading}
            onSelect={onMonthSelectHandler}
          />
          <SheSelect<number>
            items={years.map(
              (item): ISheSelectItem<number> => ({
                text: item.toString(),
                value: item,
              }),
            )}
            placeholder="Year"
            selected={_selectedYear}
            hideFirstOption
            maxWidth="138px"
            minWidth="122px"
            isLoading={isLoading}
            onSelect={onYearSelectHandler}
          />
        </div>
        <SheSkeleton isLoading={isLoading} fullWidth>
          <div
            className={cs.sheCalendarElementContainer}
            onClick={eventSelectDateHandler}
          >
            <Calendar
              className={`${cs.sheCalendarElement} ${calendarClassName} ${disabled || isLoading ? "disabled" : ""}`}
              style={calendarStyle}
              mode={date ? _inferCalendarMode(date) : mode}
              selected={_date as any}
              month={setMonth(
                setYear(new Date(), _selectedYear),
                months.indexOf(_selectedMonth),
              )}
              modifiers={{
                marked: markedParsedDates,
              }}
              modifiersClassNames={{
                marked: cs.markedDay,
                today: cs.today,
              }}
              min={minAmountOfDates}
              max={maxAmountOfDates}
              onMonthChange={(value) =>
                setSelectedMonth(months[getMonth(value)])
              }
              onSelect={(value) =>
                setTimeout(() => valueSelectDateHandler(value))
              }
            />
            {!hideTimePicker && (
              <>
                <div className="divider"></div>
                <SheTimePicker
                  className={cs.sheCalendarTimePicker}
                  date={_selectedTime}
                  showClearBtn
                  isLoading={isLoading}
                  disabled={!_date}
                  delayTime={1600}
                  fullWidth
                  onSetDate={onTimeChangeHandler}
                  onDelay={onTimeDelayHandler}
                  {...timePicker}
                />
              </>
            )}
          </div>
        </SheSkeleton>
      </div>
    </ShePrimitiveComponentWrapper>
  );
}
