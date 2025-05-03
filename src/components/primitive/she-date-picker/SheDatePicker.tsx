import React, { JSX, useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { CalendarIcon } from "lucide-react";

import cs from "./SheDatePicker.module.scss";
import { ISheDatePicker } from "@/const/interfaces/primitive-components/ISheDatePicker.ts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";

export default function SheDatePicker({
  id,
  className = "",
  style,
  calendarClassName = "",
  calendarStyle,
  label,
  labelTransKey,
  tooltip,
  icon = CalendarIcon,
  date,
  formatPattern,
  mode = "single",
  placeholder,
  placeholderTransKey,
  minWidth,
  maxWidth,
  fullWidth,
  required,
  disabled,
  isLoading,
  isOpen,
  showClearBtn,
  onOpenChange,
  onSelectDate,
  ...props
}: ISheDatePicker): JSX.Element {
  const { translate } = useAppTranslation();
  const [_date, setDate] = React.useState<any>(date);

  const ariaDescribedbyId = `${generateId()}_DATE_PICKER_ID`;

  // ==================================================================== EVENT

  function onSelectHandler(value: any) {
    console.log("Selected Date: ", value);
    setDate(value);
  }

  function onClearHandler() {}

  // ==================================================================== PRIVET
  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheDatePicker} ${className} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""}`}
      style={{
        minWidth,
        maxWidth,
        ...style,
      }}
    >
      <div className={cs.sheDatePickerComponent}>
        <SheLabel
          label={label}
          labelTransKey={labelTransKey}
          tooltip={tooltip}
          ariaDescribedbyId={ariaDescribedbyId}
        />
        <div className={cs.sheDatePickerControl}>
          <SheSkeleton isLoading={isLoading} fullWidth>
            <Popover>
              <PopoverTrigger asChild>
                <SheButton
                  className="flex justify-start text-left font-normal"
                  variant="outline"
                  icon={icon}
                  fullWidth
                >
                  {_date ? (
                    format(_date, "PPP")
                  ) : (
                    <span className="she-placeholder">pick a date...</span>
                  )}
                </SheButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  className={`${cs.sheDatePickerCalendar} ${calendarClassName} ${showClearBtn ? cs.withClearBtn : ""}`}
                  style={calendarStyle}
                  selected={_date}
                  mode={mode}
                  onSelect={onSelectHandler}
                  {...props}
                />
              </PopoverContent>
            </Popover>
          </SheSkeleton>
          <SheClearButton
            value={_date}
            showClearBtn={showClearBtn}
            disabled={disabled}
            isLoading={isLoading}
            ariaDescribedbyId={ariaDescribedbyId}
            onClear={onClearHandler}
          />
        </div>
      </div>
    </div>
  );
}
