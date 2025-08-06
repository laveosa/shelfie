import React, { JSX } from "react";

import cs from "./SheTimePickerSelect.module.scss";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import {
  display12HourValue,
  Period,
  setDateByType,
} from "@/utils/helpers/time-picker-helper.ts";
import { ISheTimePickerSelect } from "@/const/interfaces/primitive-components/ISheTimePickerSelect.ts";

export default function SheTimePickerSelect({
  ref,
  date,
  period,
  setDate,
  setPeriod,
  onLeftFocus,
  onRightFocus,
  ...props
}: ISheTimePickerSelect): JSX.Element {
  // ==================================================================== EVENT HANDLERS
  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight") onRightFocus?.(e);
    if (e.key === "ArrowLeft") onLeftFocus?.(e);
  }

  function onValueChange(value: Period) {
    setPeriod?.(value);

    if (date && setDate) {
      const tempDate = new Date(date);
      const hours = display12HourValue(date.getHours());
      setDate(
        setDateByType(
          tempDate,
          hours.toString(),
          "12hours",
          period === "AM" ? "PM" : "AM",
        ),
      );
    }
  }

  // ==================================================================== LAYOUT
  return (
    <SheSelect<string>
      className={cs.sheTimePickerSelect}
      triggerRef={ref}
      items={[
        { text: "AM", value: "AM" },
        { text: "PM", value: "PM" },
      ]}
      selected={period}
      hideFirstOption
      minWidth="65px"
      maxWidth="65px"
      onTriggerKeyDown={onKeyDown}
      onSelect={onValueChange}
      {...props}
    />
  );
}
