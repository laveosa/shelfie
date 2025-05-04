import React, { JSX, useEffect, useState } from "react";

import cs from "./SheCalendar.module.scss";
import { Calendar } from "@/components/ui/calendar.tsx";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { generateId, parseValidDate } from "@/utils/helpers/quick-helper.ts";
import { getMonth, getYear, setMonth, setYear } from "date-fns";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheSelectItem } from "@/const/interfaces/primitive-components/ISheSelectItem.ts";
import moment from "moment";
import { DateFormatEnum } from "@/const/enums/DateFormatEnum.ts";

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
  dateFormat = DateFormatEnum.MM_DD_YYYY,
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

    console.log("DATE: ", date);

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
    if (onSelectDate) onSelectDate(moment(selectedDate).format(dateFormat));
  }

  function onClearHandler() {
    setDate(null);
    setSelectedMonth(months[new Date().getMonth()]);
    setSelectedYear(new Date().getFullYear());
    if (onSelectDate) onSelectDate(null);
  }

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheCalendar} ${className} ${cs[view] || ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
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
