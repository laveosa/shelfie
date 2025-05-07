import React, { JSX, useEffect, useState } from "react";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import moment from "moment";

import cs from "./SheCalendar.module.scss";
import { Calendar } from "@/components/ui/calendar.tsx";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import {
  inferCalendarMode,
  isCalendarMultipleDateValue,
  isCalendarRangeDateValue,
  isCalendarSingleDateValue,
  parseCalendarSingleDate,
  parseValidDate,
} from "@/utils/helpers/date-helper.ts";

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
  dateFormat,
  markedDates,
  mode = "single",
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
  >(date);
  const [_selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()],
  );
  const [_selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const ariaDescribedbyId = `${generateId()}_CALENDAR_ID`;
  const markedParsedDates = React.useMemo(() => {
    return (markedDates || [])
      .map(parseCalendarSingleDate)
      .filter(Boolean) as Date[];
  }, [markedDates]);

  useEffect(() => {
    const parsed: Date | Date[] | { from: Date; to: Date } =
      parseValidDate(date);

    if (parsed && parsed !== _date) {
      const convertedDate = getParsedModel(parsed);
      setDate(parsed);
      setSelectedMonth(months[getMonth(convertedDate)]);
      setSelectedYear(getYear(convertedDate));
    }

    /*if (parsed) {
      switch (inferCalendarMode(parsed)) {
        case "multiple": {
          const parsedDate: Date = parsed[parsed.length - 1];
          setSelectedMonth(months[getMonth(parsedDate)]);
          setSelectedYear(getYear(parsedDate));
          break;
        }
        case "range": {
          const parsedDate: { from: Date; to: Date } = parsed;
          setSelectedMonth(months[getMonth(parsedDate.to)]);
          setSelectedYear(getYear(parsedDate.to));
          break;
        }
        case "single": {
          setSelectedMonth(months[getMonth(parsed as Date)]);
          setSelectedYear(getYear(parsed as Date));
          break;
        }
      }
    }*/
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
    setDate(selectedDate);
    if (onSelectDate) onSelectDate(formatSelectedDateModel(selectedDate));
  }

  function onClearHandler() {
    setDate(null);
    setSelectedMonth(months[new Date().getMonth()]);
    setSelectedYear(new Date().getFullYear());
    if (onSelectDate) onSelectDate(null);
  }

  // ==================================================================== PRIVATE

  function formatSelectedDateModel(selectedDate: any): any {
    if (isCalendarMultipleDateValue(selectedDate)) {
      return selectedDate.map((item) =>
        dateFormat ? moment(item).format(dateFormat) : selectedDate,
      );
    }

    if (isCalendarRangeDateValue(selectedDate)) {
      const dateRangeModel = {
        from: selectedDate.from
          ? dateFormat
            ? moment(selectedDate.from).format(dateFormat)
            : selectedDate.from
          : null,
        to: selectedDate.to
          ? dateFormat
            ? moment(selectedDate.to).format(dateFormat)
            : selectedDate
          : null,
      };

      if (dateRangeModel?.from && dateRangeModel?.to) {
        return dateRangeModel;
      }
    }

    if (isCalendarSingleDateValue(selectedDate)) {
      return dateFormat
        ? moment(selectedDate).format(dateFormat)
        : selectedDate;
    }
  }

  function getParsedModel(parsed: unknown): Date {
    switch (inferCalendarMode(parsed)) {
      case "multiple":
        return parsed[parsed.length - 1];
      case "range":
        return parsed.to;
      case "single":
        return parsed as Date;
    }
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
                onSelect={onYearSelectHandler}
              />
            </div>
            <SheSkeleton isLoading={isLoading} fullWidth>
              <Calendar
                className={`${cs.sheCalendarElement} ${calendarClassName} ${disabled || isLoading ? "disabled" : ""}`}
                style={calendarStyle}
                mode={date ? inferCalendarMode(date) : mode}
                selected={_date}
                month={setMonth(
                  setYear(new Date(), _selectedYear),
                  months.indexOf(_selectedMonth),
                )}
                modifiers={{
                  marked: markedParsedDates,
                }}
                modifiersClassNames={{
                  marked: cs.markedDay,
                }}
                onMonthChange={(value) =>
                  setSelectedMonth(months[getMonth(value)])
                }
                onSelect={onSelectDateHandler}
                {...props}
              />
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
