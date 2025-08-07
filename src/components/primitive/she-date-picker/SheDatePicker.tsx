import React, { JSX, useEffect, useState } from "react";
import { format } from "date-fns";

import cs from "./SheDatePicker.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SheButton from "@/components/primitive/she-button/SheButton.tsx";
import SheCalendar from "@/components/primitive/she-calendar/SheCalendar.tsx";
import ShePrimitiveComponentWrapper from "@/components/primitive/she-primitive-component-wrapper/ShePrimitiveComponentWrapper.tsx";
import useComponentUtilities from "@/utils/hooks/useComponentUtilities.ts";
import { getCustomProps } from "@/utils/helpers/props-helper.ts";
import { ISheDatePicker } from "@/const/interfaces/primitive-components/ISheDatePicker.ts";
import {
  IShePrimitiveComponentWrapper,
  ShePrimitiveComponentWrapperDefaultModel,
} from "@/const/interfaces/primitive-components/IShePrimitiveComponentWrapper.ts";
import {
  ISheCalendar,
  SheCalendarDefaultModel,
} from "@/const/interfaces/primitive-components/ISheCalendar.ts";

export default function SheDatePicker(props: ISheDatePicker): JSX.Element {
  // ==================================================================== PROPS
  const {
    date,
    mode = "single",
    placeholder,
    placeholderTransKey,
    disabled,
    isLoading,
    isOpen,
    closeOnDateSelect = true,
    hideTimePicker = true,
    onOpenChange,
    onSelectDate,
  } = props;
  const shePrimitiveComponentWrapperProps = getCustomProps<
    ISheDatePicker,
    IShePrimitiveComponentWrapper
  >(props, ShePrimitiveComponentWrapperDefaultModel);
  const sheCalendarProps = getCustomProps<ISheDatePicker, ISheCalendar>(
    props,
    SheCalendarDefaultModel,
  );

  // ==================================================================== STATE MANAGEMENT
  const [_date, setDate] = React.useState<any>(date);
  const [_open, setOpen] = useState<boolean>(isOpen ?? null);

  // ==================================================================== UTILITIES
  const { translate, ariaDescribedbyId } = useComponentUtilities({
    identifier: "SheDatePicker",
  });

  // ==================================================================== SIDE EFFECTS
  useEffect(() => {
    setDate(date);
  }, [date]);

  useEffect(() => {
    if (typeof isOpen === "boolean") setOpen(isOpen);
  }, [isOpen]);

  // ==================================================================== EVENT HANDLERS
  function onSelectHandler(value, { event }) {
    if (!value) return;

    setDate(value);

    if (closeOnDateSelect && (mode === "single" || mode === "range"))
      setOpen(false);

    onSelectDate?.(value, {
      value,
      model: props,
      event,
    });
  }

  function onOpenChangeHandler(value: boolean) {
    if (isLoading || disabled) return;

    setOpen(value);
    onOpenChange?.(value);
  }

  function onClearHandler(event) {
    setDate(null);
    onSelectDate?.(null, {
      value: null,
      model: props,
      event,
    });
  }

  // ==================================================================== LAYOUT
  return (
    <ShePrimitiveComponentWrapper
      {...shePrimitiveComponentWrapperProps}
      className={`${shePrimitiveComponentWrapperProps.className} ${cs.sheDatePicker}`}
      ariaDescribedbyId={ariaDescribedbyId}
      clearBtnValue={_date && _date.toString().length > 0}
      onClear={onClearHandler}
    >
      <Popover open={_open} onOpenChange={onOpenChangeHandler}>
        <PopoverTrigger
          className={cs.sheDatePickerPopoverTriggerContainer}
          asChild
        >
          <SheButton
            className={`${cs.sheDatePickerPopoverTriggerButton} componentTriggerElement`}
            variant="outline"
            fullWidth
          >
            {_date ? (
              <div className={cs.sheDatePickerControlTextContainer}>
                {mode === "single" && (
                  <div className="cut-text">
                    <span className="she-text">{format(_date, "PPP")}</span>
                  </div>
                )}
                {mode === "range" && _date?.from && _date?.to && (
                  <div className="cut-text">
                    <span className="she-text">
                      {format(_date.from, "PPP")} - {format(_date.to, "PPP")}
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
            {...sheCalendarProps}
            className={`${cs.sheDatePickerCalendar} ${sheCalendarProps.calendarClassName}`}
            date={_date}
            mode={mode}
            isLoading={isLoading}
            disabled={disabled}
            hideTimePicker={hideTimePicker}
            onSelectDate={onSelectHandler}
          />
        </PopoverContent>
      </Popover>
    </ShePrimitiveComponentWrapper>
  );
}
