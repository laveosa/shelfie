import React, { JSX } from "react";

import {
  display12HourValue,
  Period,
  setDateByType,
} from "@/utils/helpers/time-picker-helper.ts";
import SheSelect from "@/components/primitive/she-select/SheSelect.tsx";
import { ISheTimePickerSelect } from "@/const/interfaces/primitive-components/ISheTimePickerSelect.ts";
import cs from "./SheTimePickerSelect.module.scss";

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
  // ==================================================================== EVENT
  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();
  }

  function onValueChange(value: Period) {
    if (setPeriod) {
      setPeriod(value);
    }

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

  // ==================================================================== PRIVATE

  // ==================================================================== LAYOUT

  return (
    <SheSelect
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
