import React, { JSX, useEffect, useState } from "react";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import moment from "moment";
import _ from "lodash";

import cs from "./SheCalendar.module.scss";
import { Calendar } from "@/components/ui/calendar.tsx";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import SheTimePicker from "@/components/primitive/she-time-picker/SheTimePicker.tsx";

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

export default function SheCalendar({
  id,
  className = "",
  style,
  calendarClassName = "",
  calendarStyle,
  label,
  labelTransKey,
  tooltip,
  date,
  time,
  timePicker,
  dateFormat,
  markedDates,
  mode = "single",
  minAmountOfDates,
  maxAmountOfDates,
  showClearBtn,
  minWidth,
  maxWidth,
  fullWidth,
  disabled,
  isLoading,
  required,
  view,
  hideFilters,
  onSelectDate,
  ...props
}: ISheCalendar): JSX.Element {
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

  const ariaDescribedbyId = `${generateId()}_CALENDAR_ID`;
  const markedParsedDates = React.useMemo(() => {
    if (!Array.isArray(markedDates)) return null;
    return (markedDates || [])
      .map(parseCalendarSingleDate)
      .filter(Boolean) as Date[];
  }, [markedDates]);

  useEffect(() => {
    const parsed: Date | Date[] | { from: Date; to: Date } =
      parseValidDate(date);

    if (parsed && !_.isEqual(parsed, _date)) {
      const convertedDate = getParsedModel(parsed);
      setDate(parsed);
      setSelectedMonth(months[getMonth(convertedDate)]);
      setSelectedYear(getYear(convertedDate));
    }
  }, [date]);

  // ==================================================================== EVENT

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

  function onSelectDateHandler(selectedDate: any) {
    const normalizedDate =
      inferCalendarMode(selectedDate) === "multiple"
        ? sortDateListByDate(selectedDate)
        : selectedDate;

    if (normalizedDate !== _date) setDate(normalizedDate);

    if (onSelectDate) onSelectDate(formatSelectedDateModel(normalizedDate));
  }

  function onClearHandler() {
    setDate(null);
    setSelectedTime(null);
    setSelectedMonth(months[new Date().getMonth()]);
    setSelectedYear(new Date().getFullYear());
    if (onSelectDate) onSelectDate(null);
  }

  function onTimeChangeHandler(value: Date) {
    setSelectedTime(value);
  }

  function onTimeDelayHandler(value: Date) {
    setSelectedTime(value);
    const dateWithTime = formatSelectedDateModel(_date, value);
    if (onSelectDate) onSelectDate(dateWithTime);
  }

  // ==================================================================== PRIVATE

  function getParsedModel(parsed: any): Date {
    switch (inferCalendarMode(parsed)) {
      case "multiple":
        return parsed[parsed.length - 1];
      case "range":
        return parsed.to;
      case "single":
        return parsed as Date;
    }
  }

  function inferCalendarMode(value: any): "single" | "multiple" | "range" {
    if (isCalendarMultipleDateValue(value)) return "multiple";
    if (isCalendarRangeDateValue(value)) return "range";
    if (isCalendarSingleDateValue(value)) return "single";
    return null;
  }

  // -------------------------------------------------------------- DATE FORMAT AND SORT

  function formatSelectedDateModel(
    selectedDate: any,
    timeOverride?: Date,
  ): any {
    const timeToUse: Date = timeOverride ?? _selectedTime;

    if (isCalendarMultipleDateValue(selectedDate)) {
      return selectedDate.map((item) => {
        item = combineDateAndTime(item as Date, timeToUse);
        return dateFormat ? moment(item).format(dateFormat) : item;
      });
    }

    if (isCalendarRangeDateValue(selectedDate)) {
      selectedDate.from = combineDateAndTime(
        selectedDate.from as Date,
        timeToUse,
      );
      selectedDate.to = combineDateAndTime(selectedDate.to as Date, timeToUse);

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

    if (isCalendarSingleDateValue(selectedDate)) {
      selectedDate = combineDateAndTime(selectedDate as Date, timeToUse);
      return dateFormat
        ? moment(selectedDate).format(dateFormat)
        : selectedDate;
    }
  }

  function sortDateListByDate(list: Date[]): Date[] {
    if (!list || list.length === 0) return null;
    return list.sort((a, b) => b.getTime() - a.getTime()).reverse();
  }

  function normalizeDateFormat(input: string | Date): string {
    const date = typeof input === "string" ? new Date(input) : input;

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function combineDateAndTime(datePart: Date, timePart: Date): Date {
    if (!datePart || !timePart) return datePart;

    const combined = new Date(datePart);
    combined.setHours(timePart.getHours());
    combined.setMinutes(timePart.getMinutes());
    combined.setSeconds(timePart.getSeconds());
    combined.setMilliseconds(timePart.getMilliseconds());

    return combined;
  }

  // -------------------------------------------------------------- CALENDAR MODE DETECTION

  function isCalendarMultipleDateValue(value: unknown): boolean {
    if (!value || !Array.isArray(value) || value.length === 0) return null;

    let isValueDates = true;
    const invalidDateIndexes: number[] = [];

    for (const item of value) {
      if (isValueDates) {
        isValueDates = !!parseCalendarSingleDate(item);
      }

      if (!parseCalendarSingleDate(item)) {
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

  function isCalendarRangeDateValue(
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
      !!parseCalendarSingleDate(value.from) &&
      !!parseCalendarSingleDate(value.to)
    );
  }

  function isCalendarSingleDateValue(value: any): boolean {
    if (!value || (typeof value === "object" && value.from)) return null;

    const tmpDate: Date = parseCalendarSingleDate(value);

    if (!tmpDate) {
      console.error("Invalid single Date value : ", value);
    }

    return tmpDate && typeof tmpDate === "object";
  }

  // -------------------------------------------------------------- DATE PARSERS

  function parseValidDate(
    value: any,
  ): Date | Date[] | { from: Date; to: Date } {
    if (!value) return null;

    switch (inferCalendarMode(value)) {
      case "multiple":
        return parseCalendarMultipleDate(value);
      case "range":
        return parseCalendarRangeDate(value);
      case "single":
        return parseCalendarSingleDate(value);
      default: {
        console.error("Invalid date to parse: ", value);
        return null;
      }
    }
  }

  function parseCalendarMultipleDate(
    value: string[] | Date[] | (string | Date)[],
  ): Date[] | null {
    if (!isCalendarMultipleDateValue(value)) return null;

    const dateList = value
      .map((item) => {
        const date = new Date(normalizeDateFormat(item));
        if (isNaN(date.getTime())) {
          console.warn("Invalid date:", item);
          return null;
        }
        return date;
      })
      .filter(Boolean) as Date[];

    return sortDateListByDate(dateList);
  }

  function parseCalendarRangeDate(
    value:
      | { from: string; to: string }
      | { from: Date; to: Date }
      | { from: string | Date; to: string | Date },
  ): { from: Date; to: Date } | null {
    if (!isCalendarRangeDateValue(value)) return null;

    const from = new Date(normalizeDateFormat(value.from));
    let to = new Date(normalizeDateFormat(value.to));

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

  function parseCalendarSingleDate(value: string | Date): Date | null {
    if (!value) return null;

    if (value instanceof Date && !isNaN(value.getTime())) return value;

    if (typeof value === "string") {
      const patterns = [
        /\b(\d{2})[./-](\d{2})[./-](\d{4})\b/, // MM.DD.YYYY / MM-DD-YYYY / MM/DD/YYYY
      ];
      value = normalizeDateFormat(value);

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
    <div
      id={id}
      className={`${cs.sheCalendar} ${className} ${cs[view] || ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${hideFilters ? cs.noFiltersBlock : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheCalendarComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.sheCalendarControl}>
          <div className={cs.sheCalendarContextBlock}>
            <div className={cs.sheCalendarFilterContainer}>
              <SheSelect
                items={months.map(
                  (item): ISheSelectItem => ({
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
              <SheSelect
                items={years.map(
                  (item): ISheSelectItem => ({
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
              <div className={cs.sheCalendarElementContainer}>
                <Calendar
                  className={`${cs.sheCalendarElement} ${calendarClassName} ${disabled || isLoading ? "disabled" : ""}`}
                  style={calendarStyle}
                  mode={date ? inferCalendarMode(date) : mode}
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
                  onSelect={onSelectDateHandler}
                  {...props}
                />
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
              </div>
            </SheSkeleton>
          </div>
          <SheClearButton
            value={_date}
            showClearBtn={showClearBtn}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            style={{ alignSelf: "start" }}
            onClear={onClearHandler}
          />
        </div>
      </div>
    </div>
  );
}
