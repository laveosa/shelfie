import React, { JSX, useEffect, useState } from "react";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import moment from "moment";

import cs from "./SheCalendar.module.scss";
import { Calendar } from "@/components/ui/calendar.tsx";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { generateId, parseValidDate } from "@/utils/helpers/quick-helper.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";

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
  const [_date, setDate] = React.useState<string | Date>(date);
  const [_selectedMonth, setSelectedMonth] = useState<string>(
    months[new Date().getMonth()],
  );
  const [_selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );

  const ariaDescribedbyId = `${generateId()}_CALENDAR_ID`;
  const markedParsedDates = React.useMemo(() => {
    return (markedDates || []).map(parseValidDate).filter(Boolean) as Date[];
  }, [markedDates]);

  useEffect(() => {
    const parsed = parseValidDate(date);

    /*console.log("DATE: ", date);
    console.log("PARSED: ", parsed);*/

    if (parsed && parsed.toString() !== _date?.toString()) {
      setDate(parsed);
      setSelectedMonth(months[getMonth(parsed)]);
      setSelectedYear(getYear(parsed));
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
    let eventModel;

    if (Array.isArray(selectedDate)) {
      console.log("Model 'Multiple': ", selectedDate);
      eventModel = dateFormat
        ? selectedDate.map((item) => moment(item).format(dateFormat))
        : selectedDate;
    } else if (isDateRangeObject(selectedDate)) {
      console.log("Model 'Multiple': ", selectedDate);
      eventModel = dateFormat
        ? {
            from: selectedDate.from
              ? moment(selectedDate.from).format(dateFormat)
              : null,
            to: selectedDate.to
              ? moment(selectedDate.to).format(dateFormat)
              : null,
          }
        : selectedDate;
    } else if (typeof selectedDate === "object" && !selectedDate.from) {
      console.log("Model 'Single': ", selectedDate);
      eventModel = dateFormat
        ? moment(selectedDate).format(dateFormat)
        : selectedDate;
    }

    return eventModel;
  }

  function isDateRangeObject(
    value: unknown,
  ): value is { from: Date | string; to: Date | string } {
    return (
      value &&
      typeof value === "object" &&
      "from" in value &&
      "to" in value &&
      (typeof (value as any).from === "string" ||
        (value as any).from instanceof Date) &&
      (typeof (value as any).to === "string" ||
        (value as any).to instanceof Date)
    );
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
                mode={mode}
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
