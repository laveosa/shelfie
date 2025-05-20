import React, { JSX, useEffect, useState } from "react";
import { format } from "date-fns";

import { CalendarIcon } from "lucide-react";

import cs from "./SheDatePicker.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ISheDatePicker } from "@/const/interfaces/primitive-components/ISheDatePicker.ts";
import SheSkeleton from "@/components/primitive/she-skeleton/SheSkeleton.tsx";
import { SheLabel } from "@/components/primitive/she-label/SheLabel.tsx";
import { SheClearButton } from "@/components/primitive/she-clear-button/SheClearButton.tsx";
import useAppTranslation from "@/utils/hooks/useAppTranslation.ts";
import { generateId } from "@/utils/helpers/quick-helper.ts";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";

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
  closeOnDateSelect = true,
  showClearBtn,
  hideTimePicker = true,
  onOpenChange,
  onSelectDate,
  ...props
}: ISheDatePicker): JSX.Element {
  const { translate } = useAppTranslation();
  const [_date, setDate] = React.useState<any>(date);
  const [_open, setOpen] = useState<boolean>(isOpen ?? null);

  const ariaDescribedbyId = `${generateId()}_DATE_PICKER_ID`;

  useEffect(() => {
    setDate(date);
  }, [date]);

  useEffect(() => {
    if (typeof isOpen === "boolean") setOpen(isOpen);
  }, [isOpen]);

  // ==================================================================== EVENT

  function onSelectHandler(value: Date | Date[] | { from: Date; to: Date }) {
    if (!value) return;

    setDate(value);

    if (closeOnDateSelect && (mode === "single" || mode === "range")) {
      setOpen(false);
    }

    if (onSelectDate) onSelectDate(value);
  }

  function onOpenChangeHandler(value: boolean) {
    if (isLoading || disabled) return;

    setOpen(value);

    if (onOpenChange) onOpenChange(value);
  }

  function onClearHandler() {
    setDate(null);

    if (onSelectDate) onSelectDate(null);
  }

  // ==================================================================== PRIVET
  // ==================================================================== LAYOUT

  return (
    <div
      id={id}
      className={`${cs.sheDatePicker} ${className} ${showClearBtn ? cs.withClearBtn : ""} ${fullWidth ? cs.fullWidth : ""} ${required ? cs.required : ""} ${disabled ? "disabled" : ""}`}
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
          <SheSkeleton
            className={cs.sheDatePickerSkeletonContainer}
            isLoading={isLoading}
            fullWidth
          >
            <Popover open={_open} onOpenChange={onOpenChangeHandler}>
              <PopoverTrigger
                className={cs.sheDatePickerPopoverTriggerContainer}
                asChild
              >
                <SheButton
                  className={cs.sheDatePickerPopoverTriggerButton}
                  variant="outline"
                  icon={icon}
                  fullWidth
                >
                  {_date ? (
                    <div className={cs.sheDatePickerControlTextContainer}>
                      {mode === "single" && (
                        <div className="cut-text">
                          <span className="she-text">
                            {format(_date, "PPP")}
                          </span>
                        </div>
                      )}
                      {mode === "range" && _date?.from && _date?.to && (
                        <div className="cut-text">
                          <span className="she-text">
                            {format(_date.from, "PPP")} -{" "}
                            {format(_date.to, "PPP")}
                          </span>
                        </div>
                      )}
                      {mode === "multiple" && (
                        <div className="cut-text">
                          <span className="she-subtext">[{_date.length}] </span>
                          {_date.map((item, idx) => (
                            <span
                              key={item?.toISOString?.() ?? idx}
                              className="she-text"
                            >
                              {format(item, "PPP")},{" "}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="she-placeholder">
                      {placeholderTransKey
                        ? translate(placeholderTransKey)
                        : (placeholder ?? "pick a date...")}
                    </span>
                  )}
                </SheButton>
              </PopoverTrigger>
              <PopoverContent
                className={cs.sheDatePickerPopOverContentContainer}
                align="start"
              >
                <SheCalendar
                  className={`${cs.sheDatePickerCalendar} ${calendarClassName} ${showClearBtn ? cs.withClearBtn : ""}`}
                  style={calendarStyle}
                  date={_date}
                  mode={mode}
                  isLoading={isLoading}
                  disabled={disabled}
                  hideTimePicker={hideTimePicker}
                  onSelectDate={onSelectHandler}
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
