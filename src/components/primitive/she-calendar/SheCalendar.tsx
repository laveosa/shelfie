import React, { JSX, useEffect } from "react";

import cs from "./SheCalendar.module.scss";
import { Calendar } from "@/components/ui/calendar.tsx";
import { ISheCalendar } from "@/const/interfaces/primitive-components/ISheCalendar.ts";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import { generateId } from "@/utils/helpers/quick-helper.ts";

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
  const [_date, setDate] = React.useState<string | Date>(null);

  const ariaDescribedbyId = `${generateId()}_CALENDAR_ID`;

  useEffect(() => {
    console.log("Date: ", date);
  }, [date]);

  // ==================================================================== EVENT

  function onSelectDateHandler(selectedDate: any) {
    console.log("Selected Date: ", selectedDate);

    setDate(selectedDate);
    if (onSelectDate) onSelectDate(selectedDate);
  }

  function onClearHandler() {
    setDate(null);
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
          <SheSkeleton isLoading={isLoading} fullWidth>
            <Calendar
              className={`${cs.sheCalendarElement} ${calendarClassName} ${disabled || isLoading ? "disabled" : ""}`}
              style={calendarStyle}
              mode={mode}
              selected={_date}
              onSelect={onSelectDateHandler}
              {...props}
            />
          </SheSkeleton>
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
